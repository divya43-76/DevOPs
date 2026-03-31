import GovernmentExam from "../models/GovernmentExam.js";
import User from "../models/User.js";

// GET /api/exams
export const getExams = async (req, res) => {
  try {
    const { category } = req.query;

    const query = {};
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    let exams = await GovernmentExam.find(query).sort({ createdAt: -1 });

    if (category && (!exams || exams.length === 0)) {
      exams = await GovernmentExam.find().sort({ createdAt: -1 });
    }

    res.json(exams);
  } catch (error) {
    console.error("Get exams error:", error);
    res.status(500).json({ message: "Server error fetching exams" });
  }
};

// GET /api/exams/recommend
export const recommendExams = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let exams = [];

    if (user.selectedInterests && user.selectedInterests.length > 0) {
      // Interest to exam keywords mapping
      const examMap = {
        "Medical & Healthcare": ["NEET"],
        "Engineering & Technology": ["JEE"],
        "Commerce & Management": ["CA", "CMA", "CS"],
        "Government Jobs": ["UPSC", "SSC"],
        "Banking": ["IBPS", "SBI"],
        "Defense": ["NDA", "CDS"],
        "Law": ["CLAT"],
        "Agriculture": ["ICAR"],
      };

      // Generate exam keywords based on interests
      let keywords = [];
      user.selectedInterests.forEach((interest) => {
        if (examMap[interest]) {
          keywords.push(...examMap[interest]);
        } else {
          keywords.push(interest);
        }
      });

      // Filter exams using regex
      exams = await GovernmentExam.find({
        name: { $in: keywords.map((k) => new RegExp(k, "i")) },
      });
    }

    // If empty, return all exams as fallback
    if (!exams || exams.length === 0) {
      exams = await GovernmentExam.find().sort({ createdAt: -1 });
    }

    console.log("Matched exams for user interests:", exams.length);

    res.status(200).json(exams);
  } catch (error) {
    console.error("Recommend exams error:", error);
    res.status(500).json({ message: error.message });
  }
};

// POST /api/exams (admin)
export const createExam = async (req, res) => {
  try {
    const exam = await GovernmentExam.create(req.body);
    res.status(201).json(exam);
  } catch (error) {
    console.error("Create exam error:", error);
    res.status(500).json({ message: "Server error creating exam" });
  }
};

// DELETE /api/exams/:id (admin)
export const deleteExam = async (req, res) => {
  try {
    const exam = await GovernmentExam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    await exam.deleteOne();
    res.json({ message: "Exam removed" });
  } catch (error) {
    console.error("Delete exam error:", error);
    res.status(500).json({ message: "Server error deleting exam" });
  }
};

