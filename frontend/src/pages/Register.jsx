import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const allInterests = [
  "Engineering & Technology",
  "Medical & Healthcare",
  "Arts & Humanities",
  "Commerce & Management",
  "Law",
  "Government Jobs",
  "Defense",
  "Design & Creative Fields",
  "Computer Science & IT",
  "Aviation",
  "Agriculture",
  "Psychology",
  "Hospitality",
  "Media & Journalism",
  "Finance & Banking",
];

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    classLevel: "12th",
    preferredLocation: "India",
    selectedInterests: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleInterest = (interest) => {
    setForm((prev) => {
      const exists = prev.selectedInterests.includes(interest);
      return {
        ...prev,
        selectedInterests: exists
          ? prev.selectedInterests.filter((i) => i !== interest)
          : [...prev.selectedInterests, interest],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return;
    setLoading(true);
    try {
      const user = await register(form);
      if (user.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-xl p-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Create your PathFinder account
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Choose your role, interests, and preferences to get tailored career recommendations.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Role
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {form.role === "student" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Class Level
                  </label>
                  <select
                    name="classLevel"
                    value={form.classLevel}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="10th">10th</option>
                    <option value="12th">12th</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Preferred Study Location
                  </label>
                  <select
                    name="preferredLocation"
                    value={form.preferredLocation}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="India">India</option>
                    <option value="Abroad">Abroad</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>
            )}

            {form.role === "student" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  Select Your Interests
                </label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 p-2">
                  {allInterests.map((interest) => {
                    const active = form.selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-2.5 py-1 rounded-full text-xs border ${
                          active
                            ? "bg-primary-600 text-white border-primary-600"
                            : "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-slate-900 text-white py-2.5 text-sm font-medium hover:bg-slate-800 disabled:opacity-60 dark:bg-primary-600 dark:hover:bg-primary-700"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>

        <div className="hidden md:flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Smarter choices, brighter futures.
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              PathFinder analyses your class, interests, and preferred study location to
              recommend courses, government exams, and study abroad paths tailored to you.
            </p>
          </div>
          <div className="mt-8 rounded-2xl border border-dashed border-primary-200 dark:border-primary-800 p-4 bg-primary-50/60 dark:bg-primary-900/20">
            <p className="text-xs font-medium text-primary-800 dark:text-primary-100 uppercase tracking-wide">
              Tip for Admins
            </p>
            <p className="mt-1 text-sm text-primary-900 dark:text-primary-50">
              Register as <span className="font-semibold">Admin</span> to manage courses,
              government exams, and view analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

