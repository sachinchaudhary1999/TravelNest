import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createBooking, cancelBooking, getMyBookings, getHostBookings } from "../controllers/booking.controller.js"

const bookingRouter = express.Router()

bookingRouter.post("/create/:id", isAuth, createBooking)
bookingRouter.delete("/cancel/:id", isAuth, cancelBooking)
bookingRouter.get("/mybookings", isAuth, getMyBookings)
bookingRouter.get("/hostbookings", isAuth, getHostBookings)

export default bookingRouter
