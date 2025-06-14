import { AccordionOrder } from "@/Components/AdminComponents/AccordionOrder";
import NavbarAdmin from "@/Components/AdminComponents/NavbarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailOrder () {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    },[id])

    const fetchProducts = async () => {
        try {
        const response = await axios.get(`http://localhost:3000/order/${id}/getOrderById`);
        setData(response.data); // pastikan akses ke data array
        } catch (error) {
        console.error("Gagal mengambil data produk:", error);
        toast.error("Gagal mengambil data dari server");
        } finally {
        setLoading(false);
        }
    };

    console.log(data)

    return (
        <>
        <NavbarAdmin/>
              <section className="min-h-screen flex justify-center items-start pt-28 bg-gradient-to-b from-white to-orange-300 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-orange-900 tracking-tight">
            Form Pemesanan Clean Kicks
          </h1>

          <form className="space-y-6">
            {/* Nama Jasa */}
            <div className="w-full flex justify-center items-center gap-x-5">
                <div className="w-1/2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nama 
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        disabled
                        className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                    />
                </div>

                <div className="w-1/2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="text"
                        value={data.email}
                        disabled
                        className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                    />
                </div>
            </div>

            <div className="w-full flex justify-center items-center gap-x-5">
                <div className="w-1/2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        code 
                    </label>
                    <input
                        type="text"
                        value={data.code}
                        disabled
                        className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                    />
                </div>

                <div className="w-1/2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        No. Telpon
                    </label>
                    <input
                        type="text"
                        value={data.notelp}
                        disabled
                        className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                    />
                </div>
            </div>

            <div className="w-full flex justify-center items-center gap-x-5">
                <div className="w-1/2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Link Google Maps
                    </label>
                    <input
                        type="text"
                        value={data.alamat}
                        disabled
                        className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                    />
                </div>

                <div className="w-1/2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Detail Alamat
                    </label>
                    <input
                        type="text"
                        value={data.detailAlamat}
                        disabled
                        className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                    />
                </div>
            </div>

            {Array.isArray(data.proses) && data.proses.length > 0 ? (
            <AccordionOrder data={data.proses} />
            ) : (
            <p className="text-center text-gray-500 pt-4">Belum ada proses pemesanan.</p>
            )}

            {/* Submit */}
            <div className="text-center pt-4">
              <Link to="/admin/order/history"
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-10 rounded-full transition duration-300 shadow-md"
              >
                Kembali
              </Link>
            </div>
          </form>
        </div>
      </section>
        </>
    )
}