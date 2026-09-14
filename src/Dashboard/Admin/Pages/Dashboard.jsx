import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaBoxOpen,
  FaUsers,
  FaRupeeSign,
  FaArrowRight,
  FaTruck,
  FaClock,
  FaCheckCircle,
  FaChartLine,
  FaStore,
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    codCount: 0,
    onlineCount: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [prodRes, ordersRes] = await Promise.all([
        axios.get("http://localhost:3000/product2").catch(() => ({ data: [] })),
        axios
          .get("http://localhost:3000/costomber")
          .catch(() => ({ data: [] })),
      ]);

      const products = prodRes.data || [];
      const orders = (ordersRes.data || []).filter(
        (o) =>
          o.fullname || o.totalamount || (o.products && o.products.length > 0),
      );

      const totalRev = orders.reduce(
        (sum, o) => sum + (Number(o.totalamount) || 0),
        0,
      );
      const uniqueCustomers = new Set(
        orders
          .map((o) =>
            (o.email || o.phone || o.fullname || "").trim().toLowerCase(),
          )
          .filter(Boolean),
      ).size;

      const pending = orders.filter(
        (o) => !o.status || o.status.toLowerCase() === "pending",
      ).length;
      const delivered = orders.filter(
        (o) => o.status && o.status.toLowerCase() === "delivered",
      ).length;
      const cod = orders.filter(
        (o) => (o.payment || "cod").toLowerCase() === "cod",
      ).length;
      const online = orders.filter(
        (o) => (o.payment || "").toLowerCase() === "online",
      ).length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: totalRev,
        totalCustomers: uniqueCustomers || orders.length,
        pendingOrders: pending,
        deliveredOrders: delivered,
        codCount: cod,
        onlineCount: online,
      });

      setRecentOrders(orders.slice().reverse().slice(0, 5));
    } catch (error) {
      console.error("Dashboard metrics load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div
      className="space-y-8"
      style={{ fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap');
      `}</style>

      {/* Top Banner */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8 text-[#EEEEEE] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{
          background: "linear-gradient(135deg, #222831 0%, #393E46 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full"
          style={{ background: "#00ADB5", opacity: 0.12, filter: "blur(10px)" }}
        />

        <div className="relative">
          <span className="inline-block px-3 py-1 bg-[#00ADB5]/15 border border-[#00ADB5]/30 text-[#00ADB5] rounded-full text-xs font-semibold mb-3">
            Mishu Mattress Admin Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#EEEEEE]">
            Welcome to Store Operations
          </h1>
          <p className="text-[#EEEEEE]/60 text-sm mt-1.5 max-w-xl">
            Live overview of store performance, real-time inventory counts,
            customer trends, and order fulfillment.
          </p>
        </div>

        <div className="relative flex flex-wrap gap-3">
          <Link
            to="/admin/orders"
            className="px-4 py-2.5 bg-[#00ADB5] hover:bg-[#009299] text-[#222831] font-bold text-sm rounded-xl shadow transition flex items-center gap-2"
          >
            <FaShoppingBag /> View All Orders
          </Link>
          <Link
            to="/"
            target="_blank"
            className="px-4 py-2.5 bg-transparent hover:bg-[#EEEEEE]/10 text-[#EEEEEE] font-semibold text-sm rounded-xl border border-[#EEEEEE]/25 transition flex items-center gap-2"
          >
            <FaStore /> Visit Live Store
          </Link>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue — the one metric that gets the brand accent */}
        <div className="bg-white p-6 rounded-2xl border border-[#00ADB5]/25 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#393E46]/70">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#00ADB5]/10 text-[#00ADB5] flex items-center justify-center text-lg">
              <FaRupeeSign />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-[#222831] flex items-center">
              ₹{stats.totalRevenue.toLocaleString("en-IN")}
            </h2>
            <p className="text-xs font-medium text-[#00ADB5] mt-1 flex items-center gap-1">
              <FaChartLine /> Calculated from confirmed orders
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-2xl border border-[#393E46]/15 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#393E46]/70">
              Total Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#EEEEEE] text-[#222831] flex items-center justify-center text-lg">
              <FaShoppingBag />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-[#222831]">
              {stats.totalOrders}
            </h2>
            <p className="text-xs font-medium text-[#393E46]/70 mt-1">
              {stats.pendingOrders} Pending Fulfillment
            </p>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-2xl border border-[#393E46]/15 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#393E46]/70">
              Active Products
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#EEEEEE] text-[#222831] flex items-center justify-center text-lg">
              <FaBoxOpen />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-[#222831]">
              {stats.totalProducts}
            </h2>
            <p className="text-xs font-medium text-[#393E46]/70 mt-1">
              In Shop and Featured collections
            </p>
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-6 rounded-2xl border border-[#393E46]/15 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#393E46]/70">
              Unique Buyers
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#EEEEEE] text-[#222831] flex items-center justify-center text-lg">
              <FaUsers />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-extrabold text-[#222831]">
              {stats.totalCustomers}
            </h2>
            <p className="text-xs font-medium text-[#393E46]/70 mt-1">
              Registered &amp; checkout clients
            </p>
          </div>
        </div>
      </div>

      {/* Secondary Row: Order Status Breakdown & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment & Fulfillment Overview */}
        <div className="bg-white p-6 rounded-2xl border border-[#393E46]/15 shadow-xs lg:col-span-1 space-y-4">
          <h3 className="text-base font-bold text-[#222831]">
            Order Breakdown
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FaClock className="text-amber-600" />
                <span className="text-sm font-semibold text-amber-900">
                  Pending Orders
                </span>
              </div>
              <span className="text-base font-bold text-amber-900">
                {stats.pendingOrders}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FaCheckCircle className="text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-900">
                  Delivered Orders
                </span>
              </div>
              <span className="text-base font-bold text-emerald-900">
                {stats.deliveredOrders}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#00ADB5]/10 border border-[#00ADB5]/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FaTruck className="text-[#00ADB5]" />
                <span className="text-sm font-semibold text-[#00838a]">
                  COD Payments
                </span>
              </div>
              <span className="text-base font-bold text-[#00838a]">
                {stats.codCount}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/admin/products"
              className="w-full py-2.5 px-4 bg-[#EEEEEE] hover:bg-[#393E46]/15 text-[#222831] text-xs font-bold rounded-xl transition flex items-center justify-center gap-2"
            >
              Manage Mattress Catalog <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white p-6 rounded-2xl border border-[#393E46]/15 shadow-xs lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#222831]">
                  Recent Customer Orders
                </h3>
                <p className="text-xs text-[#393E46]/70">
                  Latest mattress orders placed through checkout
                </p>
              </div>
              <Link
                to="/admin/orders"
                className="text-xs font-bold text-[#00ADB5] hover:text-[#009299] flex items-center gap-1"
              >
                View all <FaArrowRight />
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center text-[#393E46]/70">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-[#393E46]/20 border-t-[#00ADB5] mb-2"></div>
                <p className="text-xs">Loading orders...</p>
              </div>
            ) : recentOrders.length === 0 ? (
              <p className="text-sm text-[#393E46]/70 text-center py-8">
                No orders placed yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#393E46]/10 text-xs font-semibold text-[#393E46]/70 uppercase">
                      <th className="pb-3">Order</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#393E46]/10">
                    {recentOrders.map((ord) => (
                      <tr
                        key={ord.id}
                        className="hover:bg-[#EEEEEE]/50 transition"
                      >
                        <td className="py-3 font-mono font-medium text-[#00ADB5] text-xs">
                          #{ord.id}
                        </td>
                        <td className="py-3">
                          <p className="font-semibold text-[#222831] text-xs sm:text-sm">
                            {ord.fullname || "Customer"}
                          </p>
                          <p className="text-[11px] text-[#393E46]/50">
                            {ord.city || "Online"}
                          </p>
                        </td>
                        <td className="py-3 font-bold text-[#222831] text-xs sm:text-sm">
                          ₹
                          {(Number(ord.totalamount) || 0).toLocaleString(
                            "en-IN",
                          )}
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              (ord.status || "pending").toLowerCase() ===
                              "delivered"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {ord.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
