import React, { useContext } from 'react'
import { GiConfirmed } from "react-icons/gi"
import { bookingDataContext } from '../Context/BookingContext'
import { useNavigate } from 'react-router-dom'
import { IoChatbubblesOutline } from 'react-icons/io5'

function Booked() {
  const { bookingData } = useContext(bookingDataContext)
  const navigate = useNavigate()

  if (!bookingData) { navigate("/"); return null }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='max-w-md w-full'>
        <div className='bg-white rounded-2xl border border-gray-200 p-8 text-center mb-4'>
          <GiConfirmed className='w-20 h-20 text-green-500 mx-auto mb-4' />
          <h1 className='text-2xl font-bold text-gray-800 mb-1'>Booking Confirmed!</h1>
          <p className='text-gray-500 text-sm mb-6'>A confirmation email has been sent to you.</p>

          <div className='text-left space-y-3 bg-gray-50 rounded-xl p-4'>
            <Row label="Booking ID" value={bookingData._id} mono />
            <Row label="Property" value={bookingData.listing?.title || "—"} />
            <Row label="Check-in" value={new Date(bookingData.checkIn).toDateString()} />
            <Row label="Check-out" value={new Date(bookingData.checkOut).toDateString()} />
            <Row label="Nights" value={bookingData.nights} />
            <Row label="Total Rent" value={`₹${bookingData.totalRent}`} bold />
            <Row label="Host" value={bookingData.host?.email || "—"} />
          </div>
        </div>

        <div className='flex gap-3'>
          <button
            className='flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition flex items-center justify-center gap-2'
            onClick={() => navigate(`/chat/${bookingData._id}`)}
          >
            <IoChatbubblesOutline className='w-5 h-5' /> Message Host
          </button>
          <button
            className='flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition'
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, mono, bold }) {
  return (
    <div className='flex items-center justify-between text-sm'>
      <span className='text-gray-500'>{label}</span>
      <span className={`text-gray-800 ${mono ? "font-mono text-xs" : ""} ${bold ? "font-bold" : ""} text-right max-w-[60%] truncate`}>{value}</span>
    </div>
  )
}

export default Booked
