import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("mishu_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("mishu_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("mishu_user");
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check built-in super admin fallback
    if (
      (cleanEmail === "admin@mishu.com" || cleanEmail === "admin@gmail.com" || cleanEmail === "admin") &&
      (password === "admin" || password === "admin123")
    ) {
      const adminUser = {
        id: "admin-1",
        name: "Mishu Administrator",
        email: "admin@mishu.com",
        role: "admin",
      };
      setUser(adminUser);
      setLoading(false);
      return { success: true, user: adminUser };
    }

    // 2. Check JSON-Server users endpoint
    try {
      const res = await axios.get("http://localhost:3000/users");
      const usersList = res.data || [];
      const found = usersList.find(
        (u) =>
          u.email.toLowerCase() === cleanEmail &&
          String(u.password) === String(password)
      );

      if (found) {
        const authUser = {
          id: found.id,
          name: found.name,
          email: found.email,
          role: found.role || "user",
          phone: found.phone || "",
        };
        setUser(authUser);
        setLoading(false);
        return { success: true, user: authUser };
      }
    } catch (error) {
      console.warn("Could not reach JSON server, checking local fallback credentials:", error);
    }

    // 3. Fallback for demo customer
    if (cleanEmail === "user@gmail.com" && password === "123") {
      const demoUser = {
        id: "demo-user-1",
        name: "Demo Customer",
        email: "user@gmail.com",
        role: "user",
      };
      setUser(demoUser);
      setLoading(false);
      return { success: true, user: demoUser };
    }

    setLoading(false);
    return { success: false, message: "Invalid email or password" };
  };

  const register = async (userData) => {
    setLoading(true);
    const cleanEmail = userData.email.trim().toLowerCase();

    try {
      // Check if user already exists
      const res = await axios.get("http://localhost:3000/users");
      const existing = (res.data || []).find(
        (u) => u.email.toLowerCase() === cleanEmail
      );

      if (existing) {
        setLoading(false);
        return { success: false, message: "An account with this email already exists!" };
      }

      const newUser = {
        name: userData.name || `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "Customer",
        email: cleanEmail,
        password: userData.password,
        phone: userData.phone || "",
        role: "user",
      };

      const postRes = await axios.post("http://localhost:3000/users", newUser);
      const createdUser = {
        id: postRes.data.id || Date.now().toString(),
        name: newUser.name,
        email: newUser.email,
        role: "user",
        phone: newUser.phone,
      };

      setUser(createdUser);
      setLoading(false);
      return { success: true, user: createdUser };
    } catch (error) {
      console.error("Registration error:", error);
      // Fallback local registration
      const fallbackUser = {
        id: Date.now().toString(),
        name: userData.name || "Customer",
        email: cleanEmail,
        role: "user",
        phone: userData.phone || "",
      };
      setUser(fallbackUser);
      setLoading(false);
      return { success: true, user: fallbackUser };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mishu_user");
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
