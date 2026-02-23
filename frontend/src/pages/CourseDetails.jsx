import React from "react";

// This can be wired to a dedicated backend endpoint later if needed.
const CourseDetails = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Detailed course view placeholder. You can extend this to fetch a single
        course by ID and show PDF download, abroad study info, etc.
      </p>
    </div>
  );
};

export default CourseDetails;

