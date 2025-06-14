import { Link } from "react-router-dom";
import UserNavbar from "../../Components/PublicComponents/UserNavbar";

export default function LandingPage() {
  return (
    <>

      <UserNavbar/>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-6 sm:px-10 bg-gray-100 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4 leading-tight">
            Perawatan Sepatu Profesional
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            Clean Kicks - Where Your Shoes Get VVIP Treatment. Jadikan sepatu Anda kembali seperti baru!
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link to="order" className="bg-blue-800 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">
              Pesan Sekarang
            </Link>
            <Link to="#" className="border border-blue-800 text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition">
              Lihat Katalog
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="w-full h-72 sm:h-96 bg-gray-300 rounded-xl shadow-inner flex items-center justify-center text-gray-500 text-lg">
            Gambar Ilustrasi
          </div>
        </div>
      </section>

      {/* Highlight: BERSIH itu WAJIB! */}
<section className="bg-white py-20 px-6 sm:px-10 flex flex-col lg:flex-row items-center gap-10">
  <div className="lg:w-1/2 order-2 lg:order-1 text-center lg:text-left">
    <p className="text-teal-600 font-semibold mb-2">Clean Kicks</p>
    <h2 className="text-4xl font-bold text-blue-900 mb-4">BERSIH itu WAJIB!</h2>
    <p className="text-gray-700 text-lg mb-6">
      Kembalikan kilau dan keindahan sepatu lamamu dengan <em>Formula Khusus</em> dari kami yang secara efektif
      menghilangkan noda, debu, dan kotoran yang menempel pada permukaan sepatu. Selain itu kami dapat menyegarkan warna sepatu yang pudar dan mengembalikan kelembutan kulitnya.
    </p>
    <p className="text-gray-700 text-lg">
      Jadi, jangan biarkan sepatu lamamu terlihat kusam dan kotor, <strong>Cuci</strong>-in sepatumu untuk kembali bersinar seperti baru.
    </p>
  </div>
  <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center">
    <img
      src="/images/qilap-clean.png" // ganti dengan path gambar kamu, contoh: public folder
      alt="Sepatu kotor dibersihkan"
      className="rounded-full w-[300px] sm:w-[400px] lg:w-[480px] object-cover"
    />
  </div>
</section>

{/* Highlight: from head to SEPATOE */}
<section className="bg-gray-100 py-20 px-6 sm:px-10 flex flex-col-reverse lg:flex-row items-center gap-10">
  <div className="lg:w-1/2 flex justify-center">
    <img
      src="/images/qilap-white-shoes.png" // ganti sesuai path kamu
      alt="Memakai sepatu putih"
      className="rounded-full w-[300px] sm:w-[400px] lg:w-[480px] object-cover"
    />
  </div>
  <div className="lg:w-1/2 text-center lg:text-left">
    <p className="text-teal-600 font-semibold mb-2">/SE·PA·TU/</p>
    <h2 className="text-4xl font-bold text-blue-900 mb-4">from head to SEPATOE</h2>
    <p className="text-gray-700 text-lg mb-6">
      Sepatu yang sesuai dengan gaya dan suasana hati Anda dapat menambah kepercayaan diri dalam berbagai situasi. Jangan pernah meremehkan kekuatan sepatu dalam menunjukkan kepribadian dan meningkatkan penampilan sehari-hari Anda.
    </p>
    <Link
      to="#"
      className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full font-semibold transition"
    >
      Cuci sepatumu sekarang!
    </Link>
  </div>
</section>


      {/* Location Info */}
      <section className="bg-white py-10 px-6 sm:px-10 text-center">
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">Temukan Kami</h2>
        <p className="text-gray-600">
          Jalan Kenangan No. 123, Kota Harapan, Indonesia
        </p>
      </section>

      {/* Map + Contact Section */}
      <section className="bg-blue-800 text-white py-12 px-6 sm:px-10 text-center">
        <h2 className="text-3xl font-bold mb-6">Clean Kicks Store</h2>
        <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-lg shadow-lg">
          <iframe
            title="Clean Kicks Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.9167173917643!2d112.63917041525827!3d-7.965484093186458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6297f5161a6b5%3A0xb1e2bcf203289182!2sMalang%20Town%20Square!5e0!3m2!1sen!2sid!4v1718264460330!5m2!1sen!2sid"
            width="100%"
            height="320"
            className="border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <Link
          to="#"
          className="inline-block bg-teal-400 hover:bg-teal-500 text-blue-900 font-semibold px-8 py-3 rounded-full mt-8 transition"
        >
          Contact Clean Kicks
        </Link>
      </section>

      

      {/* Footer */}
      <footer className="bg-gray-200 text-center text-sm text-gray-600 py-6 border-t">
        © {new Date().getFullYear()} Clean Kicks. All rights reserved.
      </footer>
    </>
  );
}
