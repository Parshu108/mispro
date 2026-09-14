import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaPhone, 
  FaShieldAlt, 
  FaUserShield,
  FaBed,
  FaCheck
} from "react-icons/fa";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || null;
  const passedMessage = location.state?.message || null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsSubmitting(true);

    if (!formData.email || !formData.password) {
      setErrorMsg("Please enter both email and password.");
      setIsSubmitting(false);
      return;
    }

    const res = await login(formData.email, formData.password);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMsg(`Welcome back, ${res.user.name}!`);
      setTimeout(() => {
        if (res.user.role === "admin") {
          navigate(redirectPath || "/admin/dashboard");
        } else {
          navigate(redirectPath || "/");
        }
      }, 500);
    } else {
      setErrorMsg(res.message || "Invalid email or password.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.firstName || !formData.email || !formData.password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    const res = await register({
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMsg("Account created successfully! Redirecting...");
      setTimeout(() => {
        navigate(redirectPath || "/");
      }, 800);
    } else {
      setErrorMsg(res.message || "Failed to create account.");
    }
  };

  // Quick Demo Logins for fast testing
  const quickAdminLogin = async () => {
    setFormData((prev) => ({ ...prev, email: "admin@mishu.com", password: "admin" }));
    setIsSubmitting(true);
    const res = await login("admin@mishu.com", "admin");
    setIsSubmitting(false);
    if (res.success) {
      navigate(redirectPath || "/admin/dashboard");
    }
  };

  const quickUserLogin = async () => {
    setFormData((prev) => ({ ...prev, email: "prince@gmail.com", password: "123" }));
    setIsSubmitting(true);
    const res = await login("prince@gmail.com", "123");
    setIsSubmitting(false);
    if (res.success) {
      navigate(redirectPath || "/");
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex items-center justify-center p-4 py-12">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#393E46]/10 flex flex-col md:flex-row">
        {/* Left Side - Brand Showcase (#222831 base, #393E46 structure, #00ADB5 accent) */}
        <div className="md:w-5/12 bg-gradient-to-br from-[#222831] via-[#393E46] to-[#222831] text-[#EEEEEE] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-[#00ADB5]/20 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-[#00ADB5]/10 blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#00ADB5] text-[#222831] flex items-center justify-center text-xl font-bold shadow-md">
                <FaBed />
              </div>
              <span className="font-extrabold text-xl tracking-wide text-[#EEEEEE]">Mishu Mattress</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-[#EEEEEE]">
              {isLogin ? "Welcome Back to Premium Sleep" : "Experience Supreme Rest"}
            </h2>
            <p className="text-[#EEEEEE]/80 text-xs sm:text-sm mt-3 leading-relaxed">
              {isLogin
                ? "Sign in to track orders, manage your delivery preferences, and access exclusive mattress offers."
                : "Create an account to unlock fast checkout, personalized mattress recommendations, and warranty tracking."}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#393E46] space-y-4">
            <p className="text-xs text-[#00ADB5] font-bold uppercase tracking-wider">Quick Demo Credentials:</p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={quickAdminLogin}
                className="w-full py-2 px-3 bg-[#393E46]/80 hover:bg-[#393E46] rounded-xl text-xs font-semibold flex items-center justify-between transition border border-[#393E46]"
              >
                <span className="flex items-center gap-2 text-[#EEEEEE]">
                  <FaUserShield className="text-[#00ADB5]" /> Admin Demo
                </span>
                <span className="text-[11px] text-[#00ADB5] font-mono">admin@mishu.com</span>
              </button>
              <button
                type="button"
                onClick={quickUserLogin}
                className="w-full py-2 px-3 bg-[#393E46]/80 hover:bg-[#393E46] rounded-xl text-xs font-semibold flex items-center justify-between transition border border-[#393E46]"
              >
                <span className="flex items-center gap-2 text-[#EEEEEE]">
                  <FaUser className="text-[#00ADB5]" /> Customer Demo
                </span>
                <span className="text-[11px] text-[#00ADB5] font-mono">prince@gmail.com</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-7/12 p-8 sm:p-12 flex flex-col justify-center bg-white">
          {/* Header & Tabs */}
          <div className="mb-6">
            <div className="flex bg-[#EEEEEE] p-1.5 rounded-2xl mb-6 max-w-xs mx-auto border border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  isLogin ? "bg-[#222831] text-[#00ADB5] shadow-xs" : "text-[#393E46] hover:text-[#222831]"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  !isLogin ? "bg-[#222831] text-[#00ADB5] shadow-xs" : "text-[#393E46] hover:text-[#222831]"
                }`}
              >
                Register
              </button>
            </div>

            <h3 className="text-2xl font-extrabold text-[#222831] text-center">
              {isLogin ? "Sign In to Your Account" : "Create a New Account"}
            </h3>
            <p className="text-xs text-[#393E46] text-center mt-1">
              {isLogin ? "Enter your credentials below to proceed" : "Fill in your details to register as a customer"}
            </p>
          </div>

          {/* Feedback Messages */}
          {passedMessage && !errorMsg && (
            <div className="mb-4 p-3 bg-blue-50 border border-[#00ADB5] text-[#222831] rounded-xl text-xs flex items-center gap-2">
              <FaShieldAlt className="text-[#00ADB5]" /> {passedMessage}
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-2">
              <FaCheck /> {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#393E46] mb-1">
                    First Name *
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3.5 top-3 text-[#393E46] text-xs" />
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#393E46] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Sharma"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#393E46] mb-1">
                Email Address *
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-3 text-[#393E46] text-xs" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-[#393E46] mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3.5 top-3 text-[#393E46] text-xs" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#393E46] mb-1">
                Password *
              </label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-3 text-[#393E46] text-xs" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-[#393E46] mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-3 text-[#393E46] text-xs" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#00ADB5] hover:bg-[#009299] text-[#222831] hover:text-white font-extrabold rounded-xl text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#222831] border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 text-center text-xs text-[#393E46]">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-[#00ADB5] font-bold hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-[#00ADB5] font-bold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
