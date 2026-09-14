import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaShoppingBag,
  FaSearch,
  FaEye,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaTimesCircle,
  FaRupeeSign,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPayment, setFilterPayment] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/costomber");
      // Filter out empty demo records if any
      const validOrders = (res.data || []).filter(
        (order) =>
          (order.products && order.products.length > 0) ||
          order.fullname ||
          order.totalamount,
      );
      setOrders(validOrders.reverse()); // latest first
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:3000/costomber/${id}`);
        setOrders(orders.filter((item) => item.id !== id));
        if (selectedOrder && selectedOrder.id === id) {
          setSelectedOrder(null);
        }
      } catch (err) {
        console.error("Error deleting order:", err);
        // Optimistically update if server fails
        setOrders(orders.filter((item) => item.id !== id));
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/costomber/${orderId}`, {
        status: newStatus,
      });
      setOrders(
        orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      // Fallback update locally if server does not support patch
      setOrders(
        orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );
    }
  };

  const getStatusBadge = (status = "Pending") => {
    switch (status.toLowerCase()) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <FaCheckCircle className="text-xs" /> Delivered
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <FaTruck className="text-xs" /> Shipped
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            <FaTimesCircle className="text-xs" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <FaClock className="text-xs" /> Pending
          </span>
        );
    }
  };

  const filteredOrders = orders.filter((order) => {
    const customerName = order.fullname || "Anonymous Customer";
    const email = order.email || "";
    const phone = order.phone || "";
    const id = String(order.id || "");
    const city = order.city || "";

    const matchesSearch =
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm) ||
      id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPayment =
      filterPayment === "all" ||
      (order.payment &&
        order.payment.toLowerCase() === filterPayment.toLowerCase());

    const orderStatus = (order.status || "Pending").toLowerCase();
    const matchesStatus =
      statusFilter === "all" || orderStatus === statusFilter.toLowerCase();

    return matchesSearch && matchesPayment && matchesStatus;
  });

  return (
    <div
      className="space-y-6"
      style={{ fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap');
      `}</style>

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#222831] flex items-center gap-2">
            <FaShoppingBag className="text-[#00ADB5]" /> Order Management
          </h1>
          <p className="text-sm text-[#393E46]/70 mt-1">
            Track, update, and manage all customer mattress orders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadOrders}
            className="px-4 py-2 bg-white border border-[#393E46]/20 text-[#222831] text-sm font-medium rounded-lg hover:bg-[#EEEEEE] shadow-sm transition"
          >
            Refresh Orders
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#393E46]/15 shadow-sm">
          <p className="text-xs font-bold text-[#393E46]/70">Total Orders</p>
          <h3 className="text-2xl font-bold text-[#222831] mt-1">
            {orders.length}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#00ADB5]/25 shadow-sm">
          <p className="text-xs font-bold text-[#00ADB5]">Total Revenue</p>
          <h3 className="text-2xl font-bold text-[#222831] mt-1 flex items-center">
            <FaRupeeSign className="text-lg" />
            {orders
              .reduce((acc, o) => acc + (Number(o.totalamount) || 0), 0)
              .toLocaleString("en-IN")}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#393E46]/15 shadow-sm">
          <p className="text-xs font-bold text-amber-600">Pending Orders</p>
          <h3 className="text-2xl font-bold text-[#222831] mt-1">
            {
              orders.filter(
                (o) => !o.status || o.status.toLowerCase() === "pending",
              ).length
            }
          </h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#393E46]/15 shadow-sm">
          <p className="text-xs font-bold text-[#393E46]/70">
            COD / Online Split
          </p>
          <h3 className="text-2xl font-bold text-[#222831] mt-1">
            {
              orders.filter((o) => (o.payment || "cod").toLowerCase() === "cod")
                .length
            }{" "}
            /{" "}
            {
              orders.filter((o) => (o.payment || "").toLowerCase() === "online")
                .length
            }
          </h3>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-[#393E46]/15 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3.5 text-[#393E46]/50 text-sm" />
          <input
            type="text"
            placeholder="Search by ID, customer name, phone, city, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-[#393E46]/20 rounded-lg text-sm text-[#222831] focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#393E46]/20 rounded-lg px-3 py-2 text-sm text-[#222831] bg-white focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="border border-[#393E46]/20 rounded-lg px-3 py-2 text-sm text-[#222831] bg-white focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          >
            <option value="all">All Payments</option>
            <option value="cod">Cash on Delivery (COD)</option>
            <option value="online">Online Payment</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-[#393E46]/15 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#393E46]/70">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#393E46]/15 border-t-[#00ADB5] mb-2"></div>
            <p>Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-[#393E46]/70">
            <FaShoppingBag className="mx-auto text-4xl text-[#393E46]/20 mb-3" />
            <p className="font-semibold text-[#222831]">No orders found</p>
            <p className="text-sm text-[#393E46]/50 mt-1">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEEEEE]/60 border-b border-[#393E46]/15 text-xs font-semibold text-[#393E46]/70 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#393E46]/10 text-sm">
                {filteredOrders.map((order) => {
                  const itemsCount = order.products ? order.products.length : 0;
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-[#EEEEEE]/50 transition"
                    >
                      <td className="py-3.5 px-4 font-mono font-medium text-[#00ADB5]">
                        #{order.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#222831]">
                          {order.fullname || "Guest User"}
                        </div>
                        <div className="text-xs text-[#393E46]/60">
                          {order.phone || order.email || "No contact"}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#393E46]/80">
                        {itemsCount > 0 ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#EEEEEE] text-[#222831]">
                            {itemsCount}{" "}
                            {itemsCount === 1 ? "Product" : "Products"}
                          </span>
                        ) : (
                          <span className="text-xs text-[#393E46]/40">
                            0 Items
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#222831]">
                        ₹
                        {(Number(order.totalamount) || 0).toLocaleString(
                          "en-IN",
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-semibold uppercase ${
                            (order.payment || "cod") === "online"
                              ? "bg-[#00ADB5]/10 text-[#00838a]"
                              : "bg-[#393E46]/10 text-[#393E46]"
                          }`}
                        >
                          {order.payment || "COD"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(order.status || "Pending")}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            title="View Full Details"
                            className="p-1.5 text-[#00ADB5] hover:bg-[#00ADB5]/10 rounded-lg transition"
                          >
                            <FaEye className="text-base" />
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            title="Delete Order"
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                          >
                            <FaTrash className="text-base" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#222831]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#393E46]/15">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#393E46]/15 bg-[#EEEEEE]/50">
              <div>
                <h3 className="text-xl font-bold text-[#222831] flex items-center gap-2">
                  <FaFileInvoiceDollar className="text-[#00ADB5]" /> Order #
                  {selectedOrder.id} Details
                </h3>
                <p className="text-xs text-[#393E46]/60 mt-0.5">
                  Full customer &amp; product breakdown
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-[#393E46]/60 hover:text-[#222831] text-xl font-bold p-1 rounded-lg hover:bg-[#EEEEEE] transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Update Control */}
              <div className="bg-[#00ADB5]/8 p-4 rounded-xl border border-[#00ADB5]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#00838a]">
                    Current Order Status
                  </p>
                  <div className="mt-1">
                    {getStatusBadge(selectedOrder.status || "Pending")}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium text-[#393E46]/70">
                    Update Status:
                  </label>
                  <select
                    value={selectedOrder.status || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(selectedOrder.id, e.target.value)
                    }
                    className="border border-[#393E46]/20 rounded-lg px-3 py-1.5 text-xs font-semibold bg-white text-[#222831] focus:ring-2 focus:ring-[#00ADB5]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-[#393E46]/15 rounded-xl p-4 bg-[#EEEEEE]/40">
                  <h4 className="text-xs font-bold text-[#393E46]/70 mb-3">
                    Customer Info
                  </h4>
                  <div className="space-y-2 text-sm text-[#393E46]">
                    <p className="flex items-center gap-2">
                      <FaUser className="text-[#393E46]/40 text-xs" />
                      <span className="font-semibold text-[#222831]">
                        {selectedOrder.fullname || "Not provided"}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaPhone className="text-[#393E46]/40 text-xs" />
                      <span>{selectedOrder.phone || "Not provided"}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaEnvelope className="text-[#393E46]/40 text-xs" />
                      <span className="break-all">
                        {selectedOrder.email || "Not provided"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="border border-[#393E46]/15 rounded-xl p-4 bg-[#EEEEEE]/40">
                  <h4 className="text-xs font-bold text-[#393E46]/70 mb-3">
                    Shipping Address
                  </h4>
                  <div className="space-y-1 text-sm text-[#393E46]">
                    <p className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-[#00ADB5] text-xs mt-1 shrink-0" />
                      <span>
                        {selectedOrder.address || "No street address"},<br />
                        {selectedOrder.city && `${selectedOrder.city}, `}
                        {selectedOrder.state && `${selectedOrder.state} `}
                        {selectedOrder.pincode && `- ${selectedOrder.pincode}`}
                      </span>
                    </p>
                    <div className="pt-2">
                      <span className="text-xs text-[#393E46]/60">
                        Payment:{" "}
                      </span>
                      <span className="font-semibold uppercase text-xs px-2 py-0.5 rounded bg-[#393E46]/10 text-[#222831]">
                        {selectedOrder.payment || "COD"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ordered Items List */}
              <div>
                <h4 className="text-xs font-bold text-[#393E46]/70 mb-3">
                  Ordered Products (
                  {selectedOrder.products ? selectedOrder.products.length : 0})
                </h4>
                <div className="border border-[#393E46]/15 rounded-xl overflow-hidden divide-y divide-[#393E46]/10">
                  {selectedOrder.products &&
                  selectedOrder.products.length > 0 ? (
                    selectedOrder.products.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 flex items-center justify-between gap-4 hover:bg-[#EEEEEE]/50"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              item.img ||
                              item.image ||
                              "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=100"
                            }
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-lg border border-[#393E46]/15"
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=100";
                            }}
                          />
                          <div>
                            <p className="font-semibold text-[#222831] text-sm">
                              {item.name}
                            </p>
                            <p className="text-xs text-[#393E46]/60">
                              Unit Price: ₹
                              {(Number(item.prize) || 0).toLocaleString(
                                "en-IN",
                              )}{" "}
                              × {item.qnty || 1}
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-[#222831] text-sm">
                          ₹
                          {(
                            (Number(item.prize) || 0) * (Number(item.qnty) || 1)
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-[#393E46]/60">
                      No item details attached to this order.
                    </div>
                  )}
                </div>
              </div>

              {/* Grand Total */}
              <div className="bg-[#EEEEEE]/50 p-4 rounded-xl flex items-center justify-between border border-[#393E46]/15">
                <span className="font-bold text-[#222831]/80">Grand Total</span>
                <span className="text-xl font-extrabold text-[#00ADB5] flex items-center">
                  <FaRupeeSign className="text-base" />
                  {(Number(selectedOrder.totalamount) || 0).toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#393E46]/15 bg-[#EEEEEE]/50 flex justify-end gap-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-[#222831] text-[#EEEEEE] text-sm font-semibold rounded-lg hover:bg-[#393E46] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
