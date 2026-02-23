import Course from "../models/Course.js";
import User from "../models/User.js";
import { getAIRecommendations } from "../utils/aiRecommendations.js";

// GET /api/courses
export const getCourses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      location,
      interest,
    } = req.query;

    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (location) {
      query.location = location;
    }

    if (interest) {
      query.category = { $regex: interest, $options: "i" };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [courses, total] = await Promise.all([
      Course.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Course.countDocuments(query),
    ]);

    res.json({
      courses,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    console.error("Get courses error:", error);
    res.status(500).json({ message: "Server error fetching courses" });
  }
};

// GET /api/courses/recommend
export const getRecommendedCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const aiRecs = getAIRecommendations({
      interests: user.selectedInterests || [],
      classLevel: user.classLevel,
      location: user.preferredLocation,
    });

    const interestsRegex = (user.selectedInterests || []).map((i) => ({
      category: { $regex: i, $options: "i" },
    }));

    const aiTitleRegex = aiRecs.map((title) => ({
      title: { $regex: title, $options: "i" },
    }));

    const orConditions = [...interestsRegex, ...aiTitleRegex];

    const query = orConditions.length ? { $or: orConditions } : {};

    const courses = await Course.find(query).limit(20);

    res.json({
      aiRecommendations: aiRecs,
      courses,
    });
  } catch (error) {
    console.error("Recommend courses error:", error);
    res.status(500).json({ message: "Server error fetching recommendations" });
  }
};

// POST /api/courses (admin)
export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({ message: "Server error creating course" });
  }
};

// PUT /api/courses/:id (admin)
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    Object.assign(course, req.body);
    const updated = await course.save();
    res.json(updated);
  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({ message: "Server error updating course" });
  }
};

// DELETE /api/courses/:id (admin)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();
    res.json({ message: "Course removed" });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({ message: "Server error deleting course" });
  }
};

// POST /api/courses/:id/bookmark
export const toggleBookmarkCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const courseId = req.params.id;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.bookmarks.findIndex(
      (cId) => cId.toString() === courseId.toString()
    );

    if (index > -1) {
      user.bookmarks.splice(index, 1);
    } else {
      user.bookmarks.push(courseId);
    }

    await user.save();
    await user.populate("bookmarks");

    res.json({
      message: index > -1 ? "Bookmark removed" : "Course bookmarked",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    console.error("Bookmark course error:", error);
    res.status(500).json({ message: "Server error bookmarking course" });
  }
};

