import genToken from "../config/token.js"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { sendPasswordResetEmail } from "../config/email.js"
import uploadOnCloudinary from "../config/cloudinary.js"

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

const setCookie = (res, token) => {
  res.cookie("token", token, cookieOptions)
}

const ensureEnvAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase()?.trim()
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminEmail || !adminPassword) return null

  let admin = await User.findOne({ $or: [{ email: adminEmail }, { role: "admin" }] })
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  if (admin) {
    let changed = false
    if (admin.email !== adminEmail) {
      admin.email = adminEmail
      changed = true
    }
    if (admin.role !== "admin") {
      admin.role = "admin"
      changed = true
    }
    if (!(await bcrypt.compare(adminPassword, admin.password))) {
      admin.password = hashedPassword
      changed = true
    }
    if (changed) {
      await admin.save()
    }
    return admin
  }

  admin = await User.create({
    name: "Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
    isVerified: true,
  })
  return admin
}

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" })
    }
    const existUser = await User.findOne({ email })
    if (existUser) {
      return res.status(400).json({ message: "User already exists with this email" })
    }
    
    const hashPassword = await bcrypt.hash(password, 10)
    const userData = { name, email, password: hashPassword }
    
    // Handle avatar upload
    if (req.file) {
      try {
        const avatarUrl = await uploadOnCloudinary(req.file.path)
        if (avatarUrl) {
          userData.avatar = avatarUrl
        } else {
          console.log("Avatar upload failed, continuing without avatar")
        }
      } catch (uploadError) {
        console.log("Avatar upload error:", uploadError)
        // Continue without avatar if upload fails
      }
    }
    
    const user = await User.create(userData)
    const token = genToken(user._id)
    setCookie(res, token)
    const userObj = user.toObject()
    delete userObj.password
    return res.status(201).json(userObj)
  } catch (error) {
    console.error("Signup error:", error)
    return res.status(500).json({ message: `Signup error: ${error.message}` })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase()?.trim()
    const isEnvAdmin = adminEmail && email.toLowerCase() === adminEmail && password === process.env.ADMIN_PASSWORD
    if (isEnvAdmin) {
      const admin = await ensureEnvAdmin()
      const token = genToken(admin._id)
      setCookie(res, token)
      const userObj = admin.toObject()
      delete userObj.password
      return res.status(200).json(userObj)
    }

    const user = await User.findOne({ email: email.toLowerCase() })
      .populate("listing", "title images description rent category city landMark ratings bookedDates status")
      .populate({ path: "booking", populate: { path: "listing", select: "title images rent city landMark category ratings" } })
      .populate("wishlist", "title images rent city landMark category ratings")
    if (!user) {
      return res.status(400).json({ message: "No account found with this email" })
    }
    if (user.isBlocked) {
      return res.status(403).json({ message: "Your account has been blocked. Please contact support." })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" })
    }
    const token = genToken(user._id)
    setCookie(res, token)
    const userObj = user.toObject()
    delete userObj.password
    return res.status(200).json(userObj)
  } catch (error) {
    return res.status(500).json({ message: `Login error: ${error.message}` })
  }
}

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      secure: true,
      sameSite: "none",
      path: "/",
    })
    return res.status(200).json({ message: "Logout successful" })
  } catch (error) {
    return res.status(500).json({ message: `Logout error: ${error.message}` })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const lowerEmail = email?.toLowerCase()?.trim()
    const envAdminEmail = process.env.ADMIN_EMAIL?.toLowerCase()?.trim()
    const user = await User.findOne({ email: lowerEmail })
    if (!user) {
      // Don't reveal if email exists
      return res.status(200).json({ message: "If this email exists, a reset link has been sent." })
    }

    if (user.role === "admin" && user.email.toLowerCase() === envAdminEmail) {
      return res.status(403).json({ message: "Admin password reset is managed through environment configuration." })
    }

    const token = crypto.randomBytes(32).toString("hex")
    user.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
    user.resetPasswordExpiry = Date.now() + 60 * 60 * 1000 // 1 hour
    await user.save()

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`
    await sendPasswordResetEmail({ to: user.email, resetUrl })
    return res.status(200).json({ message: "Password reset email sent." })
  } catch (error) {
    return res.status(500).json({ message: `Forgot password error: ${error.message}` })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" })
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    })
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset link" })
    }
    user.password = await bcrypt.hash(password, 10)
    user.resetPasswordToken = undefined
    user.resetPasswordExpiry = undefined
    await user.save()
    return res.status(200).json({ message: "Password reset successful" })
  } catch (error) {
    return res.status(500).json({ message: `Reset password error: ${error.message}` })
  }
}
