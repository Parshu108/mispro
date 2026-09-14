import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCart } from "../cartslice";
import { FaRupeeSign, FaShieldAlt, FaTruck, FaLock } from "react-icons/fa";

const Checkout = () => {
  const product = useSelector((state) => state.mycart.cart) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "cod",
  });
  const [loading, setLoading] = useState(false);

  let totalPrice = 0;
  product.forEach((item) => {
    totalPrice += (Number(item.prize) || 0) * (Number(item.qnty) || 1);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.length === 0) {
      alert("Your cart is empty! Please add products before placing an order.");
      navigate("/shop");
      return;
    }

    if (!input.fullname || !input.phone || !input.address || !input.city || !input.pincode) {
      alert("Please fill in all mandatory fields (*).");
      return;
    }

    try {
      setLoading(true);
      const api = "http://localhost:3000/costomber";
      const payload = {
        products: product,
        totalamount: totalPrice,
        fullname: input.fullname,
        phone: input.phone,
        email: input.email,
        address: input.address,
        city: input.city,
        state: input.state,
        pincode: input.pincode,
        payment: input.payment || "cod",
        status: "Pending",
        orderDate: new Date().toLocaleDateString("en-IN"),
      };

      const response = await axios.post(api, payload);
      dispatch(removeCart());
      navigate("/ordercomplete", { state: { order: response.data || payload } });
    } catch (error) {
      console.error("Error submitting order to json-server:", error);
      const fallbackPayload = {
        id: Math.floor(100000 + Math.random() * 900000).toString(),
        products: product,
        totalamount: totalPrice,
        fullname: input.fullname,
        phone: input.phone,
        email: input.email,
        address: input.address,
        city: input.city,
        state: input.state,
        pincode: input.pincode,
        payment: input.payment || "cod",
        status: "Pending",
        orderDate: new Date().toLocaleDateString("en-IN"),
      };
      dispatch(removeCart());
      navigate("/ordercomplete", { state: { order: fallbackPayload } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#EEEEEE] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <span className="text-xs font-bold text-[#00ADB5] uppercase tracking-wider block">
            Step 2 of 2
          </span>
          <h1 className="text-3xl font-extrabold text-[#222831] mt-1 flex items-center gap-2">
            <FaLock className="text-[#00ADB5] text-2xl" /> Secure Checkout
          </h1>
          <p className="text-sm text-[#393E46] mt-1">
            Complete your delivery information and choose a preferred payment method
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Billing Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-[#393E46]/15 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-[#222831] border-b border-gray-100 pb-3">
                  1. Shipping & Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#393E46] uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    required
                    value={input.fullname}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#393E46] uppercase mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={input.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#393E46] uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@example.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#393E46] uppercase mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    value={input.address}
                    onChange={handleChange}
                    placeholder="House / Flat No., Street, Landmark, Area"
                    rows="3"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#393E46] uppercase mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={input.city}
                    onChange={handleChange}
                    placeholder="e.g. Bhopal"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#393E46] uppercase mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={input.state}
                    onChange={handleChange}
                    placeholder="e.g. Madhya Pradesh"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#393E46] uppercase mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={input.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 462026"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-4 border-t border-gray-100">
                <h2 className="text-lg font-bold text-[#222831] mb-3">
                  2. Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-4 border rounded-xl flex items-start gap-3 cursor-pointer transition ${
                      input.payment === "cod"
                        ? "border-[#00ADB5] bg-[#00ADB5]/10 shadow-xs"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={input.payment === "cod"}
                      onChange={handleChange}
                      className="mt-1 accent-[#00ADB5]"
                    />
                    <div>
                      <span className="font-bold text-[#222831] text-sm block">Cash on Delivery</span>
                      <span className="text-xs text-[#393E46]">Pay when your mattress arrives</span>
                    </div>
                  </label>

                  <label
                    className={`p-4 border rounded-xl flex items-start gap-3 cursor-pointer transition ${
                      input.payment === "online"
                        ? "border-[#00ADB5] bg-[#00ADB5]/10 shadow-xs"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={input.payment === "online"}
                      onChange={handleChange}
                      className="mt-1 accent-[#00ADB5]"
                    />
                    <div>
                      <span className="font-bold text-[#222831] text-sm block">Online UPI / Card</span>
                      <span className="text-xs text-[#393E46]">Instant digital checkout</span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || product.length === 0}
                className="w-full py-3.5 px-6 rounded-xl bg-[#00ADB5] hover:bg-[#009299] text-[#222831] hover:text-white font-extrabold text-base shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#222831] border-t-transparent rounded-full animate-spin"></div>
                    Processing Order...
                  </>
                ) : (
                  `Confirm & Place Order (₹${totalPrice.toLocaleString("en-IN")})`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#222831] text-[#EEEEEE] border border-[#393E46] rounded-2xl shadow-md p-6 space-y-4">
              <h2 className="text-lg font-bold text-[#EEEEEE] border-b border-[#393E46] pb-3">
                Order Summary ({product.length} Items)
              </h2>

              {product.length === 0 ? (
                <p className="text-sm text-gray-400 py-4">No items in your cart.</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1 divide-y divide-[#393E46]">
                  {product.map((item, idx) => (
                    <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.img || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=80"}
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover border border-[#393E46] bg-gray-800"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=80";
                          }}
                        />
                        <div>
                          <p className="font-semibold text-[#EEEEEE] text-sm">{item.name}</p>
                          <p className="text-xs text-[#00ADB5]">
                            ₹{item.prize} × {item.qnty || 1}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-[#EEEEEE] text-sm">
                        ₹{((Number(item.prize) || 0) * (Number(item.qnty) || 1)).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Calculations */}
              <div className="border-t border-[#393E46] pt-4 space-y-2 text-sm text-[#EEEEEE]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#00ADB5] font-semibold">
                  <span>Delivery Charges</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#EEEEEE] border-t border-[#393E46] pt-3">
                  <span>Total Amount</span>
                  <span className="text-[#00ADB5]">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/cartdata")}
                className="w-full py-2.5 bg-[#393E46] text-[#EEEEEE] hover:bg-[#393E46]/80 rounded-xl font-semibold text-xs transition"
              >
                Modify Cart Items
              </button>
            </div>

            {/* Trust badges */}
            <div className="bg-white border border-[#393E46]/10 rounded-2xl p-4 flex items-center justify-around text-xs text-[#393E46] shadow-xs">
              <div className="flex items-center gap-2">
                <FaTruck className="text-[#00ADB5] text-lg" />
                <span>Free doorstep delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-[#00ADB5] text-lg" />
                <span>10-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;