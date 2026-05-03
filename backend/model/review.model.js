import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true },
}, { timestamps: true })

// One review per user per listing
reviewSchema.index({ listing: 1, user: 1 }, { unique: true })

const Review = mongoose.model("Review", reviewSchema)
export default Review
