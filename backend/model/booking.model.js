import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalRent: { type: Number, required: true },
  nights: { type: Number, required: true },
  guests: { type: Number, default: 1 },
  status: { type: String, enum: ["booked", "cancelled", "completed"], default: "booked" },
  // Payment
  paymentStatus: { type: String, enum: ["pending", "paid", "refunded"], default: "pending" },
  paymentId: { type: String, default: "" },
}, { timestamps: true })

const Booking = mongoose.model("Booking", bookingSchema)
export default Booking
