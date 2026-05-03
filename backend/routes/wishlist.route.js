import express from "express"
import isAuth from "../middleware/isAuth.js"
import { toggleWishlist, getWishlist } from "../controllers/wishlist.controller.js"

const wishlistRouter = express.Router()

wishlistRouter.post("/toggle/:listingId", isAuth, toggleWishlist)
wishlistRouter.get("/get", isAuth, getWishlist)

export default wishlistRouter
