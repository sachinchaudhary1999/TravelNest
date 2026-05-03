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
  const { getCurrentUser } = useContext(userDataContext)
  const { getListing } = useContext(listingDataContext)
  const navigate = useNavigate()

  const handleBooking = async (listingId) => {
    setBooking(true)
    try {
      const result = await axios.post(
        serverUrl + `/api/booking/create/${listingId}`,
        { checkIn, checkOut, totalRent: total, guests },
        { withCredentials: true }
      )
      setBookingData(result.data)
      await getCurrentUser()
      await getListing()
      setBooking(false)
      toast.success("Booking confirmed!")
      navigate("/booked")
    } catch (error) {
      setBooking(false)
      toast.error(error.response?.data?.message || "Booking failed")
    }
  }

  // FIXED: now takes bookingId (not listingId)
  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(serverUrl + `/api/booking/cancel/${bookingId}`, { withCredentials: true })
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
