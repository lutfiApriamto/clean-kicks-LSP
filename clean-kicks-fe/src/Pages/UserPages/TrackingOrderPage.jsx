import { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import SearchBarUser from "../../Components/PublicComponents/SearchBarUser";
import UserNavbar from "../../Components/PublicComponents/UserNavbar";

export default function TrackingOrderPage() {
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchCode) => {
    if (!searchCode) return;

    setLoading(true);
    setSearchResult(null); // clear previous result (optional)

    try {
      const response = await axios.get(`http://localhost:3000/order/getOrderByCode?code=${searchCode}`);
      console.log("Order ditemukan:", response.data.data);
      setSearchResult(response.data.data);
    } catch (error) {
      console.error("Order tidak ditemukan atau terjadi kesalahan:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserNavbar />
      <section className="min-h-screen flex justify-center items-start pt-28 bg-gradient-to-b from-white to-sky-500 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl py-8 px-12">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-900 tracking-tight">
            TRACK YOUR SHOE PROGRESS
          </h1>

          <SearchBarUser onSearch={handleSearch} />

          {/* Spinner */}
          {loading && (
            <div className="flex justify-center mt-6">
              <ClipLoader color="#1E3A8A" size={35} />
            </div>
          )}

          {/* Hasil pencarian */}
          {searchResult && !loading && (
            <>
            <div className="mt-6 p-4  rounded ">
              <h2 className="w-full  text-blue-900 font-black">Code Pemesanan : {searchResult.code}</h2>
              {/* Tambahkan lainnya jika perlu */}
            </div>
            <div className="p-4">
  <h3 className="font-semibold text-lg mb-2 text-blue-900">Riwayat Proses:</h3>
  {searchResult.proses.map((item, index) => {
    const dateObj = new Date(item.timeStamp);
    const formattedTime = `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')} - ${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth()+1).toString().padStart(2, '0')}/${dateObj.getFullYear().toString().slice(-2)}`;
    
    return (
      <div key={index} className="mx-3 my-2 rounded-md shadow-md p-4 bg-blue-50">
        <p className="font-bold text-xl mb-2">{item.namaProses}</p>
        <p className="text-blue-800 text-sm">{formattedTime}</p>
      </div>
    );
  })}
</div>

            </>

          )}
        </div>
      </section>
    </>
  );
}
