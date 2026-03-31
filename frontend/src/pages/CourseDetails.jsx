import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import api from "../api/axios.js";

// This can be wired to a dedicated backend endpoint later if needed.
const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses`);
        const foundCourse = res.data.courses?.find((c) => c._id === id) || res.data.find((c) => c._id === id);
        setCourse(foundCourse);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </main>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="text-center">
              <p className="text-slate-500 dark:text-slate-400 mb-4">Course not found</p>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Back to Dashboard
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            ← Back to Dashboard
          </button>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                  <p className="text-sm inline-flex px-3 py-1 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-600/20 dark:text-primary-100">
                    {course.category}
                  </p>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">
                {course.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <h2 className="font-semibold text-sm mb-4">Course Information</h2>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-600 dark:text-slate-400">Duration:</dt>
                    <dd className="font-medium">{course.duration}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600 dark:text-slate-400">Location:</dt>
                    <dd className="font-medium">{course.location}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600 dark:text-slate-400">Eligibility:</dt>
                    <dd className="font-medium">{course.eligibility}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-600 dark:text-slate-400">Expected Salary:</dt>
                    <dd className="font-medium">{course.salary}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <h2 className="font-semibold text-sm mb-4">Additional Details</h2>
                <dl className="space-y-3 text-sm">
                  {course.university && (
                    <div className="flex justify-between">
                      <dt className="text-slate-600 dark:text-slate-400">University:</dt>
                      <dd className="font-medium">{course.university}</dd>
                    </div>
                  )}
                  {course.fees && (
                    <div className="flex justify-between">
                      <dt className="text-slate-600 dark:text-slate-400">Fees:</dt>
                      <dd className="font-medium">{course.fees}</dd>
                    </div>
                  )}
                  {course.cutoff && (
                    <div className="flex justify-between">
                      <dt className="text-slate-600 dark:text-slate-400">Cutoff:</dt>
                      <dd className="font-medium">{course.cutoff}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-primary-600 dark:hover:bg-primary-700 font-medium"
              >
                Explore More Courses
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseDetails;

