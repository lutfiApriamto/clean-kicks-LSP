import NavbarAdmin from "@/Components/AdminComponents/NavbarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProfileCompany () {

    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState()
    const [notelp, setNotelp] = useState()
    const [alamat, setAlamat] = useState()
    const [gMaps, setGMaps] = useState()
    const [email, setEmail] = useState()
    const adminUsername = localStorage.getItem("username");
    const {id} = useParams()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3000/profile/${id}/getProfileById`)
                const profile = response.data;
                setCompanyName(profile.companyName)
                setNotelp(profile.notelp)
                setAlamat(profile.alamat)
                setGMaps(profile.gMaps)
                setEmail(profile.email)
                console.log(response)
            } catch (error) {
                toast.error("Gagal Mendapatkan Data Profile")
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        const confirmUpdate = window.confirm("Data Yang Anda Masukan Sudah Benar?");
        if (!confirmUpdate) return;
        e.preventDefault();

        try {
            await toast.promise(
                axios.patch(`http://localhost:3000/profile/${id}/updateProfile`, {
                    companyName,
                    notelp,
                    alamat,
                    gMaps,
                    email,
                    adminUsername
                }),
                {
                    pending: "Mengupdate data...",
                    success: "Produk berhasil diupdate!",
                    error: "Gagal mengupdate produk",
                }
            )
            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 2000);
        } catch (error) {
            console.error(error)
            toast.error(error)
        }
    }

    return (
        <>
        <NavbarAdmin/>
              <section className="min-h-screen flex justify-center items-start pt-28 bg-gray-50 px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-800">
            Profile Perusahaan
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label htmlFor="companyName" className="block font-medium mb-1">
                Nama Perusahaan
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="notelp" className="block font-medium mb-1">
                Nomor WA Perusahaan
              </label>
              <input
                type="number"
                id="notelp"
                name="notelp"
                value={notelp}
                onChange={(e) => setNotelp(e.target.value)}
                required
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
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="gMaps" className="block font-medium mb-1">
                Google Maps Lokasi Perusahaan
              </label>
              <input
                type="text"
                id="gMaps"
                name="gMaps"
                value={gMaps}
                onChange={(e) => setGMaps(e.target.value)}
                required
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
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-md transition duration-300"
              >
                Ubah Profi Perusahaan
              </button>
            </div>
          </form>
        </div>
      </section>
            <ToastContainer position="top-center" />
        </>
    )
}