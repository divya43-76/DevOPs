import mongoose from "mongoose";

const governmentExamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    eligibility: { type: String },
    ageLimit: { type: String },
    examPattern: { type: String },
    salary: { type: String },
    jobRoles: [{ type: String }],
    category: { type: String }, // Government Jobs, Banking, Defense, Civil Services
  },
  {
    timestamps: true,
  }
);

const GovernmentExam = mongoose.model("GovernmentExam", governmentExamSchema);

export default GovernmentExam;

