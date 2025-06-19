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
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const username = localStorage.getItem("username");
  const timeStamp = new Date();
  const navigate = useNavigate();

  // Submit form beserta gambar
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
          images,
        }),
        {
          pending: "Menambahkan produk...",
          success: "Produk berhasil ditambahkan!",
          error: "Gagal menambahkan produk",
        }
      );

      // Reset form setelah berhasil
      setNamaJasa("");
      setHarga("");
      setDescription("");
      setImages([]);

      setTimeout(() => {
        navigate("/admin/catalog");
        console.log("RESPON SERVER:", response.data);
      }, 2000);
    } catch (error) {
      console.error("Error menambah Data Katalog", error);
      toast.error("Terjadi kesalahan saat menambah produk");
    }
  };

  // Upload gambar secara langsung
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi file
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Format gambar tidak didukung");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:3000/product/uploadImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImages((prev) => [...prev, res.data.imageUrl]);
      toast.success("Gambar berhasil diunggah");
    } catch (err) {
      console.error("Upload gagal:", err);
      toast.error("Gagal mengunggah gambar");
    } finally {
      setUploading(false);
    }
  };

  // Hapus gambar
  const handleDeleteImage = async (url) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
    if (!confirmDelete) return;
    const filename = encodeURIComponent(url.split("/").pop());
    try {
      await axios.delete(`http://localhost:3000/product/deleteImage?filename=${filename}`);
      setImages((prev) => prev.filter((img) => img !== url));
      toast.info("Gambar berhasil dihapus");
    } catch (err) {
      console.error("Gagal hapus gambar", err);
      toast.error("Gagal menghapus gambar");
    }
  };

  return (
    <>
      <NavbarAdmin />
      <section className="min-h-screen flex justify-center items-start pt-28 bg-gray-50 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
            Tambah Catalog Jasa
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="namaJasa" className="block font-semibold mb-1">
                Nama Jasa
              </label>
              <input
                type="text"
                id="namaJasa"
                value={namaJasa}
                onChange={(e) => setNamaJasa(e.target.value)}
                required
                placeholder="Contoh: Desain Logo"
                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="harga" className="block font-semibold mb-1">
                Harga
              </label>
              <input
                type="number"
                id="harga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                required
                placeholder="Contoh: 150000"
                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-semibold mb-1">
                Deskripsi
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="4"
                placeholder="Tulis deskripsi jasa secara singkat dan jelas..."
                className="w-full border border-gray-300 rounded-lg py-3 px-4 resize-none focus:ring-2 focus:ring-emerald-400 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold mb-2">Upload Gambar</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="mb-4"
              />
              <div className="flex flex-wrap gap-4">
                {images.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(url)}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-lg shadow transition duration-300"
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
