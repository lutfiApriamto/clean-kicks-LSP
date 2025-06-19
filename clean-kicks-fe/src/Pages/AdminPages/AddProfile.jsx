import { useState } from "react";
import NavbarAdmin from "../../Components/AdminComponents/NavbarAdmin";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AddProfile () {
    const [companyName, setCompanyName] = useState()
    const [notelp, setNotelp] = useState()
    const [alamat, setAlamat] = useState()
    const [gMaps, setGMaps] = useState()
    const [email, setEmail] = useState()
    const adminUsername = localStorage.getItem("username");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await toast.promise(
            axios.post('http://localhost:3000/profile/addNewProfile', {
            companyName,
            notelp,
            alamat,
            gMaps,
            email,
            adminUsername
            }),
            {
                pending: "Menambahkan Profile...",
                success: "Profile berhasil ditambahkan!",
                error: "Gagal menambahkan Profile",
            }
        )

            setTimeout(() => {
                navigate("/admin/catalog");
                console.log("RESPON SERVER:", response.data);
            }, 2000);
    } catch (error) {
        console.error("Error Saat Menambahkan Data Katalog", error)
        toast.error("Terjadi Kesalahan Saat Menambahkan Profile")
    }
}

    return (
        <>
      <NavbarAdmin />
      <section className="min-h-screen flex justify-center items-start pt-28 bg-gray-50 px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-800">
            Add New Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="companyName" className="block font-medium mb-1">
                Nama Usaha
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="Contoh: Clean Kicks"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="notelp" className="block font-medium mb-1">
                Nomor Wa
              </label>
              <input
                type="number"
                id="notelp"
                name="notelp"
                value={notelp}
                onChange={(e) => setNotelp(e.target.value)}
                required
                placeholder="Contoh:  08xxxxxxx"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="alamat" className="block font-medium mb-1">
                Alamat Perusahaan
              </label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
                placeholder="Contoh: JL. GARUDA HARAPAN INDAH"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="gMaps" className="block font-medium mb-1">
                Link Google Maps Perusahaan
              </label>
              <input
                type="text"
                id="gMaps"
                name="gMaps"
                value={gMaps}
                onChange={(e) => setGMaps(e.target.value)}
                required
                placeholder="Contoh: https://maps.app.goo.gl/hh6tKqHmombDiXMt8"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email Perusahaan
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Contoh: Cleax***@gmail.com"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-md transition duration-300"
              >
                Simpan Catalog
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer position="top-center" />

        </>
    )
}