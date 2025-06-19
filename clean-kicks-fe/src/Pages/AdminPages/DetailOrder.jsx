import { AccordionOrder } from "@/Components/AdminComponents/AccordionOrder";
import NavbarAdmin from "@/Components/AdminComponents/NavbarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function DetailOrder () {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/order/${id}/getOrderById`
      );
      setData(response.data);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
      toast.error("Gagal mengambil data dari server");
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

    return (
        <>
      <NavbarAdmin />
      <section className="min-h-screen flex justify-center items-start pt-28 bg-gradient-to-b from-white to-orange-300 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-orange-900 tracking-tight">
            Detail Pemesanan Clean Kicks
          </h1>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <form className="space-y-6">
              {/* Data Utama */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={data.name}
                    disabled
                    className="w-full border border-gray-300 rounded-md py-3 px-4 bg-gray-100 text-gray-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Email
                  </label>
                  <input
                    type="text"
                    value={data.email}
                    disabled
                    className="w-full border border-gray-300 rounded-md py-3 px-4 bg-gray-100 text-gray-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Kode Pemesanan
                  </label>
                  <input
                    type="text"
                    value={data.code}
                    disabled
                    className="w-full border border-gray-300 rounded-md py-3 px-4 bg-gray-100 text-gray-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    No. Telepon
                  </label>
                  <input
                    type="text"
                    value={data.notelp}
                    disabled
                    className="w-full border border-gray-300 rounded-md py-3 px-4 bg-gray-100 text-gray-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Link Google Maps
                  </label>
                  <input
                    type="text"
                    value={data.alamat}
                    disabled
                    className="w-full border border-gray-300 rounded-md py-3 px-4 bg-gray-100 text-gray-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Detail Alamat
                  </label>
                  <input
                    type="text"
                    value={data.detailAlamat}
                    disabled
                    className="w-full border border-gray-300 rounded-md py-3 px-4 bg-gray-100 text-gray-700"
                  />
                </div>
              </div>

              {/* Daftar Layanan */}
              <div className="pt-6">
                <h2 className="text-xl font-semibold text-orange-800 mb-2">Daftar Layanan Dipesan</h2>
                {data.orderList?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-orange-50 border border-orange-300 p-4 rounded-xl mb-4 shadow"
                  >
                    <p className="font-medium text-gray-800">
                      <span className="text-sm text-orange-600 font-semibold">{item.namaJasa}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Jumlah Sepatu: {item.jumlah}
                    </p>
                    <p className="text-sm text-gray-600">
                      Harga Satuan: {formatRupiah(item.harga)}
                    </p>
                    <p className="text-sm text-gray-700 font-bold">
                      Subtotal: {formatRupiah(item.subtotal)}
                    </p>
                  </div>
                ))}

                {/* Total Section */}
                <div className="text-right border-t pt-4">
                  <p className="text-md font-semibold text-gray-700">
                    Total Sepatu: {data.totalJumlahSepatu} pasang
                  </p>
                  <p className="text-lg font-bold text-orange-900">
                    Total Harga: {formatRupiah(data.totalHarga)}
                  </p>
                </div>
              </div>

              {/* Accordion Proses */}
              {Array.isArray(data.proses) && data.proses.length > 0 ? (
                <AccordionOrder data={data.proses} />
              ) : (
                <p className="text-center text-gray-500 pt-4">
                  Belum ada proses pemesanan.
                </p>
              )}

              {/* Tombol Tambah Progres */}
             <div className="text-center pt-4">
              <Link to="/admin/order/done"
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-10 rounded-full transition duration-300 shadow-md"
              >
                Kembali
              </Link>
            </div>
            </form>
          )}
        </div>
      </section>
        </>
    )
}