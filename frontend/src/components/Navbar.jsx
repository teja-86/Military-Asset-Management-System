import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ShieldCheck, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed", err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 to-sky-800 text-white px-6 py-4 flex justify-between items-center shadow-lg font-poppins">
      <div className="flex items-center gap-3">
        {/* <ShieldCheck size={24} className="text-sky-400" /> */}
        <h1 className="text-xl font-semibold tracking-wide">
          Military Asset Management System
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm sm:text-base">
          <span className="font-semibold">{user?.full_name}</span>
        </span>

        <div className="w-9 h-9 rounded-full bg-sky-600 flex items-center justify-center font-bold text-white shadow-md">
          {user?.full_name ? user.full_name[0].toUpperCase() : 'U'}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-white hover:text-sky-200 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
