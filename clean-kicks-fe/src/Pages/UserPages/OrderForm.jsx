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
  const [alamat, setAlamat] = useState("");
  const [detailAlamat, setDetailAlamat] = useState("");
  const [orderList, setOrderList] = useState([
    { namaJasa: "", harga: 0, jumlah: 1, subtotal: 0 },
  ]);
  const [produkList, setProdukList] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [totalJumlahSepatu, setTotalJumlahSepatu] = useState(0);
  const navigate = useNavigate();

  const namaProses = "Order Request";
  const status = "pending";
  const adminUsername = "user Request";
  const timeStamp = new Date();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const codeRes = await axios.get("http://localhost:3000/order/generateCode");
        setCode(codeRes.data.code);

        const produkRes = await axios.get("http://localhost:3000/product/getProducts");
        setProdukList(produkRes.data);
        console.log(produkRes)
      } catch (error) {
        console.error("Gagal memuat data awal", error);
        toast.error("Gagal memuat data awal");
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const total = orderList.reduce(
      (acc, item) => {
        return {
          jumlah: acc.jumlah + Number(item.jumlah),
          harga: acc.harga + Number(item.subtotal),
        };
      },
      { jumlah: 0, harga: 0 }
    );
    setTotalJumlahSepatu(total.jumlah);
    setTotalHarga(total.harga);
  }, [orderList]);

  const handleOrderChange = (index, field, value) => {
    const updatedOrders = [...orderList];
    if (field === "namaJasa") {
      const selected = produkList.find((p) => p.namaJasa === value);
      updatedOrders[index][field] = value;
      updatedOrders[index]["harga"] = selected?.harga || 0;
      updatedOrders[index]["subtotal"] =
        (selected?.harga || 0) * updatedOrders[index].jumlah;
    } else if (field === "jumlah") {
      updatedOrders[index][field] = value;
      updatedOrders[index]["subtotal"] = updatedOrders[index].harga * value;
    }
    setOrderList(updatedOrders);
  };

  const addOrderField = () => {
    setOrderList([
      ...orderList,
      { namaJasa: "", harga: 0, jumlah: 1, subtotal: 0 },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await toast.promise(
        axios.post("http://localhost:3000/order/addOrder", {
          name,
          email,
          code,
          notelp,
          orderList,
          totalHarga,
          totalJumlahSepatu,
          alamat,
          detailAlamat,
          adminUsername,
          proses: [
            {
              namaProses,
              status,
              timeStamp,
              adminUsername,
            },
          ],
        }),
        {
          pending: "Mengirim Permintaan...",
          success: "Order Berhasil!",
          error: "Gagal Mengirim Permintaan",
        }
      );
      setTimeout(() => {
        navigate("/tracking");
      }, 2000);
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengirim permintaan order");
    }
  };

  return (
    <>
      <UserNavbar />
      <section className="min-h-screen flex justify-center items-start pt-28 bg-gradient-to-b from-white to-blue-300 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-900 tracking-tight">
            Form Pemesanan Clean Kicks
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Data Pribadi */}
            {[{ label: "Nama Kamu", id: "name", val: name, setter: setName },
              { label: "Email Kamu", id: "email", val: email, setter: setEmail },
              { label: "Nomor Telepon", id: "notelp", val: notelp, setter: setNoTelp }].map((item) => (
              <div key={item.id}>
                <label htmlFor={item.id} className="block text-sm font-medium text-gray-700 mb-1">
                  {item.label}
                </label>
                <input
                  id={item.id}
                  value={item.val}
                  onChange={(e) => item.setter(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
            ))}

            {/* Dynamic Order List */}
            {orderList.map((item, index) => (
              <div key={index} className="bg-gray-50 border rounded-lg p-4 mb-4">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Pilih Layanan
                </label>
                <select
                  value={item.namaJasa}
                  onChange={(e) => handleOrderChange(index, "namaJasa", e.target.value)}
                  required
                  className="w-full mb-3 border border-gray-300 rounded-md py-2 px-4"
                >
                  <option value="">-- Pilih Layanan --</option>
                  {produkList.map((produk) => (
                    <option key={produk._id} value={produk.namaJasa}>
                      {produk.namaJasa} - Rp{produk.harga.toLocaleString("id-ID")}
                    </option>
                  ))}
                </select>
                <label className="block text-sm mb-1">Jumlah Sepatu</label>
                <input
                  type="number"
                  min="1"
                  value={item.jumlah}
                  onChange={(e) => handleOrderChange(index, "jumlah", Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md py-2 px-4 mb-2"
                />
                <p className="text-sm text-right text-gray-600 italic">
                  Subtotal: Rp{item.subtotal.toLocaleString("id-ID")}
                </p>
              </div>
            ))}

            <div className="text-right">
              <button type="button" onClick={addOrderField} className="text-blue-800 font-semibold underline">
                + Tambahkan Tipe Order Lainnya
              </button>
            </div>

            {/* Alamat */}
            {[{ label: "Alamat Google Maps", id: "alamat", val: alamat, setter: setAlamat },
              { label: "Detail Alamat (opsional)", id: "detailAlamat", val: detailAlamat, setter: setDetailAlamat }].map((item) => (
              <div key={item.id}>
                <label htmlFor={item.id} className="block text-sm font-medium text-gray-700 mb-1">
                  {item.label}
                </label>
                <textarea
                  id={item.id}
                  value={item.val}
                  onChange={(e) => item.setter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-4"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pemesanan</label>
              <input
                type="text"
                value={code}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 text-gray-600"
              />
            </div>

            {/* Total Harga dan Submit */}
            <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-blue-900 font-semibold">
                Total Sepatu: {totalJumlahSepatu} pasang
              </p>
              <p className="text-blue-900 font-semibold">
                Total Harga: Rp{totalHarga.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-10 rounded-full transition duration-300 shadow-md"
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
