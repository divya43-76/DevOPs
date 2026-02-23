import React from "react";

const ExamCard = ({ exam }) => {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 shadow-sm">
      <h3 className="font-semibold text-slate-900 dark:text-slate-50">
        {exam.name}
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        <span className="font-medium">Eligibility:</span> {exam.eligibility}
      </p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        <span className="font-medium">Age Limit:</span> {exam.ageLimit}
      </p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        <span className="font-medium">Exam Pattern:</span> {exam.examPattern}
      </p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        <span className="font-medium">Salary Range:</span> {exam.salary}
      </p>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-medium">Job Roles:</span>{" "}
        {(exam.jobRoles || []).join(", ")}
      </p>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-medium">Category:</span> {exam.category}
      </p>
    </div>
  );
};

export default ExamCard;

