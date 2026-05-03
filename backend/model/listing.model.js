import mongoose from "mongoose"

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  images: [{ type: String }], // all images array

  rent: { type: Number, required: true },
  city: { type: String, required: true },
  landMark: { type: String, required: true },
  address: { type: String, default: "" },
  category: { type: String, required: true },

  // Guest capacity
  maxGuests: { type: Number, default: 1 },
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },

  // Amenities
  amenities: [{ type: String }],

  // Geo coordinates for map
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },

  // Ratings (averaged)
  ratingsTotal: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  ratings: { type: Number, default: 0 },

  // Approval flow
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "approved" },

  // Booked date ranges (replaces boolean isBooked)
  bookedDates: [{
    checkIn: Date,
    checkOut: Date,
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" }
  }],

}, { timestamps: true })

// Virtual: is currently booked
listingSchema.virtual("isCurrentlyBooked").get(function () {
  const now = new Date()
  return this.bookedDates.some(d => new Date(d.checkIn) <= now && new Date(d.checkOut) >= now)
})

const Listing = mongoose.model("Listing", listingSchema)
export default Listing
