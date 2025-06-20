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

export default function DoneOrder () {

  const [finishedOrders, setFinisedOrders] = useState([])
  const [currentPageFinised, setCurrentPageFinished] = useState(0)
  const [totalPagesFinished, setTotalPagesFinised] = useState(0)
  const [searchTermFinished, setSearchTermFinished] = useState("")
  const [loadingFinished, setLoadingFinished] = useState(false)

const fetchOrdersFinished = async () => {
    setLoadingFinished(true);
    try {
      let response;
      if (searchTermFinished) {
        response = await axios.get(`http://localhost:3000/order/getOrderByCodeAdmin?code=${searchTermFinished}`);
        setFinisedOrders(response.data.data || []);
        setTotalPagesFinised(1);
        setCurrentPageFinished(0);
      } else {
        response = await axios.get(`http://localhost:3000/order/getFinishedOrder?limit=10&page=${currentPageFinised}`);
        setFinisedOrders(response.data.data.orders || []);
        setTotalPagesFinised(response.data.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Gagal mengambil data order selesai:", error);
      toast.error("Gagal mengambil data order selesai");
    } finally {
      setLoadingFinished(false);
    }
}

  useEffect(() => {
    fetchOrdersFinished()
  }, [currentPageFinised, searchTermFinished]);


  const handleSearchFinished = (term) => {
    setSearchTermFinished(term);
  };


  const paginateFinished = (page) => {
    setCurrentPageFinished(page); // ✅
  };


    return (
        <>
        <NavbarAdmin/>
      <section className="w-full flex justify-center pt-28 px-4">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl mb-6 text-orange-600 font-bold">Riwayat Order Selesai</h1>

          {/* Search */}
          <SearchBarAdmin onSearch={handleSearchFinished} />

          {/* Table */}
          {loadingFinished ? (
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
                  {finishedOrders.length > 0 ? (
                    finishedOrders.map((order) => (
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
                          <Link to={`/admin/order/history/detail/${order._id}`} className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm">
                            Lihat Detail
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
          {!searchTermFinished && (
            <Pagination
              totalPages={totalPagesFinished}
              currentPage={currentPageFinised}
              paginate={paginateFinished}
              className="mt-6"
            />
          )}
        </div>
      </section>
      <ToastContainer position="top-center" />
        </>
    )
}