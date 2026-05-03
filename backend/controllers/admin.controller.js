import User from "../model/user.model.js"
import Listing from "../model/listing.model.js"
import Booking from "../model/booking.model.js"
import Review from "../model/review.model.js"
import bcrypt from "bcryptjs"

// Create first admin (uses ADMIN_SECRET env variable)
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: "Invalid admin secret" })
    }
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: "Email already in use" })
    const hash = await bcrypt.hash(password, 10)
    const admin = await User.create({ name, email, password: hash, role: "admin" })
    return res.status(201).json({ message: "Admin created", id: admin._id })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalListings, totalBookings, pendingListings, recentBookings] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Listing.countDocuments(),
      Booking.countDocuments(),
      Listing.countDocuments({ status: "pending" }),
      Booking.find().sort({ createdAt: -1 }).limit(5)
        .populate("guest", "name email")
        .populate("listing", "title city"),
    ])
    const revenue = await Booking.aggregate([
      { $match: { status: "booked" } },
      { $group: { _id: null, total: { $sum: "$totalRent" } } }
    ])
    return res.status(200).json({
      totalUsers, totalListings, totalBookings, pendingListings,
      totalRevenue: revenue[0]?.total || 0,
      recentBookings,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const skip = (Number(page) - 1) * Number(limit)
    const total = await User.countDocuments()
    const users = await User.find().select("-password").sort({ createdAt: -1 }).skip(skip).limit(Number(limit))
    return res.status(200).json({ users, total })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllListings = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query
    const filter = status ? { status } : {}
    const skip = (Number(page) - 1) * Number(limit)
    const total = await Listing.countDocuments(filter)
    const listings = await Listing.find(filter)
      .populate("host", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
    return res.status(200).json({ listings, total })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const approveListing = async (req, res) => {
  try {
    const { id } = req.params
    const listing = await Listing.findByIdAndUpdate(id, { status: "approved" }, { new: true })
    if (!listing) return res.status(404).json({ message: "Listing not found" })
    return res.status(200).json({ message: "Listing approved", listing })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const rejectListing = async (req, res) => {
  try {
    const { id } = req.params
    const listing = await Listing.findByIdAndUpdate(id, { status: "rejected" }, { new: true })
    if (!listing) return res.status(404).json({ message: "Listing not found" })
    return res.status(200).json({ message: "Listing rejected", listing })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ message: "User not found" })
    if (user.role === "admin") return res.status(403).json({ message: "Cannot delete admin" })
    await User.findByIdAndDelete(id)
    await Listing.deleteMany({ host: id })
    return res.status(200).json({ message: "User deleted" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteListingByAdmin = async (req, res) => {
  try {
    const { id } = req.params
    const listing = await Listing.findByIdAndDelete(id)
    if (!listing) return res.status(404).json({ message: "Listing not found" })
    await User.findByIdAndUpdate(listing.host, { $pull: { listing: listing._id } })
    await Review.deleteMany({ listing: id })
    return res.status(200).json({ message: "Listing deleted by admin" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const skip = (Number(page) - 1) * Number(limit)
    const total = await Booking.countDocuments()
    const bookings = await Booking.find()
      .populate("guest", "name email")
      .populate("host", "name email")
      .populate("listing", "title city")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
    return res.status(200).json({ bookings, total })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
