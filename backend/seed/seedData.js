import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Course from "../models/Course.js";

const seed = async () => {
  try {
    await connectDB();

    const courseCount = await Course.countDocuments();

    if (courseCount === 0) {
      await Course.insertMany([
        {
          title: "MBBS",
          category: "Medical & Healthcare",
          duration: "5.5 years",
          eligibility: "After 12th (PCB)",
          location: "Both",
          description:
            "Bachelor of Medicine and Bachelor of Surgery, core undergraduate medical degree.",
          scope: "Doctor in hospitals, clinics, research and public health.",
          salary: "₹6–15 LPA (varies by role and location)",
          growth: "Consistently in demand in India and abroad.",
          entranceExams: ["NEET"],
        },
        {
          title: "BDS",
          category: "Medical & Healthcare",
          duration: "5 years",
          eligibility: "After 12th (PCB)",
          location: "India",
          description:
            "Bachelor of Dental Surgery focusing on oral healthcare and dentistry.",
          scope: "Dentist in clinics, hospitals, and dental chains.",
          salary: "₹4–10 LPA",
          growth: "Good demand with rising awareness of dental health.",
          entranceExams: ["NEET"],
        },
        {
          title: "BAMS",
          category: "Medical & Healthcare",
          duration: "5.5 years",
          eligibility: "After 12th (PCB)",
          location: "India",
          description:
            "Bachelor of Ayurvedic Medicine and Surgery, traditional medicine program.",
          scope: "Ayurvedic practitioner, wellness consultant, research roles.",
          salary: "₹3–8 LPA",
          growth: "Growing demand in holistic and alternative medicine.",
          entranceExams: ["NEET", "State AYUSH entrances"],
        },
        {
          title: "Healthcare Management",
          category: "Medical & Healthcare",
          duration: "2–3 years",
          eligibility: "After graduation in any stream (preferably life sciences)",
          location: "Both",
          description:
            "Program focused on managing hospitals, clinics, and healthcare systems.",
          scope: "Hospital administrator, healthcare operations manager.",
          salary: "₹5–12 LPA",
          growth: "Strong growth with expansion of healthcare sector.",
          entranceExams: ["MBA/PGDM entrances", "Institute-specific tests"],
        },
        {
          title: "B.Tech Computer Science",
          category: "Engineering & Technology",
          duration: "4 years",
          eligibility: "After 12th (PCM)",
          location: "Both",
          description:
            "Undergraduate program in computer science, programming, and software engineering.",
          scope: "Software developer, data engineer, system architect, AI engineer.",
          salary: "₹4–12 LPA (entry level in India)",
          growth: "High demand due to digital transformation and emerging technologies.",
          entranceExams: ["JEE Main", "JEE Advanced", "State Engineering Entrances"],
        },
        {
          title: "B.Com",
          category: "Commerce & Management",
          duration: "3 years",
          eligibility: "After 12th (Commerce/Any Stream)",
          location: "India",
          description:
            "Bachelor of Commerce, foundation for careers in finance, accounting, and business.",
          scope: "Accountant, financial analyst, tax consultant, banker.",
          salary: "₹3–8 LPA",
          growth: "Stable, with strong growth in finance and banking.",
          entranceExams: ["University-specific entrances"],
        },
        {
          title: "BA Psychology",
          category: "Arts & Humanities",
          duration: "3 years",
          eligibility: "After 12th (Any Stream)",
          location: "Both",
          description:
            "Undergraduate course exploring human behavior, mental processes, and counseling.",
          scope: "Counselor, HR professional, research assistant (with higher studies for therapist).",
          salary: "₹3–7 LPA",
          growth: "Growing awareness about mental health increases demand.",
          entranceExams: ["University-specific entrances"],
        },
        {
          title: "BBA",
          category: "Commerce & Management",
          duration: "3 years",
          eligibility: "After 12th (Any Stream)",
          location: "Both",
          description:
            "Bachelor of Business Administration focusing on management, marketing, and entrepreneurship.",
          scope: "Management trainee, business analyst, marketing executive.",
          salary: "₹4–10 LPA",
          growth: "Strong scope in corporate sector and startups.",
          entranceExams: ["IPMAT", "DU JAT", "University-specific entrances"],
        },
        {
          title: "LLB",
          category: "Law",
          duration: "3 or 5 years",
          eligibility: "After 12th (for 5-year) or Graduation (for 3-year)",
          location: "India",
          description:
            "Bachelor of Laws, professional degree to become a lawyer or legal advisor.",
          scope: "Advocate, corporate lawyer, legal consultant, judge (with exams).",
          salary: "₹4–12 LPA",
          growth: "High growth in corporate law and litigation.",
          entranceExams: ["CLAT", "AILET", "LSAT India"],
        },
        {
          title: "B.Sc Agriculture",
          category: "Agriculture",
          duration: "4 years",
          eligibility: "After 12th (PCM/PCB/PCMB)",
          location: "India",
          description:
            "Undergraduate program on agricultural science, farming technology, and agribusiness.",
          scope: "Agricultural officer, agronomist, agribusiness manager.",
          salary: "₹3–8 LPA",
          growth: "Good demand in government and private agri sector.",
          entranceExams: ["ICAR AIEEA", "State agriculture entrances"],
        },
        {
          title: "Hotel Management",
          category: "Hospitality",
          duration: "3–4 years",
          eligibility: "After 12th (Any Stream)",
          location: "Both",
          description:
            "Program focused on hospitality, tourism, and hotel operations.",
          scope: "Hotel manager, chef, front office manager, event manager.",
          salary: "₹3–7 LPA",
          growth: "Strong growth with tourism and hospitality expansion.",
          entranceExams: ["NCHMCT JEE", "Institute-specific entrances"],
        },
      ]);

      console.log("Seeded 10 sample courses into an empty database.");
    } else {
      console.log(`Courses already exist in database (count: ${courseCount}). Skipping seeding.`);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();

