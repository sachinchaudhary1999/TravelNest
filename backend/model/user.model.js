import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  bio: { type: String, default: "" },
  phone: { type: String, default: "" },
  location: { type: String, default: "" },
  dob: { type: Date },
  gender: { type: String, enum: ["male", "female", "other"], default: "other" },
  socialLinks: {
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" }
  },
  preferences: {
    smoking: { type: Boolean, default: false },
    pets: { type: Boolean, default: false },
    partying: { type: Boolean, default: false }
  },
  languages: [{ type: String }],
  role: { type: String, enum: ["user", "admin"], default: "user" },
  listing: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
  booking: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
  resetPasswordToken: { type: String },
  resetPasswordExpiry: { type: Date },
  isVerified: { type: Boolean, default: true },
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User
