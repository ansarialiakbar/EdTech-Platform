import Application from "../models/Application.js";

export const submitApplication = async (req, res) => {
  try {
    const { course, university } = req.body;
    const application = new Application({
      student: req.user.id,
      course,
      university,
      status: "Pending"
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Error submitting application", error });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("student", "name email");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: "Application not found" });

    application.status = status;
    await application.save();
    res.json({ message: "Application status updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating application status", error });
  }
};
