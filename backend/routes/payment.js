import Razorpay from "razorpay"
import crypto from "crypto"
import express from "express"
import isAuth from "../middleware/isAuth.js"

const router = express.Router()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// ✅ Create order — called before showing payment popup
router.post("/create-order", isAuth, async (req, res) => {
  try {
    const { amount } = req.body // amount in rupees
    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    })
    res.json({ orderId: order.id, amount: order.amount })
  } catch (err) {
    res.status(500).json({ message: "Could not create order" })
  }
})

// ✅ Verify payment — called after user pays
router.post("/verify", isAuth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" })
    }

    res.json({ verified: true, paymentId: razorpay_payment_id })
  } catch (err) {
    res.status(500).json({ message: "Verification error" })
  }
})

export default router