import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createReport } from "../controllers/report.controller.js"

const reportRouter = express.Router()

reportRouter.post("/listing/:listingId", isAuth, createReport)

export default reportRouter
