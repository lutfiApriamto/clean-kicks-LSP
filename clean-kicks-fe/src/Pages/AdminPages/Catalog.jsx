import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "../../Components/AdminComponents/NavbarAdmin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "@/Components/AdminComponents/Pagination";
import ClipLoader from "react-spinners/ClipLoader";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/product/getProductsAdmin?limit=5&page=${currentPage}`);
      setProducts(response.data.data.products || []);
      setTotalPages(response.data.data.pagination.totalPages);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
      toast.error("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/product/${id}/deleteProduct/`);
      toast.success("Produk berhasil dihapus");
      fetchProducts(); // refresh data
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      toast.error("Terjadi kesalahan saat menghapus produk");
    }
  };

  const paginate = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <NavbarAdmin />
      <section className="w-full flex justify-center pt-28 px-4">
        <div className="w-full max-w-6xl">
          <div className="flex justify-end mb-4">
            <Link
              to="/admin/catalog/addcatalog"
              className="px-5 py-3 rounded-md bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition duration-200"
            >
              Tambah Catalog Jasa
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center px-4">
        <div className="w-full max-w-6xl">
          {loading ? (
            <div className="text-center my-10">
              <ClipLoader color="#FFA500" size={50} />
            </div>
          ) : (
            <div className="overflow-x-auto shadow border rounded-lg">
              <table className="min-w-full bg-white border">
                <thead className="bg-orange-100 text-orange-700">
                  <tr>
                    <th className="py-2 px-4 border">No.</th>
                    <th className="py-2 px-4 border text-left">Nama Jasa</th>
                    <th className="py-2 px-4 border text-left">Harga</th>
                    <th className="py-2 px-4 border hidden lg:table-cell">Editor</th>
                    <th className="py-2 px-4 border hidden md:table-cell">Tanggal</th>
                    <th className="py-2 px-4 border text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>

                  {products.length > 0 ? (
                    products.map((item, index) => (
                                          <tr key={item._id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border text-center">{index + 1 + currentPage * 5}</td>
                      <td className="py-2 px-4 border">{item.namaJasa}</td>
                      <td className="py-2 px-4 border">
                        Rp {item.harga?.toLocaleString("id-ID") ?? "N/A"}
                      </td>
                      <td className="py-2 px-4 border hidden lg:table-cell">{item.adminUsername}</td>
                      <td className="py-2 px-4 border hidden md:table-cell">
                        {new Date(item.timeStamp).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        <div className="flex gap-2 justify-center">
                          <Link
                            to={`/admin/catalog/${item._id}`}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
            className="mt-6"
          />
        </div>
      </section>

      <ToastContainer position="top-center" />
    </>
  );
}
