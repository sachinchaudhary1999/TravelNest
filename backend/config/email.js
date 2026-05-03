import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendBookingConfirmation = async ({ to, guestName, listingTitle, checkIn, checkOut, totalRent, bookingId }) => {
  try {
    await transporter.sendMail({
      from: `"TravelNest" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Booking Confirmed – TravelNest",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px">
          <h2 style="color:#e02020">Booking Confirmed!</h2>
          <p>Hi ${guestName},</p>
          <p>Your booking for <strong>${listingTitle}</strong> is confirmed.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px;border:1px solid #ddd">Booking ID</td><td style="padding:8px;border:1px solid #ddd">${bookingId}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd">Check-In</td><td style="padding:8px;border:1px solid #ddd">${new Date(checkIn).toDateString()}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd">Check-Out</td><td style="padding:8px;border:1px solid #ddd">${new Date(checkOut).toDateString()}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd">Total Rent</td><td style="padding:8px;border:1px solid #ddd">₹${totalRent}</td></tr>
          </table>
          <p>Thank you for booking with TravelNest!</p>
        </div>
      `,
    })
  } catch (err) {
    console.log("Email send error:", err.message)
  }
}

export const sendPasswordResetEmail = async ({ to, resetUrl }) => {
  try {
    await transporter.sendMail({
      from: `"TravelNest" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Reset your TravelNest password",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px">
          <h2 style="color:#e02020">Reset Password</h2>
          <p>Click the button below to reset your password. Link expires in 1 hour.</p>
          <a href="${resetUrl}" style="background:#e02020;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin:16px 0">Reset Password</a>
          <p>If you didn't request this, ignore this email.</p>
        </div>
      `,
    })
  } catch (err) {
    console.log("Email send error:", err.message)
  }
}
