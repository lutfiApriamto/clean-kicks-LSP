import NavbarAdmin from "@/Components/AdminComponents/NavbarAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";

export default function AddNewProgress () {
    const [namaProses, setNamaProses] = useState("")
    const [status, setStatus] = useState("")
    const adminUsername = localStorage.getItem('username')
    const navigate = useNavigate()
    const timeStamp = new Date()
    const {id} = useParams()

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.put(`http://localhost:3000/order/${id}/updateProgress`, {
      namaProses,
      status,
      adminUsername,
      timeStamp,
    });

    toast.success("Proses berhasil diperbarui!");
    console.log(response);

    setTimeout(() => {
      navigate(`/admin/order/progress/detail/${id}`);
    }, 2000);
  } catch (error) {
    toast.error("Gagal memperbarui proses");
    console.error(error);
  }
};

    return (
        <>
        <NavbarAdmin/>
      <section className="min-h-screen flex justify-center items-start pt-28 bg-gradient-to-b from-white to-orange-500 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-orange-900 tracking-tight">
            Form Update Proses Pemesanan
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Jenis Order */}
            <div>
              <label htmlFor="namaProses" className="block text-sm font-medium text-gray-700 mb-1">
                Proses Pengerjaan
              </label>
              <select
                id="namaProses"
                required
                value={namaProses}
                onChange={(e) => setNamaProses(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition mb-2"
              >
                <option value="">Pilih Proses Pengerjaan</option>
                <option value="Pesanan Diterima">Pesanan Diterima</option>
                <option value="Kurir OTW Jemput Sepatu">Kurir OTW Jemput Sepatu</option>
                <option value="Kurir OTW Lokasi Pengerjaan Sepatu">Kurir OTW Lokasi Pengerjaan Sepatu</option>
                <option value="Sepatu Sedang Dikerjakan">Sepatu Sedang Dikerjakan</option>
                <option value="Kurir OTW Mengantar Sepatu">Kurir OTW Mengantar Sepatu</option>
                <option value="pemesanan Selesai">pemesanan Selesai</option>
              </select>
            </div>

            {/* Jenis Order */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Tipe Order
              </label>
              <select
                id="status"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition mb-2"
              >
                <option value="">Pilih Tipe Order</option>
                <option value="MENERIMA ORDER">MENERIMA ORDER</option>
                <option value="OTW JEMPUT">OTW JEMPUT</option>
                <option value="OTW RUMAH">OTW RUMAH</option>
                <option value="SEPATU DIKERJAKAN">SEPATU DIKERJAKAN</option>
                <option value="OTW ANTER SEPATU">OTW ANTER SEPATU</option>
                <option value="ORDER SELESAI">ORDER SELESAI</option>

              </select>
            </div>


            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-10 rounded-full transition duration-300 shadow-md"
              >
                Update Status Proses
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer position="top-center" />
        </>
    )
}