import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("pathfinder_theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("pathfinder_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("pathfinder_theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const token = localStorage.getItem("pathfinder_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/auth/profile")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("pathfinder_token");
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("pathfinder_token", res.data.token);
      setUser(res.data.user);
      toast.success("Logged in successfully");
      return res.data.user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const register = async (payload) => {
    try {
      const res = await api.post("/auth/register", payload);
      localStorage.setItem("pathfinder_token", res.data.token);
      setUser(res.data.user);
      toast.success("Registered successfully");
      return res.data.user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("pathfinder_token");
    setUser(null);
    toast.success("Logged out");
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout,
    darkMode,
    toggleDarkMode: () => setDarkMode((prev) => !prev),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

