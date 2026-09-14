import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch } from "react-redux";
import { addtocard } from "../cartslice";
import m1 from "../image/main/main-grid-01.jpg";
import m2 from "../image/main/main-grid-02.jpeg";
import m3 from "../image/main/main-grid-03.jpeg";
import m4 from "../image/main/main-grid-04.jpg";
import cent from "../image/main/Center-image-grid.png";
import img1 from "../image/slide/Web-Banner-001.png";
import img2 from "../image/slide/Web-Banner-002.png";
import img3 from "../image/slide/Web-Banner-003.png";
import axios from "axios";
import { FaTruck, FaShieldAlt, FaHeadset, FaRupeeSign, FaShoppingCart, FaStar } from "react-icons/fa";

const Matters = () => {
  const [mydata, setdata] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loaddata = async () => {
    try {
      const api = "http://localhost:3000/product";
      const res = await axios.get(api);
      setdata(res.data || []);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  const product = (id) => {
    navigate(`/productdisplay/${id}`);
  };

  return (
    <div className="bg-[#EEEEEE] min-h-screen text-[#222831]">
      {/* Hero Carousel */}
      <Carousel data-bs-theme="light" className="shadow-md">
        <Carousel.Item>
          <div className="relative h-[480px] sm:h-[580px] w-full overflow-hidden bg-[#222831]">
            <img
              src={img1}
              alt="Vintage Mattress"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#222831]/90 via-[#222831]/40 to-transparent flex items-center justify-center p-6">
              <div className="max-w-xl text-center text-[#EEEEEE] bg-[#222831]/80 backdrop-blur-md p-8 rounded-3xl border border-[#00ADB5]/40 shadow-2xl">
                <span className="text-[#00ADB5] text-xs font-bold uppercase tracking-widest block mb-1">
                  Mishu Supreme Series
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#EEEEEE] mb-2">
                  VINTAGE MATTRESS
                </h1>
                <p className="text-[#EEEEEE]/80 text-sm mb-6">
                  Engineered orthocare and ultra-plush memory foam for deep, restorative sleep.
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="px-6 py-3 bg-[#00ADB5] hover:bg-[#009299] text-[#222831] font-extrabold text-sm rounded-xl shadow-lg transition"
                >
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="relative h-[480px] sm:h-[580px] w-full overflow-hidden bg-[#222831]">
            <img
              src={img2}
              alt="Dream Catcher Mattress"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#222831]/90 via-[#222831]/40 to-transparent flex items-center justify-center p-6">
              <div className="max-w-xl text-center text-[#EEEEEE] bg-[#222831]/80 backdrop-blur-md p-8 rounded-3xl border border-[#00ADB5]/40 shadow-2xl">
                <span className="text-[#00ADB5] text-xs font-bold uppercase tracking-widest block mb-1">
                  Breathable Cooling Foam
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#EEEEEE] mb-2">
                  DREAM CATCHER
                </h1>
                <p className="text-[#EEEEEE]/80 text-sm mb-6">
                  Zero motion transfer with advanced body-contouring support.
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="px-6 py-3 bg-[#00ADB5] hover:bg-[#009299] text-[#222831] font-extrabold text-sm rounded-xl shadow-lg transition"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="relative h-[480px] sm:h-[580px] w-full overflow-hidden bg-[#222831]">
            <img
              src={img3}
              alt="Astron Mattress"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#222831]/90 via-[#222831]/40 to-transparent flex items-center justify-center p-6">
              <div className="max-w-xl text-center text-[#EEEEEE] bg-[#222831]/80 backdrop-blur-md p-8 rounded-3xl border border-[#00ADB5]/40 shadow-2xl">
                <span className="text-[#00ADB5] text-xs font-bold uppercase tracking-widest block mb-1">
                  Luxury Orthopedic
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#EEEEEE] mb-2">
                  ASTRON PRO
                </h1>
                <p className="text-[#EEEEEE]/80 text-sm mb-6">
                  Targeted spinal alignment with high resilience durable support core.
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="px-6 py-3 bg-[#00ADB5] hover:bg-[#009299] text-[#222831] font-extrabold text-sm rounded-xl shadow-lg transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* Feature Value Props (30% secondary structure) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#222831] text-[#EEEEEE] p-5 rounded-2xl border-t-4 border-[#00ADB5] shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#393E46] text-[#00ADB5] flex items-center justify-center text-xl shrink-0">
              <FaTruck />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#EEEEEE]">Free Pan-India Delivery</h4>
              <p className="text-xs text-[#EEEEEE]/70 mt-0.5">Complimentary doorstep shipping</p>
            </div>
          </div>

          <div className="bg-[#222831] text-[#EEEEEE] p-5 rounded-2xl border-t-4 border-[#00ADB5] shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#393E46] text-[#00ADB5] flex items-center justify-center text-xl shrink-0">
              <FaShieldAlt />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#EEEEEE]">10-Year Warranty</h4>
              <p className="text-xs text-[#EEEEEE]/70 mt-0.5">100% genuine certified quality</p>
            </div>
          </div>

          <div className="bg-[#222831] text-[#EEEEEE] p-5 rounded-2xl border-t-4 border-[#00ADB5] shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#393E46] text-[#00ADB5] flex items-center justify-center text-xl shrink-0">
              <FaHeadset />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#EEEEEE]">24/7 Sleep Support</h4>
              <p className="text-xs text-[#EEEEEE]/70 mt-0.5">Expert mattress guidance anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#00ADB5] text-xs font-bold uppercase tracking-wider block mb-1">
            Engineered For Spine Health
          </span>
          <h2 className="text-3xl font-extrabold text-[#222831]">
            Featured Mattress Collection
          </h2>
          <p className="text-[#393E46] text-sm mt-2">
            Handcrafted with precision layers to distribute weight evenly and isolate motion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mydata.map((key) => (
            <div
              key={key.id}
              className="bg-white rounded-2xl border border-[#393E46]/10 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div
                className="relative overflow-hidden bg-gray-100 cursor-pointer"
                onClick={() => product(key.id)}
              >
                <img
                  src={key.img}
                  alt={key.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300";
                  }}
                />
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#222831] line-clamp-1">{key.name}</h3>
                  <p className="text-xl font-extrabold text-[#222831] mt-2 flex items-center">
                    <FaRupeeSign className="text-base text-[#00ADB5]" />
                    {(Number(key.prize) || 0).toLocaleString("en-IN")}
                  </p>
                </div>

                <button
                  onClick={() =>
                    dispatch(
                      addtocard({
                        id: key.id,
                        name: key.name,
                        img: key.img,
                        prize: key.prize,
                        qnty: 1,
                      })
                    )
                  }
                  className="mt-4 w-full py-2.5 px-4 bg-[#00ADB5] hover:bg-[#009299] text-[#222831] hover:text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story Banner (30% structure) */}
      <section className="bg-[#222831] text-[#EEEEEE] py-16 px-4 my-12 border-y-2 border-[#00ADB5]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="px-3.5 py-1 bg-[#00ADB5]/20 text-[#00ADB5] rounded-full text-xs font-bold uppercase tracking-wider">
            Our Craftsmanship
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#EEEEEE] tracking-tight">
            Redefining Restorative Sleep For Every Home
          </h2>
          <p className="text-[#EEEEEE]/80 text-sm sm:text-base leading-relaxed">
            At Mishu, we believe that a great morning starts with supreme sleep. Every mattress is constructed with breathable fabric, high-density orthopedic support foam, and pressure-relieving contours to ensure you wake up revitalized every single day.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="px-8 py-3.5 bg-[#00ADB5] hover:bg-[#009299] text-[#222831] font-extrabold text-sm rounded-xl shadow-lg transition"
          >
            Explore Full Range
          </button>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[#00ADB5] text-xs font-bold uppercase tracking-wider block mb-1">
            Testimonials
          </span>
          <h2 className="text-3xl font-extrabold text-[#222831]">
            Loved By Sleep Enthusiasts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#393E46]/10 shadow-sm space-y-4">
            <div className="flex text-[#00ADB5] text-sm">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p className="text-xs text-[#393E46] leading-relaxed italic">
              "The Ortho Pro mattress completely transformed my sleep posture. My chronic lower back stiffness was gone within a week."
            </p>
            <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#393E46] text-[#00ADB5] font-bold flex items-center justify-center text-xs">
                S
              </div>
              <div>
                <p className="font-bold text-xs text-[#222831]">Suresh Patel</p>
                <p className="text-[10px] text-gray-400">Verified Buyer • Gujarat</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#393E46]/10 shadow-sm space-y-4">
            <div className="flex text-[#00ADB5] text-sm">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p className="text-xs text-[#393E46] leading-relaxed italic">
              "Incredible zero-motion isolation. When my partner tosses, I don't feel a thing. The cooling fabric is exceptional."
            </p>
            <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#393E46] text-[#00ADB5] font-bold flex items-center justify-center text-xs">
                G
              </div>
              <div>
                <p className="font-bold text-xs text-[#222831]">Ganesh Iyer</p>
                <p className="text-[10px] text-gray-400">Verified Buyer • Mumbai</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#393E46]/10 shadow-sm space-y-4">
            <div className="flex text-[#00ADB5] text-sm">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <p className="text-xs text-[#393E46] leading-relaxed italic">
              "Fast delivery, premium unboxing, and the most comfortable sleep experience we've ever had. Truly 5-star value."
            </p>
            <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#393E46] text-[#00ADB5] font-bold flex items-center justify-center text-xs">
                R
              </div>
              <div>
                <p className="font-bold text-xs text-[#222831]">Ramesh Singh</p>
                <p className="text-[10px] text-gray-400">Verified Buyer • Delhi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Matters;