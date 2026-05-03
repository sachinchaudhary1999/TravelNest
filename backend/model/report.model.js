import mongoose from "mongoose"

const reportSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reason: { type: String, required: true, trim: true },
  details: { type: String, default: "", trim: true },
  status: { type: String, enum: ["open", "reviewed", "dismissed"], default: "open" },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviewedAt: { type: Date },
}, { timestamps: true })

reportSchema.index({ listing: 1, reporter: 1, status: 1 })

const Report = mongoose.model("Report", reportSchema)
export default Report
