import express from "express"
import isAuth from "../middleware/isAuth.js"
import { sendMessage, getMessages, getMyConversations } from "../controllers/message.controller.js"

const messageRouter = express.Router()

messageRouter.post("/send/:bookingId", isAuth, sendMessage)
messageRouter.get("/booking/:bookingId", isAuth, getMessages)
messageRouter.get("/conversations", isAuth, getMyConversations)

export default messageRouter
