import NavbarAdmin from "@/Components/AdminComponents/NavbarAdmin";
import SearchBarAdmin from "@/Components/AdminComponents/SearchBarAdmin";
import Pagination from "@/Components/AdminComponents/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { Link } from "react-router-dom";

export default function Dashboard () {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [companyProfile, setCompanyProfile] = useState("")

  const [incomeEstimate, setIncomeEstimate] = useState(0)
  const [shoesEstimate, setShoesEstimate] = useState(0)

  const [totalIncome, setTotalIncome] = useState(0)
  const [totalShoes, setTotalShoes] = useState(0)

  const getCompanyProfile = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/profile/getProfile'
      )
      console.log(response.data.profile[0]._id )
      const id = response?.data?.profile?.[0]?._id;
      if (id) {
        setCompanyProfile(id);
      } else {
        toast.error("ID profile tidak ditemukan");
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal Mendapatkan Info Company Profile")
    }
  }

  const getIncomeEstimate = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/order/analytics/estimasiPendapatan'
      );
      setIncomeEstimate(response.data.totalPendapatan)
    } catch (error) {
      console.error(error)
      toast.error("Gagal Mendapatkan Data Estimasi pendapatan")
    }
  } 

  const getShoesEstimate = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/order/analytics/estimasiJumlahSepatu'
      );
      setShoesEstimate(response.data.totalSepatu)
    } catch (error) {
      console.error(error)
      toast.error("Gagal Mendapatkan Data Estimasi pendapatan")
    }
  }

  const getTotalIncome = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/order/analytics/pendapatanSelesai'
      );
      setTotalIncome(response.data.totalPendapatan)
    } catch (error) {
      console.error(error)
      toast.error("Gagal Mendapatkan Data Estimasi pendapatan")
    }
  }

  const getTotalShoes = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/order/analytics/sepatuSelesai'
      );
      setTotalShoes(response.data.totalSepatu)
    } catch (error) {
      console.error(error)
      toast.error("Gagal Mendapatkan Data Estimasi pendapatan")
    }
  }


  const fetchOrders = async () => {
    setLoading(true);
    try {
      let response;
      if (searchTerm) {
        response = await axios.get(`http://localhost:3000/order/getOrderByCodeAdmin?code=${searchTerm}`);
        setOrders(response.data.data || []);
        setTotalPages(1);
        setCurrentPage(0);
      } else {
        response = await axios.get(`http://localhost:3000/order/getPendingOrder?limit=10&page=${currentPage}`);
        setOrders(response.data.data.orders || []);
        setTotalPages(response.data.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Gagal mengambil data order:", error);
      toast.error("Gagal mengambil data order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    getIncomeEstimate();
    getShoesEstimate()
    getTotalIncome()
    getTotalShoes()
    getCompanyProfile()
  }, [currentPage, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const paginate = (page) => {
    setCurrentPage(page);
  };

const handleDownloadCSV = async () => {
    const confirmDonwload = window.confirm("Download File Laporan Keuangan ?");
    if (!confirmDonwload) return;
  try {
    const response = await axios.get(
      'http://localhost:3000/order/laporan/keuangan/download',
      {
        responseType: 'blob' // Penting agar axios tahu ini file
      }
    );

    // Buat link untuk download file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'laporan_keuangan.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Gagal mengunduh file CSV:", error);
    toast.error("Gagal mengunduh laporan keuangan.");
  }
};


    return(
      <>
      <NavbarAdmin/>
      <section className="w-full flex justify-center pt-36 px-4">
        <div className="w-full max-w-6xl flex justify-end">
          <div className="flex justify-center items-center gap-x-8">
            <Link to={`/admin/profile/edit/${companyProfile}`} className="bg-orange-600 text-white py-3 px-6 rounded-md font-black">Profile Perusahaan</Link>
            <button onClick={handleDownloadCSV} className="bg-orange-600 text-white py-3 px-6 rounded-md font-black">Download Laporan Keuangan</button>
          </div>
        </div>
      </section>


      <section className="w-full flex justify-center pt-6 px-4">
        <div className="w-full max-w-6xl grid grid-cols-4 gap-x-6  border-b-4 border-b-orange-500 border-t-4 border-t-orange-500 pb-10 pt-10">
          <div className="bg-orange-50 border border-orange-300 rounded-md py-3 px-2 flex flex-col justify-center items-center">
            <h2 className="mb-3 text-orange-600 font-bold">Estimasi Pendapatan</h2>
            <p className="italic font-semibold ">Rp. {incomeEstimate.toLocaleString("id-ID")}</p>
          </div>

          <div className="bg-orange-50 border border-orange-300 rounded-md py-3 px-2 flex flex-col justify-center items-center">
            <h2 className="mb-3 text-orange-600 font-bold">Estimasi Sepatu Masuk</h2>
            <p className="font-semibold ">{shoesEstimate} Sepatu</p>
          </div>

          <div className="bg-orange-50 border border-orange-300 rounded-md py-3 px-2 flex flex-col justify-center items-center">
            <h2 className="mb-3 text-orange-600 font-bold">Total Pendapatan</h2>
            <p className="italic font-semibold ">Rp. {totalIncome.toLocaleString("id-ID")}</p>
          </div>

          <div className="bg-orange-50 border border-orange-300 rounded-md py-3 px-2 flex flex-col justify-center items-center">
            <h2 className="mb-3 text-orange-600 font-bold">Total Sepatu Selesai</h2>
            <p className="font-semibold ">{totalShoes} sepatu</p>
          </div>

        </div>
      </section>

      <section className="w-full flex justify-center pt-10 px-4">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl mb-6 text-orange-600 font-bold">Orderan Masuk</h1>

          {/* Search */}
          <SearchBarAdmin onSearch={handleSearch} />

          {/* Table */}
          {loading ? (
            <div className="text-center my-10">
              <ClipLoader color="#FFA500" size={50} />
            </div>
          ) : (
            <div className="overflow-x-auto shadow border rounded-lg">
              <table className="min-w-full bg-white border">
                <thead className="bg-orange-100 text-orange-700">
                  <tr>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">No Telp</th>
                    <th className="py-2 px-4 border">Code</th>
                    <th className="py-2 px-4 border">Tanggal Transaksi</th>
                    <th className="py-2 px-4 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order._id} className="hover:bg-orange-50">
                        <td className="py-2 px-4 border">{order.email}</td>
                        <td className="py-2 px-4 border">{order.notelp}</td>
                        <td className="py-2 px-4 border">{order.code}</td>
                        <td className="py-2 px-4 border">
                          {order.proses?.[0]?.timeStamp
                            ? moment(order.proses[0].timeStamp).format("DD MMM YYYY")
                            : "Tidak tersedia"}
                        </td>
                        <td className="py-2 px-4 border text-center">
                          <Link to={`/admin/order/progress/detail/${order._id}`} className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm">
                            Proses
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!searchTerm && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              paginate={paginate}
              className="mt-6"
            />
          )}
        </div>
      </section>
      <div className="mb-96"></div>
      <ToastContainer position="top-center" />
      </>
      
    )
}