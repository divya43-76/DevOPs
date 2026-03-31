import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import CourseCard from "../components/CourseCard.jsx";
import ExamCard from "../components/ExamCard.jsx";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const StudentDashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState([]);
  const [aiTips, setAiTips] = useState([]);
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingRec, setLoadingRec] = useState(false);
  const [loadingExams, setLoadingExams] = useState(false);

  const bookmarksSet = useMemo(
    () => new Set((user?.bookmarks || []).map((c) => (typeof c === "string" ? c : c._id))),
    [user]
  );

  const loadRecommendations = async () => {
    setLoadingRec(true);
    try {
      const res = await api.get("/courses/recommend");
      setRecommended(res.data || []);
      setAiTips([]); // AI tips will be handled separately or added in future
    } finally {
      setLoadingRec(false);
    }
  };

  const loadCourses = async (pageValue = 1) => {
    setLoadingCourses(true);
    try {
      const res = await api.get("/courses", {
        params: { page: pageValue, limit: 6, search },
      });
      setCourses(res.data.courses || []);
      setPage(res.data.page);
      setPages(res.data.pages);
    } finally {
      setLoadingCourses(false);
    }
  };

  const loadExams = async () => {
    setLoadingExams(true);
    try {
      const res = await api.get("/exams/recommend");
      setExams(res.data || []);
    } finally {
      setLoadingExams(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
    loadCourses(1);
    loadExams();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadCourses(1);
  };

  const toggleBookmark = async (courseId) => {
    const res = await api.post(`/courses/${courseId}/bookmark`);
    setUser((prev) => ({ ...prev, bookmarks: res.data.bookmarks }));
  };

  const handleViewDetails = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 space-y-6">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="col-span-2 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-700 text-white p-5 shadow-lg">
              <p className="text-xs uppercase tracking-wide opacity-80">
                Welcome, {user?.name}
              </p>
              <h1 className="mt-1 text-xl font-semibold">
                Personalized career guidance for your{" "}
                <span className="underline decoration-white/60">
                  {user?.classLevel} journey
                </span>
                .
              </h1>
              <p className="mt-2 text-sm text-primary-50">
                Based on your interests in{" "}
                <span className="font-semibold">
                  {(user?.selectedInterests || []).slice(0, 3).join(", ") ||
                    "various fields"}
                </span>
                , explore curated courses, government exams, and study abroad options.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <h2 className="text-sm font-semibold">Profile Snapshot</h2>
              <dl className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <dt>Class Level</dt>
                  <dd className="font-medium">{user?.classLevel || "N/A"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Preferred Location</dt>
                  <dd className="font-medium">{user?.preferredLocation}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Interests Selected</dt>
                  <dd className="font-medium">
                    {(user?.selectedInterests || []).length}
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">
                  Recommended Courses for You
                </h2>
                <button
                  onClick={loadRecommendations}
                  className="text-xs px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  Refresh
                </button>
              </div>
              {loadingRec ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {recommended?.map((course) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      isBookmarked={bookmarksSet.has(course._id)}
                      onBookmark={() => toggleBookmark(course._id)}
                      onView={() => handleViewDetails(course._id)}
                    />
                  ))}
                  {!recommended.length && (
                    <p className="text-xs text-slate-500">
                      No recommendations yet. Try selecting more interests during
                      registration.
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="space-y-3">
              <h2 className="text-sm font-semibold">AI Suggestions</h2>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {aiTips?.length ? (
                  aiTips?.map((tip) => (
                    <li
                      key={tip}
                      className="rounded-xl border border-dashed border-primary-200 dark:border-primary-700 bg-primary-50/60 dark:bg-primary-900/20 px-3 py-2"
                    >
                      {tip}
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500">
                    We’ll show smart suggestions based on your selections.
                  </li>
                )}
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">Explore All Courses</h2>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by course or category..."
                  className="w-40 sm:w-64 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-primary-600 dark:hover:bg-primary-700"
                >
                  Search
                </button>
              </form>
            </div>
            {loadingCourses ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {courses?.map((course) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      isBookmarked={bookmarksSet.has(course._id)}
                      onBookmark={() => toggleBookmark(course._id)}
                      onView={() => handleViewDetails(course._id)}
                    />
                  ))}
                </div>
                <div className="flex justify-center items-center gap-3 mt-3 text-xs">
                  <button
                    disabled={page <= 1}
                    onClick={() => loadCourses(page - 1)}
                    className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 disabled:opacity-40"
                  >
                    Prev
                  </button>
                  <span>
                    Page {page} of {pages}
                  </span>
                  <button
                    disabled={page >= pages}
                    onClick={() => loadCourses(page + 1)}
                    className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">
                Relevant Government Exams
              </h2>
            </div>
            {loadingExams ? (
              <div className="flex justify-center py-6">
                <div className="h-6 w-6 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {exams?.map((exam) => (
                  <ExamCard key={exam._id} exam={exam} />
                ))}
                {!exams.length && (
                  <p className="text-xs text-slate-500">
                    No specific government exam suggestions yet; try adding interests
                    like Government Jobs, Banking, Defense, or Civil Services.
                  </p>
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;

