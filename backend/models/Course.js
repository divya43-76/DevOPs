import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    duration: { type: String },
    eligibility: { type: String },
    location: {
      type: String,
      enum: ["India", "Abroad", "Both"],
      default: "India",
    },
    description: { type: String },
    scope: { type: String },
    salary: { type: String },
    growth: { type: String },
    entranceExams: [{ type: String }],
    topCollegesIndia: [{ type: String }],
    topCountriesAbroad: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;

