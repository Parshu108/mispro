import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, ShoppingBag, Truck } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const placedOrder = location.state?.order || null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Order placed successfully! 🎉");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const orderId = placedOrder?.id ? `#MIS${placedOrder.id}` : "#MIS" + Math.floor(100000 + Math.random() * 900000);
  const paymentMethod = (placedOrder?.payment || "cod").toUpperCase();
  const customerName = placedOrder?.fullname || "Valued Customer";
  const totalAmount = placedOrder?.totalamount
    ? Number(placedOrder.totalamount).toLocaleString("en-IN")
    : null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {isLoading ? (
        <div className="flex h-[400px] w-full items-center justify-center bg-[#EEEEEE]">
          <div className="text-center space-y-3">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#393E46] border-t-[#00ADB5] mx-auto" />
            <p className="text-sm text-[#393E46] font-medium">Confirming your mattress order...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-[85vh] flex items-center justify-center bg-[#EEEEEE] py-12 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-10 shadow-2xl border border-[#393E46]/10">
            {/* Result Header */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#00ADB5]/15 text-[#00ADB5] rounded-full flex items-center justify-center mb-4 shadow-xs">
                <CheckCircle2 size={48} strokeWidth={2.5} />
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222831]">
                Order Confirmed!
              </h1>
              <p className="mt-2 text-sm text-[#393E46] max-w-md">
                Thank you <span className="font-bold text-[#222831]">{customerName}</span>! Your mattress order has been logged and is scheduled for dispatch.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => navigate("/shop")}
                  className="rounded-xl bg-[#00ADB5] hover:bg-[#009299] px-6 py-2.5 text-sm font-extrabold text-[#222831] hover:text-white transition shadow-md flex items-center gap-2"
                >
                  <ShoppingBag size={16} /> Continue Shopping
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="rounded-xl border border-[#393E46] bg-white px-6 py-2.5 text-sm font-semibold text-[#393E46] hover:bg-gray-50 transition"
                >
                  Back to Home
                </button>
              </div>
            </div>

            {/* Order Info Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl bg-[#EEEEEE] p-4 border border-gray-200">
                <p className="text-xs font-bold uppercase text-[#393E46]">Order Reference</p>
                <p className="font-mono font-extrabold text-[#00ADB5] text-base mt-0.5">{orderId}</p>
              </div>

              <div className="rounded-2xl bg-[#EEEEEE] p-4 border border-gray-200">
                <p className="text-xs font-bold uppercase text-[#393E46]">Estimated Delivery</p>
                <p className="font-semibold text-[#222831] text-base mt-0.5 flex items-center gap-1.5">
                  <Truck size={16} className="text-[#00ADB5]" /> 3 - 5 Working Days
                </p>
              </div>

              <div className="rounded-2xl bg-[#EEEEEE] p-4 border border-gray-200">
                <p className="text-xs font-bold uppercase text-[#393E46]">Payment Mode</p>
                <p className="font-semibold text-[#222831] text-base mt-0.5">
                  {paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#EEEEEE] p-4 border border-gray-200">
                <p className="text-xs font-bold uppercase text-[#393E46]">
                  {totalAmount ? "Order Total" : "Customer Support"}
                </p>
                <p className="font-bold text-[#222831] text-base mt-0.5">
                  {totalAmount ? `₹${totalAmount}` : "+91 63521 09065"}
                </p>
              </div>
            </div>

            {/* Delivery address banner if present */}
            {placedOrder?.address && (
              <div className="mt-4 p-4 rounded-2xl bg-[#222831] text-[#EEEEEE] border border-[#393E46] text-xs">
                <span className="font-bold text-[#00ADB5] block mb-1">Shipping To:</span>
                <p className="text-[#EEEEEE]/80">
                  {placedOrder.address}, {placedOrder.city} {placedOrder.state} - {placedOrder.pincode}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderComplete;
