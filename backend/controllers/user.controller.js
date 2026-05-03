import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import uploadOnCloudinary from "../config/cloudinary.js"
import Listing from "../model/listing.model.js"

export const getCurrentUser = async (req, res) => {
  try {
    const hostedListings = await Listing.find({ host: req.userId }).select("_id")
    if (hostedListings.length > 0) {
      await User.findByIdAndUpdate(req.userId, {
        $addToSet: { listing: { $each: hostedListings.map(listing => listing._id) } }
      })
    }

    const user = await User.findById(req.userId)
      .select("-password -resetPasswordToken -resetPasswordExpiry")
      .populate("listing", "title images description rent category city landMark ratings bookedDates status")
      .populate({ path: "booking", populate: { path: "listing", select: "title images rent city landMark category ratings" } })
      .populate("wishlist", "title images rent city landMark category ratings bookedDates")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: `getCurrentUser error: ${error.message}` })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, bio, phone, location, dob, gender, socialLinks, preferences, languages } = req.body
    const updateData = {}
    if (name) updateData.name = name
    if (bio !== undefined) updateData.bio = bio
    if (phone !== undefined) updateData.phone = phone
    if (location !== undefined) updateData.location = location
    if (dob) updateData.dob = new Date(dob)
    if (gender) updateData.gender = gender
    if (socialLinks) updateData.socialLinks = socialLinks
    if (preferences) updateData.preferences = preferences
    if (languages) updateData.languages = languages

    if (req.file) {
      const avatarUrl = await uploadOnCloudinary(req.file.path)
      if (avatarUrl) updateData.avatar = avatarUrl
    }

    const user = await User.findByIdAndUpdate(req.userId, updateData, { new: true })
      .select("-password")
      .populate("listing", "title images description rent category city landMark ratings bookedDates status")
      .populate({ path: "booking", populate: { path: "listing", select: "title images rent city landMark category ratings" } })
      .populate("wishlist", "title images rent city landMark category ratings")
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: `Update profile error: ${error.message}` })
  }
}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both fields required" })
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" })
    }
    const user = await User.findById(req.userId)
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" })
    }
    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()
    return res.status(200).json({ message: "Password changed successfully" })
  } catch (error) {
    return res.status(500).json({ message: `Change password error: ${error.message}` })
  }
}

export const getPublicProfile = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
      .select("name avatar bio createdAt listing")
      .populate("listing", "title images rent city landMark category ratings")
    if (!user) return res.status(404).json({ message: "User not found" })
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: `Get profile error: ${error.message}` })
  }
}
