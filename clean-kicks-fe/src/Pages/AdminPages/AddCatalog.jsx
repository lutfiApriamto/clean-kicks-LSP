import { useState } from "react";
import NavbarAdmin from "../../Components/AdminComponents/NavbarAdmin";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AddCatalog() {
  const [namaJasa, setNamaJasa] = useState("");
  const [harga, setHarga] = useState("");
  const [description, setDescription] = useState("");
  const username = localStorage.getItem("username");
  const timeStamp = new Date();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await toast.promise(
        axios.post("http://localhost:3000/product/addProduct", {
          namaJasa,
          harga: parseInt(harga),
          description,
          adminUsername: username,
          timeStamp,
        }),
        {
          pending: "Menambahkan produk...",
          success: "Produk berhasil ditambahkan!",
          error: "Gagal menambahkan produk",
        }
      );

      setTimeout(() => {
        navigate("/admin/catalog");
        console.log("RESPON SERVER:", response.data);
      }, 2000);
    } catch (error) {
      console.error("Error menambah Data Katalog", error);
      toast.error("Terjadi kesalahan saat menambah produk");
    }
  };

  return (
    <>
      <NavbarAdmin />
      <section className="min-h-screen flex justify-center items-start pt-28 bg-gray-50 px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-800">
            Tambah Catalog Jasa
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="namaJasa" className="block font-medium mb-1">
                Nama Jasa
              </label>
              <input
                type="text"
                id="namaJasa"
                name="namaJasa"
                value={namaJasa}
                onChange={(e) => setNamaJasa(e.target.value)}
                required
                placeholder="Contoh: Desain Logo"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="harga" className="block font-medium mb-1">
                Harga
              </label>
              <input
                type="number"
                id="harga"
                name="harga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                required
                placeholder="Contoh: 150000"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium mb-1">
                Deskripsi
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Tulis deskripsi jasa secara singkat dan jelas..."
                rows="4"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
              ></textarea>
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
  );
}
