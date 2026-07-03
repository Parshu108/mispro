import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderComplete = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Order placed successfully! 🎉");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      {isLoading ? (
        <div className="flex h-[300px] w-full items-center justify-center pt-24">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
            {/* Result section */}
            <div className="flex flex-col items-center text-center">
              <CheckCircle2
                className="text-green-500"
                size={64}
                strokeWidth={1.5}
              />
              <h1 className="mt-4 text-2xl font-bold text-gray-900">
                Order Placed Successfully!
              </h1>
              <p className="mt-2 text-gray-600">
                Thank you for shopping with us 🎉 <br />
                Your order has been confirmed and will be delivered soon.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => navigate("/")}
                  className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => navigate("/cartdata")}
                  className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  View Cart
                </button>
              </div>
            </div>

            {/* Order Info */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold text-gray-800">#MIS123456</p>
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Estimated Delivery</p>
                <p className="font-semibold text-gray-800">
                  3 - 5 Working Days
                </p>
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-semibold text-gray-800">Cash on Delivery</p>
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Support</p>
                <p className="font-semibold text-gray-800">+91 98765 43210</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderComplete;
