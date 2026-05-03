import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import helmet from "helmet"
import passport from "./config/passport.js"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js"
import reviewRouter from "./routes/review.route.js"
import adminRouter from "./routes/admin.route.js"
import messageRouter from "./routes/message.route.js"
import wishlistRouter from "./routes/wishlist.route.js"

const port = process.env.PORT || 8000
const app = express()

// Security headers
app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Passport middleware
app.use(passport.initialize())

// Fixed CORS - reads from env, not hardcoded
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}))

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/listing", listingRouter)
app.use("/api/booking", bookingRouter)
app.use("/api/review", reviewRouter)
app.use("/api/admin", adminRouter)
app.use("/api/message", messageRouter)
app.use("/api/wishlist", wishlistRouter)

// Health check
app.get("/", (req, res) => res.json({ message: "TravelNest API running" }))

app.listen(port, () => {
  connectDb()
  console.log(`Server started on port ${port}`)
})
