import Scholarship from "../models/Scholarship.js";
import ScholarshipApplication from "../models/ScholarshipApplication.js";

export const getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: "Error fetching scholarships", error });
  }
};

export const addScholarship = async (req, res) => {
  try {
    const { name, amount, eligibility } = req.body;

    // ✅ Ensure only admins can add scholarships
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const scholarship = new Scholarship({ name, amount, eligibility });
    await scholarship.save();
    res.status(201).json({ message: "Scholarship created successfully", scholarship });
  } catch (error) {
    res.status(500).json({ message: "Error adding scholarship", error });
  }
};

export const applyForScholarship = async (req, res) => {
  try {
    const { scholarshipId } = req.params;
    const userId = req.user._id;

    // ✅ Ensure only students can apply
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can apply for scholarships." });
    }

    // ✅ Check if the scholarship exists
    const scholarship = await Scholarship.findById(scholarshipId);
    if (!scholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }

    // ✅ Check if the user has already applied
    const existingApplication = await ScholarshipApplication.findOne({
      student: userId,
      scholarship: scholarshipId,
    });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this scholarship" });
    }

    // ✅ Save the new scholarship application
    const application = new ScholarshipApplication({
      student: userId,
      scholarship: scholarshipId,
      status: "Pending",
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Scholarship application error:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};
