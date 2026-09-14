import { useState, useEffect } from "react";
import axios from "axios";
import img1 from "../image/payment-.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import {
  FaRupeeSign,
  FaShoppingCart,
  FaBolt,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import { addtocard } from "../cartslice";
import { addtowishlist, removefromwishlist } from "../wishlistslice";

const Productdisplay = () => {
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("King");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const wishlist = useSelector((state) => state.mywishlist.wishlist);
  const isWished = wishlist.some((item) => item.id == product.id);

  const loaddata = async () => {
    try {
      setLoading(true);
      setProduct({}); // clear previous product so a failed/slow fetch can't show stale data

      try {
        const res = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(res.data || {});
      } catch (firstError) {
        // Not found in "product" — this id may belong to the "product2" collection instead
        const res = await axios.get(`http://localhost:3000/product2/${id}`);
        setProduct(res.data || {});
      }
    } catch (error) {
      console.error("Error loading product:", error);
      setProduct({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loaddata();
  }, [id]);

  const sizes = ["King", "Queen", "Double", "Single", "Custom Size"];

  const toggleWishlist = () => {
    if (isWished) {
      dispatch(removefromwishlist({ id: product.id }));
    } else {
      dispatch(
        addtowishlist({
          id: product.id,
          name: product.name,
          img: product.img,
          prize: product.prize,
        }),
      );
    }
  };

  return (
    <div className="bg-[#EEEEEE] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="p-16 text-center text-[#393E46]">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#393E46] border-t-[#00ADB5] mb-3"></div>
            <p className="font-semibold text-sm">Loading mattress details...</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#393E46]/10 shadow-xl overflow-hidden p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Image Preview */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center justify-center">
                <img
                  className="w-full max-h-96 object-contain rounded-xl hover:scale-105 transition-transform duration-300"
                  src={product.img}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400";
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00ADB5]">
                    Mishu Premium Ortho Series
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222831] mt-1">
                    {product.name || "Orthopedic Comfort Mattress"}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-yellow-500 text-sm">
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStar />
                      <IoStarHalf />
                    </div>
                    <span className="text-xs font-bold text-[#393E46]">
                      4.8 / 5.0 (142 Reviews)
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#393E46] leading-relaxed">
                  The {product.name} offers the ideal balance of adaptive
                  pressure relief and firm orthopedic alignment. Infused with
                  breathable cool-gel memory foam to regulate core sleep
                  temperature throughout the night.
                </p>

                {/* Size Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#222831] uppercase tracking-wider mb-2">
                    Select Dimensions & Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                          selectedSize === size
                            ? "bg-[#222831] text-[#00ADB5] border-2 border-[#00ADB5] shadow-xs"
                            : "bg-[#EEEEEE] text-[#393E46] hover:bg-gray-200 border border-transparent"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price tag */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs font-bold uppercase text-[#393E46]">
                    Special Price:
                  </span>
                  <span className="text-3xl font-extrabold text-[#222831] flex items-center">
                    <FaRupeeSign className="text-2xl text-[#00ADB5]" />
                    {(Number(product.prize) || 0).toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Save 25%
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      dispatch(
                        addtocard({
                          id: product.id,
                          name: product.name,
                          img: product.img,
                          prize: product.prize,
                          qnty: 1,
                        }),
                      );
                    }}
                    className="flex-1 py-3 px-6 bg-[#00ADB5] hover:bg-[#009299] text-[#222831] hover:text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>

                  <button
                    onClick={() => {
                      dispatch(
                        addtocard({
                          id: product.id,
                          name: product.name,
                          img: product.img,
                          prize: product.prize,
                          qnty: 1,
                        }),
                      );
                      navigate("/checkout");
                    }}
                    className="flex-1 py-3 px-6 bg-[#222831] hover:bg-[#393E46] text-[#EEEEEE] font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <FaBolt className="text-[#00ADB5]" /> Buy Now
                  </button>

                  <button
                    onClick={toggleWishlist}
                    title={
                      isWished ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className={`p-3 rounded-xl border text-xl transition ${
                      isWished
                        ? "bg-red-50 text-red-500 border-red-200"
                        : "bg-[#EEEEEE] text-red-500 border-[#393E46]/10 hover:bg-red-50"
                    }`}
                  >
                    {isWished ? <FaHeart /> : <CiHeart />}
                  </button>
                </div>

                {/* Value perks */}
                <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs text-[#393E46]">
                  <div className="flex items-center gap-2">
                    <FaTruck className="text-[#00ADB5]" />
                    <span>Free Pan-India Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-[#00ADB5]" />
                    <span>10-Year Manufacturer Warranty</span>
                  </div>
                </div>

                {/* Payment icons */}
                <div className="pt-2">
                  <img
                    src={img1}
                    alt="Secure Payments"
                    className="h-8 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productdisplay;
