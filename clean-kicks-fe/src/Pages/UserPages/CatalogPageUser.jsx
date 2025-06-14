import UserNavbar from "../../Components/PublicComponents/UserNavbar";
import { AccordionPriceList } from "@/Components/AdminComponents/Accordion";


export default function CatalogPageUser () {
    return(
        <>
        <UserNavbar/>
        <section className="min-h-screen flex justify-center items-start pt-28 bg-gradient-to-b from-white to-sky-500 px-4">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-900 tracking-tight">
            CLEAN KICKS CATALOG
          </h1>
          <div className="mt-20">
            <AccordionPriceList/>
          </div>
        </div>
      </section>

        </>
    )
}