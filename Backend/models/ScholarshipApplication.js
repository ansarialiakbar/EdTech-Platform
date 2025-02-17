import mongoose from "mongoose";

const ScholarshipApplicationSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    scholarship: { type: mongoose.Schema.Types.ObjectId, ref: "Scholarship", required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("ScholarshipApplication", ScholarshipApplicationSchema);
