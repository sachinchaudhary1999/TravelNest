import express from "express"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"
import {
  addListing, getListing, findListing, updateListing,
  deleteListing, search, checkAvailability, getMyListings
} from "../controllers/listing.controller.js"

const listingRouter = express.Router()

listingRouter.post("/add", isAuth, upload.fields([{ name: "images", maxCount: 10 }]), addListing)
listingRouter.get("/get", getListing)
listingRouter.get("/my", isAuth, getMyListings)
listingRouter.get("/search", search)
listingRouter.get("/availability/:id", checkAvailability)
listingRouter.get("/findlistingbyid/:id", findListing)
listingRouter.put("/update/:id", isAuth, upload.fields([{ name: "images", maxCount: 10 }]), updateListing)
listingRouter.delete("/delete/:id", isAuth, deleteListing)

export default listingRouter
