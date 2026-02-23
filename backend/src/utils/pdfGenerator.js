import PDFDocument from "pdfkit";

export const generateCoursePDF = (course, student, res) => {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${course.title.replace(/\s+/g, "_")}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(20).text("PathFinder – Course Details", { align: "center" });
  doc.moveDown();

  if (student) {
    doc
      .fontSize(12)
      .text(`Generated for: ${student.name} (${student.email})`, {
        align: "left",
      });
    doc.moveDown();
  }

  doc.fontSize(16).text(course.title, { underline: true });
  doc.moveDown();

  const addField = (label, value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return;
    const v = Array.isArray(value) ? value.join(", ") : value;
    doc.fontSize(12).text(`${label}: ${v}`);
    doc.moveDown(0.5);
  };

  addField("Category", course.category);
  addField("Duration", course.duration);
  addField("Eligibility", course.eligibility);
  addField("Location", course.location);
  addField("Description", course.description);
  addField("Career Scope", course.scope);
  addField("Average Salary in India", course.salary);
  addField("Future Growth Scope", course.growth);
  addField("Entrance Exams Required", course.entranceExams);
  addField("Top Colleges in India", course.topCollegesIndia);
  addField("Top Countries Abroad", course.topCountriesAbroad);

  doc.end();
};

