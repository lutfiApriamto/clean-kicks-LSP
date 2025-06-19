import { useEffect, useState } from "react";
import UserNavbar from "../../Components/PublicComponents/UserNavbar";
import { AccordionPriceList } from "@/Components/AdminComponents/Accordion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


export default function CatalogPageUser () {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:3000/product/getProducts`)
      console.log(response.data)
      setProducts(response.data)
    } catch (error) {
      console.error(error)
      toast.error("Gagal Mendapatkan Data produk")
    } 
  }

  useEffect(() => {
    fetchProducts()
  },[])

    return(
        <>
        <UserNavbar/>
        <section className="min-h-screen flex justify-center items-start pt-28 bg-gradient-to-b from-white to-sky-500 px-4">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl px-8 py-20">
          <h1 className="text-3xl font-bold text-center mb-16 text-blue-900 tracking-tight">
            CLEAN KICKS CATALOG
          </h1>

          <div className="w-full grid grid-cols-4 gap-x-8">
          {/* card */}

            {products.length > 0 ? (
              products.map((item, index) => (
            <div key={index} className="w-full rounded-xl shadow border-2 border-blue-900 overflow-hidden">
              <div className="overflow-hidden">
                <img src={item?.images[0]} alt="" className="h-32 bg-center bg-no-repeat bg-fixed" />
              </div>
              <div className="w-full px-5 h-full pt-3 pb-10 bg-blue-600 ">
                <h2 className="text-white  font-black italic mb-2">{item.namaJasa}</h2>
                <p className="text-xs font-semibold italic text-white block mb-6">Rp. {item.harga?.toLocaleString("id-ID") ?? "N/A"}</p>
                <Link to={`/catalog/detail/${item._id}`} className="text-xs bg-white py-2 px-5 rounded-md font-black italic ">Telusuri Produk</Link>
              </div>
            </div>
              ))
            ) : (
<p className="text-2xl text-center">Belum Ada Product</p>
              
            )}
          {/* end card */}
          </div>
          {/* <div className="mt-20">
            <AccordionPriceList/>
          </div> */}
        </div>
        
      </section>
      <ToastContainer position="top-center" />
        </>
    )
}