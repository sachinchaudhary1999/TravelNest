import express from "express"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"
import { getCurrentUser, updateProfile, changePassword, getPublicProfile } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.get("/currentuser", isAuth, getCurrentUser)
userRouter.put("/update", isAuth, upload.single("avatar"), updateProfile)
userRouter.put("/change-password", isAuth, changePassword)
userRouter.get("/profile/:id", getPublicProfile)

export default userRouter
