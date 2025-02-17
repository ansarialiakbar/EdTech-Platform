import mongoose from "mongoose";

const ScholarshipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    eligibility: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Scholarship", ScholarshipSchema);
