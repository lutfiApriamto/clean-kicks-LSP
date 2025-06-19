import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";


export default function NavbarAdmin () {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            navigate("/admin/login")
        } else {
            const username = jwtDecode(token);
            localStorage.setItem("username", username.username);
            console.log(username.username)
        }
        
    },[])
    
      const handleLogOut = () => {
    toast.success("Berhasil Logout");
    setTimeout(() => {
      Cookies.remove("token");
      localStorage.removeItem('token')
      localStorage.removeItem("username")
      navigate("/admin/login");
    }, 2000);
  };


    return (
        <>
        <header className="p-5 w-full bg-orange-400 flex justify-center items-center fixed">
            <div className="w-2/3  flex justify-around items-center">
                <Link className=" font-bold text-white hover:text-blue-800"  to="/admin/dashboard">Beranda</Link>
                <Link className=" font-bold text-white hover:text-blue-800"  to="/admin/catalog">Catalog Jasa</Link>
                <Link className=" font-bold text-white hover:text-blue-800" to="/admin/order/running">Order Berjalan</Link>
                <Link className=" font-bold text-white hover:text-blue-800" to="/admin/order/done">Order Selesai</Link>
                <Link className=" font-bold text-white hover:text-blue-800" to="/admin/profile/add">Add New Profile</Link>
                <button onClick={handleLogOut} className="py-2 px-5 bg-red-700 text-white rounded-2xl">Logout</button>
            </div>
        </header>
              {/* Toast Container harus ada di root */}
      <ToastContainer position="top-center" />
        </>
    )
}