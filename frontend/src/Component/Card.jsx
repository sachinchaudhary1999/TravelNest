import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa"
import { GiConfirmed } from "react-icons/gi"
import { userDataContext } from '../Context/UserContext'
import { listingDataContext } from '../Context/ListingContext'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Card({ listing, showCancelButton, bookingId, onCancel }) {
  const navigate = useNavigate()
  const { userData, getCurrentUser } = useContext(userDataContext)
  const { handleViewCard } = useContext(listingDataContext)
  const { serverUrl } = useContext(authDataContext)
  const [imgIdx, setImgIdx] = useState(0)
  const [wishlistLoading, setWishlistLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  if (!listing) return null

  const images = listing.images || []
  const isWishlisted = userData?.wishlist?.some(w => (w._id || w) === listing._id)

  const handleClick = () => {
    if (userData) handleViewCard(listing._id)
    else navigate("/login")
  }

  const handleWishlist = async (e) => {
    e.stopPropagation()
    if (!userData) { navigate("/login"); return }
    setWishlistLoading(true)
    try {
      await axios.post(serverUrl + `/api/wishlist/toggle/${listing._id}`, {}, { withCredentials: true })
      await getCurrentUser()
    } catch (err) {
      toast.error("Could not update wishlist")
    } finally {
      setWishlistLoading(false)
    }
  }

  const avgRating = listing.ratings ? listing.ratings.toFixed(1) : "New"

  return (
    <div className='w-[300px] max-w-[90vw] flex flex-col rounded-xl cursor-pointer relative group'>
      {/* Image gallery */}
      <div className='relative w-full h-56 rounded-xl overflow-hidden bg-gray-100'>
        {images.length > 0
          ? <img
              src={images[imgIdx]}
              alt={listing.title}
              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
              onClick={handleClick}
            />
          : <div className='w-full h-full bg-gray-200 flex items-center justify-center text-gray-400'>No image</div>
        }

        {/* Image dots */}
        {images.length > 1 && (
          <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1'>
            {images.map((_, i) => (
              <button
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition ${i === imgIdx ? "bg-white" : "bg-white/50"}`}
                onClick={e => { e.stopPropagation(); setImgIdx(i) }}
              />
            ))}
          </div>
        )}

        {/* Prev/Next arrows */}
        {images.length > 1 && (
          <>
            <button
              className='absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition'
              onClick={e => { e.stopPropagation(); setImgIdx(i => (i - 1 + images.length) % images.length) }}
            >‹</button>
            <button
              className='absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition'
              onClick={e => { e.stopPropagation(); setImgIdx(i => (i + 1) % images.length) }}
            >›</button>
          </>
        )}

        {/* Wishlist button */}
        <button
          className='absolute top-3 right-3 z-10'
          onClick={handleWishlist}
          disabled={wishlistLoading}
        >
          {isWishlisted
            ? <FaHeart className='w-5 h-5 text-red-500 drop-shadow' />
            : <FaRegHeart className='w-5 h-5 text-white drop-shadow' />
          }
        </button>

        {/* Booked badge */}
        {showCancelButton && (
          <div className='absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1'>
            <GiConfirmed className='w-3 h-3' /> Booked
          </div>
        )}
      </div>

      {/* Info */}
      <div className='pt-3 pb-2' onClick={handleClick}>
        <div className='flex items-start justify-between'>
          <span className='font-semibold text-sm text-gray-800 truncate max-w-[75%]'>
            {listing.landMark}, {listing.city}
          </span>
          <span className='flex items-center gap-1 text-sm text-gray-700 flex-shrink-0'>
            <FaStar className='text-red-400 w-3.5 h-3.5' />
            {avgRating}
          </span>
        </div>
        <p className='text-sm text-gray-500 truncate'>{listing.title}</p>
        <p className='text-sm font-semibold mt-1'>
          <span className='text-gray-900'>₹{listing.rent}</span>
          <span className='font-normal text-gray-500'> / night</span>
        </p>
      </div>

      {/* Cancel booking */}
      {showCancelButton && (
        <div>
          <button
            className='w-full text-sm text-red-500 border border-red-300 rounded-lg py-1.5 hover:bg-red-50 transition mt-1'
            onClick={e => { e.stopPropagation(); setShowConfirm(true) }}
          >
            Cancel Booking
          </button>
          {showConfirm && (
            <div className='absolute inset-0 bg-white/90 rounded-xl flex flex-col items-center justify-center gap-3 z-20 p-4'>
              <p className='text-sm font-medium text-gray-800 text-center'>Cancel this booking?</p>
              <div className='flex gap-2'>
                <button
                  className='px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600'
                  onClick={e => { e.stopPropagation(); onCancel(bookingId); setShowConfirm(false) }}
                >
                  Yes, Cancel
                </button>
                <button
                  className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300'
                  onClick={e => { e.stopPropagation(); setShowConfirm(false) }}
                >
                  Keep it
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Card
