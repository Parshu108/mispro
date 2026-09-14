import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaStore, FaSignOutAlt, FaBell } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

function Leftnavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className="bg-white border-b border-[#393E46]/15 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs"
      style={{ fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap');
      `}</style>

      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-[#222831]">
          Mishu Mattress{" "}
          <span className="text-[#00ADB5] font-normal text-sm">
            | Control Center
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#222831] bg-[#EEEEEE] hover:bg-[#393E46]/15 rounded-lg transition"
        >
          <FaStore className="text-[#00ADB5]" /> View Store
        </Link>

        <div className="w-8 h-8 rounded-lg bg-[#EEEEEE] flex items-center justify-center text-[#393E46] hover:text-[#00ADB5] cursor-pointer transition">
          <FaBell className="text-sm" />
        </div>

        <div className="h-6 w-px bg-[#393E46]/20 mx-1"></div>

        {user && (
          <span className="hidden md:inline-block text-xs font-semibold text-[#222831]">
            {user.name}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#EEEEEE] bg-[#222831] hover:bg-[#393E46] rounded-lg shadow-xs transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Leftnavbar;
