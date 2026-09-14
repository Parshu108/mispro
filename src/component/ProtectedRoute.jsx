import React from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaLock, FaShieldAlt } from "react-icons/fa";

export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location, message: "Please log in with admin credentials to access the admin dashboard." }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-red-100 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLock size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-sm text-gray-600 mb-6">
            You are signed in as <span className="font-semibold text-gray-800">{user?.name} ({user?.email})</span>, but admin privileges are required for this section.
          </p>
          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition text-sm"
            >
              Return to Public Store
            </Link>
            <Link
              to="/login"
              className="block w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition text-sm"
            >
              Log in with different account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export const UserRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location, message: "Please log in to continue." }} replace />;
  }

  return children;
};

export default AdminRoute;
