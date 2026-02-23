import React from "react";

const CourseCard = ({ course, onBookmark, isBookmarked, onView }) => {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-50">
              {course.title}
            </h3>
            <p className="text-xs mt-1 inline-flex px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-600/20 dark:text-primary-100">
              {course.category}
            </p>
          </div>
          <button
            onClick={onBookmark}
            className={`text-sm px-2 py-1 rounded-full border ${
              isBookmarked
                ? "bg-amber-400 border-amber-500 text-slate-900"
                : "border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>
        </div>

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
          {course.description}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span className="font-medium text-slate-700 dark:text-slate-200">
              Duration:
            </span>{" "}
            {course.duration}
          </div>
          <div>
            <span className="font-medium text-slate-700 dark:text-slate-200">
              Location:
            </span>{" "}
            {course.location}
          </div>
          <div>
            <span className="font-medium text-slate-700 dark:text-slate-200">
              Eligibility:
            </span>{" "}
            {course.eligibility}
          </div>
          <div>
            <span className="font-medium text-slate-700 dark:text-slate-200">
              Salary:
            </span>{" "}
            {course.salary}
          </div>
        </div>
      </div>

      <button
        onClick={onView}
        className="mt-4 inline-flex justify-center items-center px-3 py-1.5 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-primary-600 dark:hover:bg-primary-700"
      >
        View Details
      </button>
    </div>
  );
};

export default CourseCard;

