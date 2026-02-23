import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import toast from "react-hot-toast";

const COLORS = ["#3b82f6", "#10b981", "#f97316", "#ec4899", "#22c55e", "#6366f1"];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: "",
    category: "",
    duration: "",
    eligibility: "",
    location: "India",
    description: "",
    scope: "",
    salary: "",
    growth: "",
    entranceExams: "",
    topCollegesIndia: "",
    topCountriesAbroad: "",
  });

  const [examForm, setExamForm] = useState({
    name: "",
    eligibility: "",
    ageLimit: "",
    examPattern: "",
    salary: "",
    jobRoles: "",
    category: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [courseRes, examRes] = await Promise.all([
        api.get("/courses", { params: { page: 1, limit: 100 } }),
        api.get("/exams"),
      ]);
      setCourses(courseRes.data.courses);
      setExams(examRes.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categoryData = Object.values(
    courses.reduce((acc, c) => {
      if (!acc[c.category]) acc[c.category] = { name: c.category, value: 0 };
      acc[c.category].value += 1;
      return acc;
    }, {})
  );

  const handleCourseChange = (e) => {
    setCourseForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleExamChange = (e) => {
    setExamForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...courseForm,
        entranceExams: courseForm.entranceExams
          ? courseForm.entranceExams.split(",").map((s) => s.trim())
          : [],
        topCollegesIndia: courseForm.topCollegesIndia
          ? courseForm.topCollegesIndia.split(",").map((s) => s.trim())
          : [],
        topCountriesAbroad: courseForm.topCountriesAbroad
          ? courseForm.topCountriesAbroad.split(",").map((s) => s.trim())
          : [],
      };
      await api.post("/courses", payload);
      toast.success("Course created");
      setCourseForm({
        title: "",
        category: "",
        duration: "",
        eligibility: "",
        location: "India",
        description: "",
        scope: "",
        salary: "",
        growth: "",
        entranceExams: "",
        topCollegesIndia: "",
        topCountriesAbroad: "",
      });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course");
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm("Delete this course?")) return;
    try {
      await api.delete(`/courses/${id}`);
      toast.success("Course deleted");
      fetchData();
    } catch {
      toast.error("Failed to delete course");
    }
  };

  const handleCreateExam = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...examForm,
        jobRoles: examForm.jobRoles
          ? examForm.jobRoles.split(",").map((s) => s.trim())
          : [],
      };
      await api.post("/exams", payload);
      toast.success("Exam created");
      setExamForm({
        name: "",
        eligibility: "",
        ageLimit: "",
        examPattern: "",
        salary: "",
        jobRoles: "",
        category: "",
      });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create exam");
    }
  };

  const handleDeleteExam = async (id) => {
    if (!confirm("Delete this exam?")) return;
    try {
      await api.delete(`/exams/${id}`);
      toast.success("Exam deleted");
      fetchData();
    } catch {
      toast.error("Failed to delete exam");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 space-y-6">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 rounded-2xl bg-slate-900 text-white p-5 shadow-lg dark:bg-slate-900">
              <h1 className="text-xl font-semibold">
                Admin Overview, {user?.name}
              </h1>
              <p className="mt-2 text-sm text-slate-200">
                Manage courses, exams, and track interest categories across the PathFinder
                ecosystem.
              </p>
              <div className="mt-4 flex gap-4 text-xs">
                <div>
                  <p className="text-slate-300">Total Courses</p>
                  <p className="text-lg font-semibold">{courses.length}</p>
                </div>
                <div>
                  <p className="text-slate-300">Government Exams</p>
                  <p className="text-lg font-semibold">{exams.length}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <h2 className="text-sm font-semibold">Course Category Split</h2>
              <div className="h-40 mt-2">
                {categoryData.length ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={60}
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-xs text-slate-500 mt-4">
                    Not enough data yet. Add more courses.
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Add / Manage Courses</h2>
              </div>
              <form
                onSubmit={handleCreateCourse}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 text-xs"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium">Title</label>
                    <input
                      name="title"
                      value={courseForm.title}
                      onChange={handleCourseChange}
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="font-medium">Category</label>
                    <input
                      name="category"
                      value={courseForm.category}
                      onChange={handleCourseChange}
                      required
                      placeholder="e.g. Engineering & Technology"
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-medium">Duration</label>
                    <input
                      name="duration"
                      value={courseForm.duration}
                      onChange={handleCourseChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="font-medium">Eligibility</label>
                    <input
                      name="eligibility"
                      value={courseForm.eligibility}
                      onChange={handleCourseChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="font-medium">Location</label>
                    <select
                      name="location"
                      value={courseForm.location}
                      onChange={handleCourseChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    >
                      <option value="India">India</option>
                      <option value="Abroad">Abroad</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-medium">Description</label>
                  <textarea
                    name="description"
                    value={courseForm.description}
                    onChange={handleCourseChange}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium">Career Scope</label>
                    <textarea
                      name="scope"
                      value={courseForm.scope}
                      onChange={handleCourseChange}
                      rows={2}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="font-medium">Future Growth</label>
                    <textarea
                      name="growth"
                      value={courseForm.growth}
                      onChange={handleCourseChange}
                      rows={2}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium">Average Salary</label>
                    <input
                      name="salary"
                      value={courseForm.salary}
                      onChange={handleCourseChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="font-medium">Entrance Exams (comma separated)</label>
                    <input
                      name="entranceExams"
                      value={courseForm.entranceExams}
                      onChange={handleCourseChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium">Top Colleges in India</label>
                    <input
                      name="topCollegesIndia"
                      value={courseForm.topCollegesIndia}
                      onChange={handleCourseChange}
                      placeholder="Comma-separated list"
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="font-medium">Top Countries Abroad</label>
                    <input
                      name="topCountriesAbroad"
                      value={courseForm.topCountriesAbroad}
                      onChange={handleCourseChange}
                      placeholder="Comma-separated list"
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-1 inline-flex items-center justify-center rounded-lg bg-slate-900 text-white px-3 py-1.5 text-xs font-medium hover:bg-slate-800 dark:bg-primary-600 dark:hover:bg-primary-700"
                >
                  Add Course
                </button>
              </form>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs max-h-60 overflow-y-auto">
                <h3 className="font-semibold mb-2">Existing Courses</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ul className="space-y-1">
                    {courses.map((c) => (
                      <li
                        key={c._id}
                        className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-1"
                      >
                        <div>
                          <p className="font-medium">{c.title}</p>
                          <p className="text-slate-500">{c.category}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteCourse(c._id)}
                          className="px-2 py-1 rounded border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                    {!courses.length && (
                      <p className="text-slate-500">No courses yet.</p>
                    )}
                  </ul>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold">Add / Manage Exams</h2>
              <form
                onSubmit={handleCreateExam}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 text-xs"
              >
                <div>
                  <label className="font-medium">Name</label>
                  <input
                    name="name"
                    value={examForm.name}
                    onChange={handleExamChange}
                    required
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium">Eligibility</label>
                    <input
                      name="eligibility"
                      value={examForm.eligibility}
                      onChange={handleExamChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="font-medium">Age Limit</label>
                    <input
                      name="ageLimit"
                      value={examForm.ageLimit}
                      onChange={handleExamChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-medium">Exam Pattern</label>
                  <textarea
                    name="examPattern"
                    value={examForm.examPattern}
                    onChange={handleExamChange}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-medium">Salary Range</label>
                    <input
                      name="salary"
                      value={examForm.salary}
                      onChange={handleExamChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="font-medium">Job Roles (comma separated)</label>
                    <input
                      name="jobRoles"
                      value={examForm.jobRoles}
                      onChange={handleExamChange}
                      className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-medium">Category</label>
                  <input
                    name="category"
                    value={examForm.category}
                    onChange={handleExamChange}
                    placeholder="Government Jobs, Banking, Defense, Civil Services..."
                    className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-1 inline-flex items-center justify-center rounded-lg bg-slate-900 text-white px-3 py-1.5 text-xs font-medium hover:bg-slate-800 dark:bg-primary-600 dark:hover:bg-primary-700"
                >
                  Add Exam
                </button>
              </form>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs max-h-60 overflow-y-auto">
                <h3 className="font-semibold mb-2">Existing Exams</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ul className="space-y-1">
                    {exams.map((e) => (
                      <li
                        key={e._id}
                        className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-1"
                      >
                        <div>
                          <p className="font-medium">{e.name}</p>
                          <p className="text-slate-500">{e.category}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteExam(e._id)}
                          className="px-2 py-1 rounded border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                    {!exams.length && (
                      <p className="text-slate-500">No exams yet.</p>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

