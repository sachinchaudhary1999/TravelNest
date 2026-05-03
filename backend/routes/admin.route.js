import express from "express"
import isAuth from "../middleware/isAuth.js"
import isAdmin from "../middleware/isAdmin.js"
import {
  createAdmin, getDashboardStats, getAllUsers, getAllListings,
  approveListing, rejectListing, deleteUserByAdmin, deleteListingByAdmin, getAllBookings
} from "../controllers/admin.controller.js"

const adminRouter = express.Router()

adminRouter.post("/create", createAdmin) // public, protected by ADMIN_SECRET
adminRouter.get("/stats", isAuth, isAdmin, getDashboardStats)
adminRouter.get("/users", isAuth, isAdmin, getAllUsers)
adminRouter.get("/listings", isAuth, isAdmin, getAllListings)
adminRouter.get("/bookings", isAuth, isAdmin, getAllBookings)
adminRouter.patch("/listing/approve/:id", isAuth, isAdmin, approveListing)
adminRouter.patch("/listing/reject/:id", isAuth, isAdmin, rejectListing)
adminRouter.delete("/user/:id", isAuth, isAdmin, deleteUserByAdmin)
adminRouter.delete("/listing/:id", isAuth, isAdmin, deleteListingByAdmin)

export default adminRouter
