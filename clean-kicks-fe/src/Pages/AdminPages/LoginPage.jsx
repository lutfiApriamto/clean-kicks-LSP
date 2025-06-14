import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await toast.promise(
        axios.post('http://localhost:3000/admin/loginAdmin', { username, password }),
        {
          pending: 'Logging in...',
          success: 'Berhasil Login!',
          error: 'Failed to log in',
        }
      );

      localStorage.setItem("token", response.data.token);

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login gagal. Silakan cek username/password.");
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-300 to-blue-500 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
        >
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome Admin</h1>
            <p className="text-gray-500 text-sm">Clean Kicks Management System</p>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </section>

      <ToastContainer position="top-center" />
    </>
  );
}
