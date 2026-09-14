import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRupeeSign, FaPlus, FaMinus, FaTrash, FaShoppingBag, FaArrowRight } from "react-icons/fa";
import { qntIncrese, qntydecrease, dataRemove } from "../cartslice";
import { useNavigate, Link } from "react-router-dom";

const Cartdata = () => {
  const prodata = useSelector((state) => state.mycart.cart) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let netAmount = 0;
  prodata.forEach((item) => {
    netAmount += (Number(item.prize) || 0) * (Number(item.qnty) || 1);
  });

  return (
    <div className="bg-[#EEEEEE] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#222831] flex items-center gap-2">
              <FaShoppingBag className="text-[#00ADB5]" /> Shopping Cart
            </h1>
            <p className="text-sm text-[#393E46] mt-1">
              Review your mattress selection and proceed to secure checkout
            </p>
          </div>

          <div className="bg-[#222831] text-[#EEEEEE] px-4 py-2 rounded-xl flex items-center gap-2 shadow-xs self-start sm:self-auto">
            <span className="text-xs font-semibold text-[#00ADB5]">Total Items:</span>
            <span className="text-base font-bold">{prodata.length}</span>
          </div>
        </div>

        {prodata.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#393E46]/10 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 bg-[#EEEEEE] text-[#00ADB5] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              <FaShoppingBag />
            </div>
            <h3 className="text-xl font-bold text-[#222831]">Your Cart is Empty</h3>
            <p className="text-xs text-[#393E46] mt-2 mb-6">
              Looks like you haven't added any mattresses to your cart yet.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ADB5] hover:bg-[#009299] text-[#222831] font-bold text-xs rounded-xl shadow-md transition"
            >
              Browse Shop Collection <FaArrowRight />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items Table */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-[#393E46]/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#222831] text-[#EEEEEE] text-xs font-bold uppercase tracking-wider">
                        <th className="py-4 px-4">Item</th>
                        <th className="py-4 px-4">Price</th>
                        <th className="py-4 px-4 text-center">Quantity</th>
                        <th className="py-4 px-4">Subtotal</th>
                        <th className="py-4 px-4 text-center">Remove</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {prodata.map((item, idx) => (
                        <tr key={item.id || idx} className="hover:bg-gray-50/80 transition">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.img || item.image || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=80"}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-xl border border-gray-200 bg-gray-50 shrink-0"
                                onError={(e) => {
                                  e.target.src = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=80";
                                }}
                              />
                              <div>
                                <h4 className="font-bold text-sm text-[#222831]">{item.name}</h4>
                                <span className="text-[11px] text-[#00ADB5] font-semibold">Ortho Care</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-bold text-[#393E46]">
                            ₹{(Number(item.prize) || 0).toLocaleString("en-IN")}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1 rounded-xl w-fit mx-auto border border-gray-200">
                              <button
                                onClick={() => dispatch(qntydecrease({ id: item.id }))}
                                className="p-1 text-[#222831] hover:text-[#00ADB5] transition"
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              <span className="font-extrabold text-xs px-2 text-[#222831]">
                                {item.qnty || 1}
                              </span>
                              <button
                                onClick={() => dispatch(qntIncrese({ id: item.id }))}
                                className="p-1 text-[#222831] hover:text-[#00ADB5] transition"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-extrabold text-[#222831]">
                            ₹{((Number(item.prize) || 0) * (Number(item.qnty) || 1)).toLocaleString("en-IN")}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => dispatch(dataRemove({ id: item.id }))}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition text-sm"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#222831] text-[#EEEEEE] rounded-2xl p-6 shadow-md border-t-4 border-[#00ADB5] space-y-4">
                <h3 className="text-base font-bold text-[#EEEEEE] border-b border-[#393E46] pb-3">
                  Cart Summary
                </h3>

                <div className="space-y-2 text-xs text-[#EEEEEE]/80">
                  <div className="flex justify-between">
                    <span>Selected Items</span>
                    <span className="font-bold">{prodata.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#00ADB5] font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-[#EEEEEE] border-t border-[#393E46] pt-3">
                    <span>Total Amount</span>
                    <span className="text-[#00ADB5]">₹{netAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-3.5 px-4 bg-[#00ADB5] hover:bg-[#009299] text-[#222831] hover:text-white font-extrabold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 mt-4"
                >
                  Proceed to Checkout <FaArrowRight />
                </button>
              </div>

              <button
                onClick={() => navigate("/shop")}
                className="w-full py-2.5 bg-white border border-[#393E46]/20 text-[#393E46] hover:bg-gray-100 rounded-xl font-semibold text-xs transition"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cartdata;
