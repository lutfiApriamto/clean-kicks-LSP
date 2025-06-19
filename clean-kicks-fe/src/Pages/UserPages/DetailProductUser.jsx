import UserNavbar from "@/Components/PublicComponents/UserNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function DetailProductUser () {
    const {id} = useParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchProduct = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:3000/product/${id}/getProductsById`)
            console.log(response)
            setProducts(response.data)
        } catch (error) {
            console.error(error)
            toast.err
        }
    }

    useEffect(() => {
        fetchProduct()
    },[])

    return(
        <>
        <UserNavbar/>
        <section className="min-h-screen flex justify-center items-center  bg-gradient-to-b from-white to-sky-500 px-4">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl px-8 py-20 flex justify-around gap-x-5 items-center">

                <div className="w-1/2 overflow-hidden rounded-md">
                {products.images?.length > 0 ? (
                    <Slider
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    >
                    {products.images.map((imgUrl, index) => (
                        <div key={index}>
                        <img
                            src={imgUrl}
                            alt={`Gambar ${index + 1}`}
                            className="w-full h-80 object-cover rounded"
                        />
                        </div>
                    ))}
                    </Slider>
                ) : (
                    <div className="text-gray-500">Tidak ada gambar</div>
                )}
                </div>


                <div className="w-1/2  ">
                    <h1 className="text-xl mb-5 font-black uppercase italic">{products?.namaJasa}</h1>
                    <h2 className="text-lg italic font-semibold mb-3">Rp. {products.harga?.toLocaleString("id-ID") ?? "N/A"} </h2>
                    <div className="h-40 w-full overflow-auto px-3 mb-8">
                        <p>{products?.description}</p>
                    </div>

                    <Link to="/order" className="py-3 px-8 rounded-md bg-blue-600 text-white italic font-bold">Order Sekarang</Link>
                </div>
            </div>
        </section>
        <ToastContainer position="top-center" />
        </>
    )
}