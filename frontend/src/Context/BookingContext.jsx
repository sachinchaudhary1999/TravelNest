// import axios from 'axios'
// import React, { createContext, useContext, useState } from 'react'
// import { authDataContext } from './AuthContext'
// import { userDataContext } from './UserContext'
// import { listingDataContext } from './ListingContext'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'

// export const bookingDataContext = createContext()

// function BookingContext({ children }) {
//   const [checkIn, setCheckIn] = useState("")
//   const [checkOut, setCheckOut] = useState("")
//   const [total, setTotal] = useState(0)
//   const [night, setNight] = useState(0)
//   const [guests, setGuests] = useState(1)
//   const [bookingData, setBookingData] = useState(null)
//   const [booking, setBooking] = useState(false)

//   const { serverUrl } = useContext(authDataContext)
//   const { getCurrentUser } = useContext(userDataContext)
//   const { getListing } = useContext(listingDataContext)
//   const navigate = useNavigate()

//   const handleBooking = async (listingId) => {
//     setBooking(true)
//     try {
//       const result = await axios.post(
//         serverUrl + `/api/booking/create/${listingId}`,
//         { checkIn, checkOut, totalRent: total, guests },
//         { withCredentials: true }
//       )
//       setBookingData(result.data)
//       await getCurrentUser()
//       await getListing()
//       setBooking(false)
//       toast.success("Booking confirmed!")
//       navigate("/booked")
//     } catch (error) {
//       setBooking(false)
//       toast.error(error.response?.data?.message || "Booking failed")
//     }
//   }

//   // FIXED: now takes bookingId (not listingId)
//   const cancelBooking = async (bookingId) => {
//     try {
//       await axios.delete(serverUrl + `/api/booking/cancel/${bookingId}`, { withCredentials: true })
//       await getCurrentUser()
//       await getListing()
//       toast.success("Booking cancelled")
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Cancel failed")
//     }
//   }

//   return (
//     <bookingDataContext.Provider value={{
//       checkIn, setCheckIn, checkOut, setCheckOut,
//       total, setTotal, night, setNight, guests, setGuests,
//       bookingData, setBookingData, handleBooking, cancelBooking, booking,
//     }}>
//       {children}
//     </bookingDataContext.Provider>
//   )
// }

// export default BookingContext

import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext'
import { listingDataContext } from './ListingContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const bookingDataContext = createContext()

function BookingContext({ children }) {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [total, setTotal] = useState(0)
  const [night, setNight] = useState(0)
  const [guests, setGuests] = useState(1)
  const [bookingData, setBookingData] = useState(null)
  const [booking, setBooking] = useState(false)

  const { serverUrl } = useContext(authDataContext)
  const { getCurrentUser, userData } = useContext(userDataContext)
  const { getListing } = useContext(listingDataContext)
  const navigate = useNavigate()

  const handleBooking = async (listingId) => {
    setBooking(true)
    try {

      // ── STEP 1 — Create Razorpay order on backend ─────────────
      const orderRes = await axios.post(
        serverUrl + "/api/payment/create-order",
        { amount: total },
        { withCredentials: true }
      )
      const { orderId, amount } = orderRes.data

      // ── STEP 2 — Open Razorpay checkout popup ─────────────────
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: "TravelNest",
        description: `Booking for ${night} night${night > 1 ? "s" : ""}`,
        order_id: orderId,
        image: "https://i.ibb.co/your-logo", // optional — replace with your logo URL

        // ── STEP 3 — After successful payment ───────────────────
        handler: async (response) => {
          try {
            // Verify payment signature on backend
            await axios.post(
              serverUrl + "/api/payment/verify",
              {
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
              },
              { withCredentials: true }
            )

            // ✅ Create booking — same as before, just with paymentId added
            const result = await axios.post(
              serverUrl + `/api/booking/create/${listingId}`,
              {
                checkIn,
                checkOut,
                totalRent: total,
                guests,
                paymentId: response.razorpay_payment_id, // ✅ new field
              },
              { withCredentials: true }
            )

            setBookingData(result.data)
            await getCurrentUser()
            await getListing()
            setBooking(false)
            toast.success("Booking confirmed! 🎉")
            navigate("/booked")

          } catch (err) {
            setBooking(false)
            toast.error(err.response?.data?.message || "Payment verified but booking failed")
          }
        },

        prefill: {
          name:  userData?.name  || "",
          email: userData?.email || "",
        },

        theme: {
          color: "#FF385C", // ✅ matches TravelNest brand color
        },

        modal: {
          // ── User closes/dismisses the popup ───────────────────
          ondismiss: () => {
            setBooking(false)
            toast.info("Payment cancelled")
          }
        }
      }

      const rzp = new window.Razorpay(options)

      // Handle payment failure inside popup
      rzp.on("payment.failed", (response) => {
        setBooking(false)
        toast.error(`Payment failed: ${response.error.description}`)
      })

      rzp.open()

    } catch (error) {
      // Failed to create Razorpay order
      setBooking(false)
      toast.error(error.response?.data?.message || "Booking failed")
    }
  }

  // ── CANCEL BOOKING — untouched ───────────────────────────────
  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(
        serverUrl + `/api/booking/cancel/${bookingId}`,
        { withCredentials: true }
      )
      await getCurrentUser()
      await getListing()
      toast.success("Booking cancelled")
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancel failed")
    }
  }

  return (
    <bookingDataContext.Provider value={{
      checkIn, setCheckIn, checkOut, setCheckOut,
      total, setTotal, night, setNight, guests, setGuests,
      bookingData, setBookingData, handleBooking, cancelBooking, booking,
    }}>
      {children}
    </bookingDataContext.Provider>
  )
}

export default BookingContext