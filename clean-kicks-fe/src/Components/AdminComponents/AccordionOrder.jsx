import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AccordionOrder({data}) {

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {Array.isArray(data) && data.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            className="bg-gradient-to-br from-white to-orange-500 px-5 rounded-md mb-1 py-2"
          >
            <AccordionTrigger className="font-bold  text-lg md:text-xl">
              {/* {item.namaJasa} - Rp {item.harga.toLocaleString("id-ID")} */}
              {item.namaProses}
            </AccordionTrigger>
            <AccordionContent className=" text-sm md:text-base">
              <p>Editor : {item.adminUsername}</p>
              <p>status : {item.status}</p>
              <p>Tanggal Perubahan : {moment(item.timeStamp).format("DD MMM YYYY")}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <ToastContainer position="top-center" />
    </>
  );
}
