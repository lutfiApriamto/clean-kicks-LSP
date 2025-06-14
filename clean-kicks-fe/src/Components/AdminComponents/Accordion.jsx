import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export function AccordionPriceList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/getProducts");
      setProducts(response.data); // pastikan akses ke data array
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
      toast.error("Gagal mengambil data dari server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {products.map((product, index) => (
          <AccordionItem
            key={product._id}
            value={`item-${index + 1}`}
            className="bg-gradient-to-br from-white to-sky-500 px-5 rounded-md mb-1 py-2"
          >
            <AccordionTrigger className="font-bold text-blue-900 text-lg md:text-xl">
              {product.namaJasa} - Rp {product.harga.toLocaleString("id-ID")}
            </AccordionTrigger>
            <AccordionContent className="text-blue-900 text-sm md:text-base">
              {product.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <ToastContainer position="top-center" />
    </>
  );
}
