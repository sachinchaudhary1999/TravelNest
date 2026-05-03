import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { authDataContext } from '../Context/AuthContext'
import { bookingDataContext } from '../Context/BookingContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { IoChatbubblesOutline } from 'react-icons/io5'

function MyBooking() {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { cancelBooking } = useContext(bookingDataContext)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const statusColor = {
    booked: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
  }

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const r = await axios.get(serverUrl + "/api/booking/mybookings", { withCredentials: true })
      setBookings(r.data)
    } catch (err) {
      toast.error("Could not load bookings")
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBookings() }, [])

  const handleCancel = async (id) => {
    await cancelBooking(id)
    setConfirm(null)
    fetchBookings()
  }

  const filteredBookings = bookings
    .filter(b => filterStatus === "all" || b.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt)
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt)
      return 0
    })

  if (loading) return <div className='flex items-center justify-center h-screen'><div className='animate-spin rounded-full h-10 w-10 border-b-2 border-red-500' /></div>

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-8 md:px-10'>
      <div className='max-w-3xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/")}>
            <FaArrowLeftLong className='text-white w-4 h-4' />
          </button>
          <h1 className='text-2xl font-bold text-gray-800'>My Bookings</h1>
        </div>

        <div className='flex flex-wrap gap-4 mb-6'>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className='px-3 py-2 border border-gray-300 rounded-lg'>
            <option value="all">All Status</option>
            <option value="booked">Booked</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className='px-3 py-2 border border-gray-300 rounded-lg'>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {filteredBookings.length === 0 ? (
          <div className='text-center py-20'>
            <p className='text-xl text-gray-400'>No bookings yet</p>
            <button className='mt-4 px-6 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600' onClick={() => navigate("/")}>Explore listings</button>
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredBookings.map(b => (
              <div key={b._id} className='bg-white rounded-2xl border border-gray-200 overflow-hidden'>
                <div className='flex gap-4 p-4'>
                  {b.listing?.images?.[0] && (
                    <img src={b.listing.images[0]} className='w-24 h-20 rounded-xl object-cover flex-shrink-0' alt="" />
                  )}
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between gap-2 mb-1'>
                      <p className='font-semibold text-gray-800 truncate'>{b.listing?.title || "Listing"}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${statusColor[b.status]}`}>{b.status}</span>
                    </div>
                    <p className='text-sm text-gray-500'>{b.listing?.city}, {b.listing?.landMark}</p>
                    <div className='flex gap-4 text-sm text-gray-600 mt-2'>
                      <span>📅 {new Date(b.checkIn).toLocaleDateString()} – {new Date(b.checkOut).toLocaleDateString()}</span>
                      <span>🌙 {b.nights} night{b.nights > 1 ? "s" : ""}</span>
                    </div>
                    <p className='text-sm font-bold text-gray-900 mt-1'>Total: ₹{b.totalRent}</p>
                  </div>
                </div>

                {b.status === "booked" && (
                  <div className='flex gap-2 px-4 pb-4'>
                    <button
                      className='flex items-center gap-1.5 text-sm px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition'
                      onClick={() => navigate(`/viewcard/${b.listing._id}`)}
                    >
                      View Listing
                    </button>
                    <button
                      className='flex items-center gap-1.5 text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition'
                      onClick={() => navigate(`/chat/${b._id}`)}
                    >
                      <IoChatbubblesOutline className='w-4 h-4' /> Message Host
                    </button>
                    <button
                      className='text-sm px-4 py-2 border border-red-300 text-red-500 hover:bg-red-50 rounded-lg transition'
                      onClick={() => setConfirm(b._id)}
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {confirm === b._id && (
                  <div className='mx-4 mb-4 bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between'>
                    <p className='text-sm text-red-700'>Are you sure you want to cancel?</p>
                    <div className='flex gap-2'>
                      <button className='text-sm px-3 py-1.5 bg-red-500 text-white rounded-lg' onClick={() => handleCancel(b._id)}>Yes</button>
                      <button className='text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-lg' onClick={() => setConfirm(null)}>No</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBooking
