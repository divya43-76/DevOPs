import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const SidebarLink = ({ to, label }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-lg text-sm font-medium ${
        active
          ? "bg-primary-50 text-primary-700 dark:bg-primary-600/20 dark:text-primary-100"
          : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      }`}
    >
      {label}
    </Link>
  );
};

const Sidebar = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <aside className="w-full sm:w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="p-4 space-y-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            {isAdmin ? "Admin Navigation" : "Student Navigation"}
          </p>
          <div className="mt-3 flex flex-col gap-1">
            {isAdmin ? (
              <>
                <SidebarLink to="/admin" label="Overview" />
                <SidebarLink to="/admin/courses" label="Manage Courses" />
                <SidebarLink to="/admin/exams" label="Manage Exams" />
              </>
            ) : (
              <>
                <SidebarLink to="/dashboard" label="Dashboard" />
                <SidebarLink to="/dashboard/bookmarks" label="Bookmarked Courses" />
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

