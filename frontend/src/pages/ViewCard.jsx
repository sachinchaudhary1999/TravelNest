import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaWifi, FaSwimmingPool, FaParking, FaSnowflake, FaTv } from 'react-icons/fa'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { MdKitchen, MdPets, MdLocalLaundryService, MdFireplace, MdOutlineBed, MdBathtub } from 'react-icons/md'
import { GiConfirmed } from 'react-icons/gi'
import { listingDataContext } from '../Context/ListingContext'
import { bookingDataContext } from '../Context/BookingContext'
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import Star from '../Component/Star'
import axios from 'axios'
import { toast } from 'react-toastify'

const AMENITY_ICONS = {
  wifi: <FaWifi />, pool: <FaSwimmingPool />, parking: <FaParking />,
  ac: <FaSnowflake />, tv: <FaTv />, kitchen: <MdKitchen />, pets: <MdPets />,
  laundry: <MdLocalLaundryService />, fireplace: <MdFireplace />
}

function ViewCard() {
  const navigate = useNavigate()
  const { cardDetails, setCardDetails } = useContext(listingDataContext)
  const { checkIn, setCheckIn, checkOut, setCheckOut, total, setTotal, night, setNight, guests, setGuests, handleBooking, booking } = useContext(bookingDataContext)
  const { userData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)

  const [imgIdx, setImgIdx] = useState(0)
  const [available, setAvailable] = useState(null)
  const [checkingAvail, setCheckingAvail] = useState(false)
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState(0)
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviews, setReviews] = useState([])

  const listing = cardDetails

  useEffect(() => {
    if (!listing) { navigate("/"); return }
    setReviews(listing.reviews || [])
  }, [listing])

  useEffect(() => {
    if (checkIn && checkOut && listing) {
      const inD = new Date(checkIn), outD = new Date(checkOut)
      if (outD <= inD) { setTotal(0); setNight(0); setAvailable(null); return }
      const n = Math.ceil((outD - inD) / (1000 * 60 * 60 * 24))
      setNight(n)
      setTotal(n * listing.rent)
      checkAvailability(checkIn, checkOut)
    }
  }, [checkIn, checkOut])

  const checkAvailability = async (ci, co) => {
    setCheckingAvail(true)
    try {
      const r = await axios.get(serverUrl + `/api/listing/availability/${listing._id}?checkIn=${ci}&checkOut=${co}`)
      setAvailable(r.data.available)
    } catch { setAvailable(null) }
    setCheckingAvail(false)
  }

  const handleSubmitReview = async (bookingId) => {
    if (!reviewRating) { toast.error("Please select a star rating"); return }
    if (!reviewText.trim()) { toast.error("Please write a review"); return }
    setSubmittingReview(true)
    try {
      const r = await axios.post(serverUrl + `/api/review/add/${listing._id}`,
        { rating: reviewRating, comment: reviewText, bookingId },
        { withCredentials: true }
      )
      setReviews(prev => [r.data, ...prev])
      // Update local card details rating
      setCardDetails(prev => ({
        ...prev,
        ratings: ((prev.ratingsTotal + reviewRating) / (prev.ratingsCount + 1)),
        ratingsCount: prev.ratingsCount + 1,
        ratingsTotal: prev.ratingsTotal + reviewRating,
      }))
      setReviewText(""); setReviewRating(0)
      toast.success("Review submitted!")
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not submit review")
    } finally {
      setSubmittingReview(false)
    }
  }

  // Find user's completed booking for this listing (for review)
  const userBooking = userData?.booking?.find(b =>
    (b.listing?._id || b.listing) === listing?._id && b.status !== "cancelled"
  )

  if (!listing) return null

  const images = listing.images || []
  const avgRating = listing.ratings ? listing.ratings.toFixed(1) : null
  const isOwner = listing.host?._id === userData?._id || listing.host === userData?._id

  return (
    <div className='min-h-screen bg-white pb-20'>
      <div className='max-w-5xl mx-auto px-4 pt-6'>
        {/* Back */}
        <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mb-6' onClick={() => navigate("/")}>
          <FaArrowLeftLong className='text-white w-4 h-4' />
        </button>

        {/* Title */}
        <h1 className='text-2xl font-bold text-gray-900 mb-1'>{listing.title}</h1>
        <div className='flex items-center gap-3 text-sm text-gray-600 mb-4'>
          {avgRating && <span className='flex items-center gap-1'><FaStar className='text-red-400' />{avgRating} ({listing.ratingsCount} reviews)</span>}
          <span>·</span>
          <span>{listing.landMark}, {listing.city}</span>
        </div>

        {/* Images */}
        <div className='relative rounded-2xl overflow-hidden mb-8 bg-gray-100'>
          {images.length > 0 ? (
            <div className='relative h-72 md:h-96'>
              <img src={images[imgIdx]} alt="" className='w-full h-full object-cover' />
              {images.length > 1 && (
                <>
                  <button onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                    className='absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center text-lg'>‹</button>
                  <button onClick={() => setImgIdx(i => (i + 1) % images.length)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center text-lg'>›</button>
                  <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
                    {images.map((_, i) => (
                      <button key={i} onClick={() => setImgIdx(i)}
                        className={`w-2 h-2 rounded-full ${i === imgIdx ? "bg-white" : "bg-white/50"}`} />
                    ))}
                  </div>
                  <div className='absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full'>
                    {imgIdx + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className='h-72 flex items-center justify-center text-gray-400'>No photos</div>
          )}
        </div>

        <div className='grid md:grid-cols-[1fr_340px] gap-8'>
          {/* Left */}
          <div>
            {/* Host info */}
            <div className='flex items-center gap-3 mb-4 pb-4 border-b border-gray-100'>
              {listing.host?.avatar
                ? <img src={listing.host.avatar} className='w-12 h-12 rounded-full object-cover' alt="" />
                : <div className='w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-lg'>
                    {listing.host?.name?.charAt(0).toUpperCase()}
                  </div>
              }
              <div>
                <p className='font-semibold text-gray-800'>Hosted by {listing.host?.name}</p>
                <p className='text-sm text-gray-500'>Member since {new Date(listing.host?.createdAt || listing.createdAt).getFullYear()}</p>
              </div>
            </div>

            {/* Details */}
            <div className='flex gap-5 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100'>
              <span className='flex items-center gap-1'><MdOutlineBed className='w-5 h-5' /> {listing.bedrooms} bed{listing.bedrooms !== 1 ? "s" : ""}</span>
              <span className='flex items-center gap-1'><MdBathtub className='w-5 h-5' /> {listing.bathrooms} bath{listing.bathrooms !== 1 ? "s" : ""}</span>
              <span>Up to {listing.maxGuests} guest{listing.maxGuests !== 1 ? "s" : ""}</span>
            </div>

            {/* Description */}
            <p className='text-gray-700 leading-relaxed mb-6'>{listing.description}</p>

            {/* Amenities */}
            {listing.amenities && listing.amenities.length > 0 && (
              <div className='mb-6 pb-6 border-b border-gray-100'>
                <h2 className='text-xl font-semibold text-gray-800 mb-4'>What this place offers</h2>
                <div className='grid grid-cols-2 gap-3'>
                  {listing.amenities.map((a, i) => (
                    <div key={i} className='flex items-center gap-2 text-gray-700'>
                      <span className='text-lg'>{AMENITY_ICONS[a.toLowerCase()] || "✓"}</span>
                      <span className='capitalize text-sm'>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map coords */}
            {listing.latitude && listing.longitude && listing.latitude !== 0 && (
              <div className='mb-6 pb-6 border-b border-gray-100'>
                <h2 className='text-xl font-semibold text-gray-800 mb-3'>Location</h2>
                <p className='text-sm text-gray-500 mb-2'>{listing.address || `${listing.landMark}, ${listing.city}`}</p>
                <a
                  href={`https://maps.google.com/?q=${listing.latitude},${listing.longitude}`}
                  target="_blank" rel="noreferrer"
                  className='text-sm text-red-500 hover:underline'
                >
                  View on Google Maps →
                </a>
              </div>
            )}

            {/* Reviews */}
            <div>
              <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                <FaStar className='text-red-400' />
                {avgRating ? `${avgRating} · ${listing.ratingsCount} review${listing.ratingsCount !== 1 ? "s" : ""}` : "No reviews yet"}
              </h2>

              {/* Write a review */}
              {userData && userBooking && (
                <div className='bg-gray-50 rounded-xl p-4 mb-6'>
                  <p className='font-medium text-gray-800 mb-3'>Leave a review</p>
                  <Star onRate={setReviewRating} value={reviewRating} />
                  <textarea
                    className='w-full mt-3 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:border-red-300'
                    rows={3} placeholder="Share your experience..."
                    value={reviewText} onChange={e => setReviewText(e.target.value)}
                  />
                  <button
                    className='mt-2 px-5 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 disabled:opacity-60'
                    onClick={() => handleSubmitReview(userBooking._id)}
                    disabled={submittingReview}
                  >
                    {submittingReview ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              )}

              {reviews.length === 0
                ? <p className='text-gray-400 text-sm'>No reviews yet. Be the first!</p>
                : reviews.map(r => (
                  <div key={r._id} className='mb-5 pb-5 border-b border-gray-100 last:border-0'>
                    <div className='flex items-center gap-2 mb-1'>
                      {r.user?.avatar
                        ? <img src={r.user.avatar} className='w-8 h-8 rounded-full object-cover' alt="" />
                        : <div className='w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs font-bold'>
                            {r.user?.name?.charAt(0).toUpperCase()}
                          </div>
                      }
                      <span className='font-medium text-sm text-gray-800'>{r.user?.name}</span>
                      <span className='text-xs text-gray-400'>{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Star value={r.rating} readOnly size="w-4 h-4" />
                    <p className='text-sm text-gray-600 mt-1'>{r.comment}</p>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Right - Booking widget */}
          {!isOwner && (
            <div>
              <div className='sticky top-8 bg-white border border-gray-200 rounded-2xl shadow-lg p-5'>
                <p className='text-xl font-bold text-gray-900 mb-4'>
                  ₹{listing.rent} <span className='text-base font-normal text-gray-500'>/ night</span>
                </p>

                <div className='border border-gray-300 rounded-xl overflow-hidden mb-3'>
                  <div className='grid grid-cols-2 divide-x divide-gray-300'>
                    <div className='p-3'>
                      <p className='text-xs font-semibold text-gray-700 uppercase'>Check-in</p>
                      <input type="date" className='w-full text-sm outline-none mt-1'
                        value={checkIn} min={new Date().toISOString().split("T")[0]}
                        onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div className='p-3'>
                      <p className='text-xs font-semibold text-gray-700 uppercase'>Check-out</p>
                      <input type="date" className='w-full text-sm outline-none mt-1'
                        value={checkOut} min={checkIn || new Date().toISOString().split("T")[0]}
                        onChange={e => setCheckOut(e.target.value)} />
                    </div>
                  </div>
                  <div className='border-t border-gray-300 p-3'>
                    <p className='text-xs font-semibold text-gray-700 uppercase mb-1'>Guests</p>
                    <select className='w-full text-sm outline-none'
                      value={guests} onChange={e => setGuests(Number(e.target.value))}>
                      {Array.from({ length: listing.maxGuests || 1 }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Availability status */}
                {checkIn && checkOut && (
                  <div className={`text-sm py-2 px-3 rounded-lg mb-3 ${checkingAvail ? "bg-gray-100 text-gray-500" : available ? "bg-green-50 text-green-700" : available === false ? "bg-red-50 text-red-600" : ""}`}>
                    {checkingAvail ? "Checking availability..." : available ? "✓ Available for these dates" : available === false ? "✗ Not available for these dates" : ""}
                  </div>
                )}

                {night > 0 && (
                  <div className='space-y-2 mb-4 text-sm'>
                    <div className='flex justify-between text-gray-700'>
                      <span>₹{listing.rent} × {night} night{night > 1 ? "s" : ""}</span>
                      <span>₹{total}</span>
                    </div>
                    <div className='flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100'>
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                )}

                <button
                  className='w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={!checkIn || !checkOut || available === false || booking || !night}
                  onClick={() => handleBooking(listing._id)}
                >
                  {booking ? "Booking..." : available === false ? "Not Available" : "Reserve"}
                </button>

                {night > 0 && <p className='text-center text-xs text-gray-400 mt-2'>You won't be charged yet</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewCard
