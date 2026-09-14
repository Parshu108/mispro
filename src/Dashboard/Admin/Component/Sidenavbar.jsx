import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaStore,
  FaSignOutAlt,
  FaBed,
} from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

const SectionLabel = ({ children }) => (
  <p className="flex items-center gap-2 px-3 text-[11px] font-semibold text-[#EEEEEE]/40 mb-2">
    <span className="w-3 h-px bg-[#393E46]" />
    {children}
  </p>
);

function Sidenavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Orders", path: "/admin/orders", icon: <FaShoppingBag /> },
    { name: "Products", path: "/admin/products", icon: <FaBoxOpen /> },
    { name: "Customers", path: "/admin/users", icon: <FaUsers /> },
  ];

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className="w-64 bg-[#222831] text-[#EEEEEE]/70 min-h-screen flex flex-col justify-between p-4 border-r border-[#393E46] shadow-xl shrink-0"
      style={{ fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap');
      `}</style>

      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-3 py-4 border-b border-[#393E46] mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#00ADB5] text-[#222831] flex items-center justify-center text-xl shadow-md">
            <FaBed />
          </div>
          <div>
            <h2 className="text-[#EEEEEE] font-bold text-base tracking-wide leading-tight">
              Mishu Admin
            </h2>
            <span className="text-[11px] text-[#00ADB5] font-semibold">
              Management Hub
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <SectionLabel>Main Menu</SectionLabel>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#00ADB5] text-[#EEEEEE] shadow-md shadow-[#00ADB5]/20"
                    : "text-[#EEEEEE] hover:text-[#07090a] hover:bg-[#393E46]/60"
                }`
              }
            >
              <span className="text-base text-[#EEEEEE] hover:text-[#00ADB5]">
                {item.icon}
              </span>
              <span className="text-[#EEEEEE] hover:text-[#00ADB5]">
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>

        {/* Quick Links Section */}
        <div className="mt-8 space-y-1">
          <SectionLabel>Storefront</SectionLabel>
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#EEEEEE]/55 hover:text-[#EEEEEE] hover:bg-[#393E46]/60 transition"
          >
            <FaStore className="text-base text-[#00ADB5]" />
            <span>View Public Store</span>
          </Link>
          <Link
            to="/shop"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#EEEEEE]/55 hover:text-[#EEEEEE] hover:bg-[#393E46]/60 transition"
          >
            <FaBoxOpen className="text-base text-[#EEEEEE]/50" />
            <span>Shop Front</span>
          </Link>
        </div>
      </div>

      {/* Footer / Account */}
      <div className="border-t border-[#393E46] pt-4 px-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#00ADB5]/15 text-[#00ADB5] font-bold flex items-center justify-center text-sm border border-[#00ADB5]/30">
            {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-[#EEEEEE] leading-tight">
              {user?.name || "Admin User"}
            </p>
            <p className="text-[11px] text-[#EEEEEE]/40 truncate">
              {user?.email || "admin@mishu.com"}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-semibold text-[#EEEEEE]/70 hover:text-[#EEEEEE] hover:bg-[#393E46] transition border border-[#393E46]"
        >
          <FaSignOutAlt />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidenavbar;
