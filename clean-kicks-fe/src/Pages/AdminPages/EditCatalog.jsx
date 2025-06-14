import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarAdmin from "../../Components/AdminComponents/NavbarAdmin";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditCatalog() {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();

  const [namaJasa, setNamaJasa] = useState("");
  const [harga, setHarga] = useState("");
  const [description, setDescription] = useState("");

  // Fetch data product saat halaman dibuka
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3000/product/${id}/getProductsById`);
        const product = res.data;
        setNamaJasa(product.namaJasa);
        setHarga(product.harga);
        setDescription(product.description);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
        toast.error("Gagal mengambil data produk");
      }
    }

    fetchData();
  }, [id]);

  // Handle submit update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await toast.promise(
        axios.patch(`http://localhost:3000/product/${id}/updateProduct`, {
          namaJasa,
          harga: parseInt(harga),
          description,
        }),
        {
          pending: "Mengupdate data...",
          success: "Produk berhasil diupdate!",
          error: "Gagal mengupdate produk",
        }
      );

      setTimeout(() => {
        navigate("/admin/catalog");
      }, 2000);
    } catch (error) {
      console.error("Error update data:", error);
      toast.error("Terjadi kesalahan saat update");
    }
  };

  return (
    <>
      <NavbarAdmin />
      <section className="min-h-screen flex justify-center items-start pt-28 bg-gray-50 px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-800">
            Edit Catalog Jasa
          </h1>
          <form onSubmit={handleUpdate} className="space-y-5">
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
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-md transition duration-300"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer position="top-center" />
    </>
  );
}
