import { useEffect, useState } from "react";
import UserNavbar from "../../Components/PublicComponents/UserNavbar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function OrderForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [notelp, setNoTelp] = useState("");
  const [orderType, setOrderType] = useState("");
  const [alamat, setAlamat] = useState("");
  const [detailAlamat, setDetailAlamat] = useState("");
  const namaProses = "Order Request";
  const status = "pending";
  const adminUsername = "user Request";
  const timeStamp = new Date();
  const [dataLenght, setDataLenght] = useState()

  const navigate = useNavigate()
  

  // 👉 Generate kode unik 10 karakter (misal: AB12CD34EF)
const generateCode = (length) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result + String(length).padStart(3, "0") ; 
};


useEffect(() => {
  async function fetchData() {
    try {
      const res = await axios.get('http://localhost:3000/order/getOrders');
      const length = res.data.data.orders.length + 1;
      setDataLenght(length);

      // Panggil generateCode setelah data length berhasil didapat
      setCode(generateCode(length));
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
      toast.error("Gagal mengambil data produk");
    }
  }

  fetchData();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await toast.promise(
            axios.post("http://localhost:3000/order/addOrder", {
                name,
                email,
                code,
                notelp,
                orderType,
                alamat,
                detailAlamat,
                adminUsername,
                proses : [
                    {
                        namaProses,
                        status,
                        timeStamp,
                        adminUsername
                    }
                ]
            }),
            {
          pending: "Mengirim Permintaan...",
          success: "Order Berhasil!",
          error: "Gagal Mengirim Permintaan",
        }
        );

    setTimeout(() => {
        navigate("/tracking");
        console.log("RESPON SERVER:", response.data);
      }, 2000);
    } catch (error) {
        console.error("Error menambah Data Katalog", error);
        toast.error("Terjadi kesalahan saat mengirim permintaan order");
    }
    
  };

  return (
    <>
      <UserNavbar />
      <section className="min-h-screen flex justify-center items-start pt-28 bg-gradient-to-b from-white to-sky-500 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-900 tracking-tight">
            Form Pemesanan Clean Kicks
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Jasa */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Kamu
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Maman Supratman"
                required
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Kamu
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
              />
            </div>

            {/* Nomor Telepon */}
            <div>
              <label htmlFor="notelp" className="block text-sm font-medium text-gray-700 mb-1">
                No. Telepon Kamu {"(Yang Ada WAnya yaa ...)"}
              </label>
              <input
                type="tel"
                id="notelp"
                value={notelp}
                onChange={(e) => setNoTelp(e.target.value)}
                placeholder="08xxxxxxxxxx"
                required
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
              />
            </div>

            {/* Jenis Order */}
            <div>
              <label htmlFor="orderType" className="block text-sm font-medium text-gray-700 mb-1">
                Tipe Order
              </label>
              <select
                id="orderType"
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition mb-2"
              >
                <option value="">Pilih Tipe Order</option>
                <option value="Deep Clean">Deep Clean</option>
                <option value="Whitening">Whitening</option>
              </select>
              <p>Silahkan Lihat Disini :<Link to="/catalog" className="text-blue-900 font-black italic underline">Catalog</Link></p>
            </div>

            {/* Alamat */}
            <div>
              <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">
                Google Maps Rumah Kamu
              </label>
              <input
                type="text"
                id="alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Jl. Contoh Raya No.123"
                required
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
              />
            </div>

            {/* Detail Alamat */}
            <div>
              <label htmlFor="detailAlamat" className="block text-sm font-medium text-gray-700 mb-1">
                Detail Alamat (Opsional)
              </label>
              <textarea
                id="detailAlamat"
                value={detailAlamat}
                onChange={(e) => setDetailAlamat(e.target.value)}
                placeholder="Patokan, lantai, dsb."
                rows="3"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
              />
            </div>

            {/* Kode Pesanan */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Kode Pemesanan
              </label>
              <input
                type="text"
                id="code"
                value={code}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-10 rounded-full transition duration-300 shadow-md"
              >
                Kirim Pesanan
              </button>
            </div>
          </form>
        </div>
      </section>
      <ToastContainer position="top-center" />
    </>
  );
}
