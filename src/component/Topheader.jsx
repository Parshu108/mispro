import React from "react";
import { CiSearch, CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaSignOutAlt, FaUserShield } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Svg from "../image/Logo.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const Topheader = () => {
  const cartItems = useSelector((state) => state.mycart.cart) || [];
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const totalCartCount = cartItems.reduce((acc, item) => acc + (Number(item.qnty) || 1), 0);

  return (
    <Navbar
      expand="lg"
      className="bg-[#222831] border-b border-[#393E46] sticky top-0 z-40 shadow-md py-2.5"
    >
      <Container fluid className="px-4 lg:px-8">
        <Navbar.Brand as={Link} to="/" className="flex items-center">
          <img
            src={Svg}
            alt="Mishu Mattress"
            style={{
              width: "135px",
              height: "50px",
              objectFit: "contain",
              filter: "brightness(1.1)",
            }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" className="bg-[#393E46] border-0 text-[#EEEEEE]" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 items-center"
            style={{ margin: `auto`, gap: `8px` }}
            navbarScroll
          >
            <Nav.Link
              as={Link}
              to="matter"
              className="headnav text-[#EEEEEE] hover:text-[#00ADB5] hover:bg-[#393E46] px-3 py-1.5 rounded-lg text-sm font-semibold transition"
            >
              Matters
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="shop"
              className="headnav text-[#EEEEEE] hover:text-[#00ADB5] hover:bg-[#393E46] px-3 py-1.5 rounded-lg text-sm font-semibold transition"
            >
              Shop
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="product"
              className="headnav text-[#EEEEEE] hover:text-[#00ADB5] hover:bg-[#393E46] px-3 py-1.5 rounded-lg text-sm font-semibold transition"
            >
              Product
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="showroom"
              className="headnav text-[#EEEEEE] hover:text-[#00ADB5] hover:bg-[#393E46] px-3 py-1.5 rounded-lg text-sm font-semibold transition"
            >
              Showroom
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="blog"
              className="headnav text-[#EEEEEE] hover:text-[#00ADB5] hover:bg-[#393E46] px-3 py-1.5 rounded-lg text-sm font-semibold transition"
            >
              Blog
            </Nav.Link>
          </Nav>

          <div className="flex items-center gap-3 py-2">
            {/* Admin Badge */}
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#222831] bg-[#00ADB5] hover:bg-[#009299] rounded-lg shadow-sm transition"
              >
                <FaUserShield /> Admin Panel
              </Link>
            )}

            {/* User Account State */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 bg-[#393E46] border border-[#393E46] px-3 py-1 rounded-full text-xs font-semibold text-[#EEEEEE]">
                <span className="w-5 h-5 rounded-full bg-[#00ADB5] text-[#222831] font-bold flex items-center justify-center text-[10px]">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="hidden sm:inline max-w-[100px] truncate text-[#EEEEEE]">{user.name}</span>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="text-gray-400 hover:text-red-400 ml-1 transition"
                >
                  <FaSignOutAlt className="text-xs" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                title="Login / Register"
                className="text-[#EEEEEE] hover:text-[#00ADB5] transition p-1.5 hover:bg-[#393E46] rounded-lg"
              >
                <CiUser style={{ fontSize: "24px" }}  className="text-[#EEEEEE] hover:text-[#00ADB5]"/>
              </Link>
            )}

            <Link
              to="/wishlist"
              title="Wishlist"
              className="text-[#EEEEEE] hover:text-[#00ADB5] transition p-1.5 hover:bg-[#393E46] rounded-lg"
            >
              <CiHeart style={{ fontSize: "24px" }}  className="text-[#EEEEEE] hover:text-[#00ADB5]"/>
            </Link>

            <button
              onClick={() => navigate("/cartdata")}
              title="Shopping Cart"
              className="relative text-[#EEEEEE] hover:text-[#00ADB5] transition p-1.5 hover:bg-[#393E46] rounded-lg border-0 bg-transparent flex items-center"
            >
              <CiShoppingCart style={{ fontSize: "26px" }}  className="text-[#EEEEEE] hover:text-[#00ADB5]"/>
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00ADB5] text-[#222831] text-[11px] font-extrabold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topheader;