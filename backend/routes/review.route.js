import express from "express"
import isAuth from "../middleware/isAuth.js"
import { addReview, getListingReviews, deleteReview } from "../controllers/review.controller.js"

const reviewRouter = express.Router()

reviewRouter.post("/add/:listingId", isAuth, addReview)
reviewRouter.get("/listing/:listingId", getListingReviews)
reviewRouter.delete("/delete/:id", isAuth, deleteReview)

export default reviewRouter
