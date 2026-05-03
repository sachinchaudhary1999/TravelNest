import jwt from "jsonwebtoken"
import User from "../model/user.model.js"

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) {
      return res.status(401).json({ message: "Not authenticated. Please login." })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" })
    }
    const user = await User.findById(decoded.userId).select("isBlocked")
    if (!user) {
      return res.status(401).json({ message: "User not found. Please login again." })
    }
    if (user.isBlocked) {
      return res.status(403).json({ message: "Your account has been blocked. Please contact support." })
    }
    req.userId = decoded.userId
    return next()
  } catch (error) {
    return res.status(401).json({ message: "Token expired or invalid. Please login again." })
  }
}

export default isAuth
