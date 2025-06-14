import { Link } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function UserNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
              {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-br from-sky-200 to-white  z-50 px-6 sm:px-10 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide text-blue-900">
          Clean Kicks
        </Link>
        <nav className="hidden md:flex gap-x-10 items-center">
          <Link className="text-lg text-gray-700 hover:text-blue-800 font-light"to='/catalog' >Catalog</Link>
          <Link className="text-lg text-gray-700 hover:text-blue-800 font-light" to='/order'>Order</Link>
          <Link className="text-lg text-gray-700 hover:text-blue-800 font-light" to='/tracking'>Tracking</Link>
        </nav>
        <button className="md:hidden text-3xl text-blue-800" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col gap-4 md:hidden">
            <Link onClick={() => setMenuOpen(false)} className="text-gray-700" to='/catalog'>Catalog</Link>
            <Link onClick={() => setMenuOpen(false)} className="text-gray-700" to='/order' >Order</Link>
            <Link onClick={() => setMenuOpen(false)} className="text-gray-700"  to='/tracking'>Tracking</Link>
          </div>
        )}
      </header>
        </>
    )
}