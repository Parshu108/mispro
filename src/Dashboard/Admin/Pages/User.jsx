import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUsers,
  FaSearch,
  FaShoppingBag,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";

const UserManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const loadCustomerData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/costomber");
      const orderList = (res.data || []).filter(
        (o) =>
          o.fullname ||
          o.email ||
          o.phone ||
          (o.products && o.products.length > 0),
      );

      // Group orders by email or phone or fullname to build comprehensive customer profiles
      const customerMap = {};

      orderList.forEach((order) => {
        const key = (
          order.email ||
          order.phone ||
          order.fullname ||
          `user-${order.id}`
        )
          .toLowerCase()
          .trim();
        if (!customerMap[key]) {
          customerMap[key] = {
            id: order.id,
            fullname: order.fullname || "Guest Shopper",
            email: order.email || "N/A",
            phone: order.phone || "N/A",
            city: order.city || "Unknown City",
            state: order.state || "",
            pincode: order.pincode || "",
            address: order.address || "",
            totalSpent: 0,
            ordersCount: 0,
            orders: [],
            lastOrderDate: order.orderDate || "Recent",
          };
        }

        customerMap[key].totalSpent += Number(order.totalamount) || 0;
        customerMap[key].ordersCount += 1;
        customerMap[key].orders.push(order);
      });

      setCustomers(Object.values(customerMap));
    } catch (error) {
      console.error("Error fetching customer directory:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomerData();
  }, []);

  const filteredCustomers = customers.filter((cust) => {
    const name = cust.fullname.toLowerCase();
    const email = cust.email.toLowerCase();
    const phone = cust.phone;
    const city = cust.city.toLowerCase();

    return (
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm) ||
      city.includes(searchTerm.toLowerCase())
    );
  });

  const totalSpentAll = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className="space-y-6 bg-[#EEEEEE] p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#222831] flex items-center gap-2">
            <FaUsers className="text-[#00ADB5]" /> Customer Directory
          </h1>
          <p className="text-sm text-[#393E46] mt-1">
            Manage your buyers, their order activity, and contact details
          </p>
        </div>

        <button
          onClick={loadCustomerData}
          className="px-4 py-2 bg-white border border-[#393E46]/20 text-[#393E46] text-sm font-medium rounded-lg hover:bg-[#EEEEEE] shadow-sm transition self-start"
        >
          Refresh List
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#393E46]/10 shadow-sm">
          <p className="text-xs font-semibold text-[#393E46] uppercase tracking-wider">
            Unique Customers
          </p>
          <h3 className="text-2xl font-bold text-[#222831] mt-1">
            {customers.length}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#393E46]/10 shadow-sm">
          <p className="text-xs font-semibold text-[#00ADB5] uppercase tracking-wider">
            Total Customer Spend
          </p>
          <h3 className="text-2xl font-bold text-[#222831] mt-1 flex items-center">
            <FaRupeeSign className="text-lg" />
            {totalSpentAll.toLocaleString("en-IN")}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#393E46]/10 shadow-sm">
          <p className="text-xs font-semibold text-[#00ADB5] uppercase tracking-wider">
            Avg Spend / Customer
          </p>
          <h3 className="text-2xl font-bold text-[#222831] mt-1 flex items-center">
            <FaRupeeSign className="text-lg" />
            {customers.length > 0
              ? Math.round(totalSpentAll / customers.length).toLocaleString(
                  "en-IN",
                )
              : 0}
          </h3>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#393E46]/10 shadow-sm">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3.5 text-[#393E46]/60 text-sm" />
          <input
            type="text"
            placeholder="Search by customer name, email, phone, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-[#393E46]/20 rounded-lg text-sm text-[#222831] focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-[#393E46]/10 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#393E46]">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#EEEEEE] border-t-[#00ADB5] mb-2"></div>
            <p>Loading customers...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-12 text-center text-[#393E46]">
            <FaUsers className="mx-auto text-4xl text-[#393E46]/30 mb-3" />
            <p className="font-semibold text-[#222831]">No customers found</p>
            <p className="text-sm text-[#393E46]/70 mt-1">
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEEEEE] border-b border-[#393E46]/10 text-xs font-semibold text-[#393E46] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Orders Placed</th>
                  <th className="py-3.5 px-4">Total Spent</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#393E46]/10 text-sm">
                {filteredCustomers.map((c, idx) => (
                  <tr key={idx} className="hover:bg-[#EEEEEE]/60 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#00ADB5]/10 text-[#00ADB5] font-bold flex items-center justify-center text-sm">
                          {c.fullname.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-[#222831]">
                            {c.fullname}
                          </p>
                          <span className="text-xs text-[#393E46]/60">
                            ID: #{c.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 text-xs text-[#393E46]">
                        <p className="flex items-center gap-1.5">
                          <FaEnvelope className="text-[#393E46]/60" /> {c.email}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <FaPhone className="text-[#393E46]/60" /> {c.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#393E46]">
                      <p className="flex items-center gap-1.5">
                        <FaMapMarkerAlt className="text-[#00ADB5] shrink-0" />
                        <span>
                          {c.city}
                          {c.state ? `, ${c.state}` : ""}
                        </span>
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#393E46]/10 text-[#222831]">
                        <FaShoppingBag className="text-[#393E46] text-[10px]" />{" "}
                        {c.ordersCount}{" "}
                        {c.ordersCount === 1 ? "Order" : "Orders"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#222831]">
                      ₹{c.totalSpent.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="p-2 text-[#00ADB5] hover:bg-[#00ADB5]/10 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition"
                      >
                        <FaEye /> View History
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer Profile & Orders Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#222831]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#393E46]/10">
            <div className="p-6 border-b border-[#393E46]/10 bg-[#EEEEEE] flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#222831]">
                  {selectedCustomer.fullname}
                </h3>
                <p className="text-xs text-[#393E46] mt-0.5">
                  Customer Profile & Order History
                </p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-[#393E46]/60 hover:text-[#222831] text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#00ADB5]/5 p-4 rounded-xl border border-[#00ADB5]/20 text-center">
                <div>
                  <p className="text-xs text-[#393E46] font-medium">
                    Total Orders
                  </p>
                  <p className="text-lg font-bold text-[#222831]">
                    {selectedCustomer.ordersCount}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#393E46] font-medium">
                    Total Spend
                  </p>
                  <p className="text-lg font-bold text-[#00ADB5]">
                    ₹{selectedCustomer.totalSpent.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#393E46] font-medium">City</p>
                  <p className="text-lg font-bold text-[#222831] truncate">
                    {selectedCustomer.city}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#393E46] font-medium">Pincode</p>
                  <p className="text-lg font-bold text-[#222831]">
                    {selectedCustomer.pincode || "N/A"}
                  </p>
                </div>
              </div>

              {/* Order history list */}
              <div>
                <h4 className="text-xs font-bold text-[#393E46] uppercase tracking-wider mb-3">
                  All Orders ({selectedCustomer.orders.length})
                </h4>
                <div className="space-y-3">
                  {selectedCustomer.orders.map((ord, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-[#393E46]/10 rounded-xl bg-[#EEEEEE]/60"
                    >
                      <div className="flex items-center justify-between border-b border-[#393E46]/10 pb-2 mb-2">
                        <span className="font-mono text-xs font-bold text-[#00ADB5]">
                          Order #{ord.id}
                        </span>
                        <span className="font-bold text-sm text-[#222831]">
                          ₹
                          {(Number(ord.totalamount) || 0).toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {ord.products &&
                          ord.products.map((p, pIdx) => (
                            <div
                              key={pIdx}
                              className="flex justify-between text-xs text-[#393E46]"
                            >
                              <span>
                                • {p.name} × {p.qnty || 1}
                              </span>
                              <span>
                                ₹
                                {(
                                  (Number(p.prize) || 0) * (Number(p.qnty) || 1)
                                ).toLocaleString("en-IN")}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#393E46]/10 bg-[#EEEEEE] flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-[#222831] text-white text-sm font-semibold rounded-lg hover:bg-[#393E46] transition"
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

export default UserManagement;
