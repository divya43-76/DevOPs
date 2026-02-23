import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import GovernmentExam from "../models/GovernmentExam.js";

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      GovernmentExam.deleteMany({}),
    ]);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@pathfinder.com",
      password: "Admin@123",
      role: "admin",
    });

    const courses = await Course.insertMany([
      {
        title: "B.Tech Computer Science",
        category: "Engineering & Technology",
        duration: "4 years",
        eligibility: "After 12th (PCM)",
        location: "Both",
        description:
          "Undergraduate program focusing on computer science fundamentals, programming, and software engineering.",
        scope: "Software developer, data engineer, system architect, AI engineer.",
        salary: "₹4–12 LPA (entry level in India)",
        growth: "High demand due to digital transformation and emerging technologies.",
        entranceExams: ["JEE Main", "JEE Advanced", "State Engineering Entrances"],
        topCollegesIndia: ["IITs", "NITs", "IIITs", "Top Private Universities"],
        topCountriesAbroad: ["USA", "Canada", "Germany", "UK", "Australia"],
      },
      {
        title: "MBBS",
        category: "Medical & Healthcare",
        duration: "5.5 years",
        eligibility: "After 12th (PCB)",
        location: "Both",
        description:
          "Bachelor of Medicine and Bachelor of Surgery, primary undergraduate medical course.",
        scope: "Doctor in hospitals, clinics, research institutions.",
        salary: "₹6–15 LPA (varies widely)",
        growth: "Consistent demand in India and abroad.",
        entranceExams: ["NEET"],
        topCollegesIndia: ["AIIMS", "CMC Vellore", "JIPMER", "Top Govt. Medical Colleges"],
        topCountriesAbroad: ["USA", "UK", "Russia", "Ukraine", "Philippines"],
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
        topCollegesIndia: ["SRCC", "Loyola College", "Christ University"],
        topCountriesAbroad: [],
      },
      {
        title: "BA Psychology",
        category: "Arts & Humanities",
        duration: "3 years",
        eligibility: "After 12th (Any Stream)",
        location: "Both",
        description:
          "Undergraduate course exploring human behavior, mental processes, and counseling.",
        scope: "Counselor, HR professional, research assistant, therapist (with higher studies).",
        salary: "₹3–7 LPA",
        growth: "Growing awareness about mental health increases demand.",
        entranceExams: ["University-specific entrances"],
        topCollegesIndia: ["Delhi University Colleges", "TISS"],
        topCountriesAbroad: ["USA", "Canada", "UK"],
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
        topCollegesIndia: ["IIM Indore (IPM)", "NMIMS", "Symbiosis"],
        topCountriesAbroad: ["USA", "Singapore", "Australia"],
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
        topCollegesIndia: ["NLUs", "NLSIU", "NALSAR"],
        topCountriesAbroad: [],
      },
    ]);

    const exams = await GovernmentExam.insertMany([
      {
        name: "UPSC Civil Services",
        eligibility: "Graduation in any discipline",
        ageLimit: "21–32 years (general category)",
        examPattern: "Prelims + Mains + Interview",
        salary: "₹56,100 – ₹2,50,000 per month",
        jobRoles: ["IAS", "IPS", "IFS", "IRS"],
        category: "Civil Services",
      },
      {
        name: "SSC CGL",
        eligibility: "Graduation in any discipline",
        ageLimit: "Varies by post (~18–32 years)",
        examPattern: "Tier I + Tier II + Skill Test",
        salary: "₹35,000 – ₹90,000 per month",
        jobRoles: ["Income Tax Inspector", "Assistant Section Officer", "Auditor"],
        category: "Government Jobs",
      },
      {
        name: "IBPS PO",
        eligibility: "Graduation in any discipline",
        ageLimit: "20–30 years",
        examPattern: "Prelims + Mains + Interview",
        salary: "₹35,000 – ₹60,000 per month",
        jobRoles: ["Probationary Officer in Public Sector Banks"],
        category: "Banking",
      },
      {
        name: "NDA",
        eligibility: "After 12th (PCM preferred for Air Force/Navy)",
        ageLimit: "16.5–19.5 years",
        examPattern: "Written Exam + SSB Interview",
        salary: "Stipend during training, then officer pay scale",
        jobRoles: ["Officer in Indian Army, Navy, Air Force"],
        category: "Defense",
      },
      {
        name: "TNPSC Group Exams",
        eligibility: "Varies by group, generally graduation or 12th",
        ageLimit: "Varies by post",
        examPattern: "Prelims + Mains + Interview",
        salary: "Varies",
        jobRoles: ["State Government Officer Roles in Tamil Nadu"],
        category: "Government Jobs",
      },
    ]);

    console.log("Seed data created:");
    console.log(`Admin: ${admin.email}`);
    console.log(`Courses: ${courses.length}`);
    console.log(`Exams: ${exams.length}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();

