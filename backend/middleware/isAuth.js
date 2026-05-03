import jwt from "jsonwebtoken"

const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) {
      return res.status(401).json({ message: "Not authenticated. Please login." })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" })
    }
    req.userId = decoded.userId
    return next()
  } catch (error) {
    return res.status(401).json({ message: "Token expired or invalid. Please login again." })
  }
}

export default isAuth
