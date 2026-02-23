import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user, logout, darkMode, toggleDarkMode } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <Link to={user?.role === "admin" ? "/admin" : "/dashboard"} className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-primary-500 text-white flex items-center justify-center font-bold">
          P
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-slate-900 dark:text-slate-50">
            PathFinder
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Career Guidance Platform
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5 text-amber-300" />
          ) : (
            <MoonIcon className="h-5 w-5 text-slate-700" />
          )}
        </button>

        {user ? (
          <>
            <span className="text-sm text-slate-700 dark:text-slate-200 hidden sm:inline">
              {user.name}{" "}
              <span className="text-xs text-slate-500">({user.role})</span>
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1.5 text-sm rounded-lg bg-primary-600 text-white hover:bg-primary-700"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

