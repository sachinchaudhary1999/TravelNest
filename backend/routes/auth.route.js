import express from "express"
import rateLimit from "express-rate-limit"
import passport from "../config/passport.js"
import upload from "../middleware/multer.js"
import genToken from "../config/token.js"
import { signUp, login, logOut, forgotPassword, resetPassword } from "../controllers/auth.controller.js"

const authRouter = express.Router()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many attempts, please try again in 15 minutes" },
})

authRouter.post("/signup", authLimiter, upload.single("avatar"), signUp)
authRouter.post("/login", authLimiter, login)
authRouter.post("/logout", logOut)
authRouter.post("/forgot-password", authLimiter, forgotPassword)
authRouter.post("/reset-password/:token", resetPassword)

const googleOAuthEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
const googleFailureRedirect = `${process.env.CLIENT_URL || "http://localhost:5173"}/login`

if (googleOAuthEnabled) {
  authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

  authRouter.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: googleFailureRedirect }),
    (req, res) => {
      const token = genToken(req.user._id)
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      res.redirect(process.env.CLIENT_URL || "http://localhost:5173")
    }
  )
} else {
  authRouter.get("/google", (req, res) => {
    res.status(501).json({ message: "Google OAuth is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET." })
  })

  authRouter.get("/google/callback", (req, res) => {
    res.status(501).json({ message: "Google OAuth callback is not available because Google credentials are not configured." })
  })
}

export default authRouter
