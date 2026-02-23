import GovernmentExam from "../models/GovernmentExam.js";

// GET /api/exams
export const getExams = async (req, res) => {
  try {
    const { category } = req.query;

    const query = {};
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    const exams = await GovernmentExam.find(query).sort({ createdAt: -1 });
    res.json(exams);
  } catch (error) {
    console.error("Get exams error:", error);
    res.status(500).json({ message: "Server error fetching exams" });
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

