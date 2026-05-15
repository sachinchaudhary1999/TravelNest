// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FaStar, FaWifi, FaSwimmingPool, FaParking, FaSnowflake, FaTv } from 'react-icons/fa'
// import { FaArrowLeftLong } from 'react-icons/fa6'
// import { MdKitchen, MdPets, MdLocalLaundryService, MdFireplace, MdOutlineBed, MdBathtub, MdFlag } from 'react-icons/md'
// import { GiConfirmed } from 'react-icons/gi'
// import { listingDataContext } from '../Context/ListingContext'
// import { bookingDataContext } from '../Context/BookingContext'
// import { userDataContext } from '../Context/UserContext'
// import { authDataContext } from '../Context/AuthContext'
// import Star from '../Component/Star'
// import Navbar from '../Component/layout/NavBar'
// import Footer from '../Component/layout/Footer'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const AMENITY_ICONS = {
//   wifi: <FaWifi />, pool: <FaSwimmingPool />, parking: <FaParking />,
//   ac: <FaSnowflake />, tv: <FaTv />, kitchen: <MdKitchen />, pets: <MdPets />,
//   laundry: <MdLocalLaundryService />, fireplace: <MdFireplace />
// }

// function ViewCard() {
//   const navigate = useNavigate()
//   const { cardDetails, setCardDetails } = useContext(listingDataContext)
//   const { checkIn, setCheckIn, checkOut, setCheckOut, total, setTotal, night, setNight, guests, setGuests, handleBooking, booking } = useContext(bookingDataContext)
//   const { userData } = useContext(userDataContext)
//   const { serverUrl } = useContext(authDataContext)

//   const [imgIdx, setImgIdx] = useState(0)
//   const [available, setAvailable] = useState(null)
//   const [checkingAvail, setCheckingAvail] = useState(false)
//   const [reviewText, setReviewText] = useState("")
//   const [reviewRating, setReviewRating] = useState(0)
//   const [submittingReview, setSubmittingReview] = useState(false)
//   const [reviews, setReviews] = useState([])
//   const [showReport, setShowReport] = useState(false)
//   const [reportReason, setReportReason] = useState("Misleading or inaccurate listing")
//   const [reportDetails, setReportDetails] = useState("")
//   const [reporting, setReporting] = useState(false)

//   const listing = cardDetails

//   useEffect(() => {
//     if (!listing) { navigate("/"); return }
//     setReviews(listing.reviews || [])
//   }, [listing])

//   useEffect(() => {
//     if (checkIn && checkOut && listing) {
//       const inD = new Date(checkIn), outD = new Date(checkOut)
//       if (outD <= inD) { setTotal(0); setNight(0); setAvailable(null); return }
//       const n = Math.ceil((outD - inD) / (1000 * 60 * 60 * 24))
//       setNight(n)
//       setTotal(n * listing.rent)
//       checkAvailability(checkIn, checkOut)
//     }
//   }, [checkIn, checkOut])

//   const checkAvailability = async (ci, co) => {
//     setCheckingAvail(true)
//     try {
//       const r = await axios.get(serverUrl + `/api/listing/availability/${listing._id}?checkIn=${ci}&checkOut=${co}`)
//       setAvailable(r.data.available)
//     } catch { setAvailable(null) }
//     setCheckingAvail(false)
//   }

//   const handleSubmitReview = async (bookingId) => {
//     if (!reviewRating) { toast.error("Please select a star rating"); return }
//     if (!reviewText.trim()) { toast.error("Please write a review"); return }
//     setSubmittingReview(true)
//     try {
//       const r = await axios.post(serverUrl + `/api/review/add/${listing._id}`,
//         { rating: reviewRating, comment: reviewText, bookingId },
//         { withCredentials: true }
//       )
//       setReviews(prev => [r.data, ...prev])
//       // Update local card details rating
//       setCardDetails(prev => ({
//         ...prev,
//         ratings: ((prev.ratingsTotal + reviewRating) / (prev.ratingsCount + 1)),
//         ratingsCount: prev.ratingsCount + 1,
//         ratingsTotal: prev.ratingsTotal + reviewRating,
//       }))
//       setReviewText(""); setReviewRating(0)
//       toast.success("Review submitted!")
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Could not submit review")
//     } finally {
//       setSubmittingReview(false)
//     }
//   }

//   const handleReport = async () => {
//     if (!userData) { navigate("/login"); return }
//     setReporting(true)
//     try {
//       await axios.post(
//         serverUrl + `/api/report/listing/${listing._id}`,
//         { reason: reportReason, details: reportDetails },
//         { withCredentials: true }
//       )
//       setShowReport(false)
//       setReportDetails("")
//       toast.success("Report submitted for admin review")
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Could not submit report")
//     } finally {
//       setReporting(false)
//     }
//   }

//   // Find user's completed booking for this listing (for review)
//   const userBooking = userData?.booking?.find(b =>
//     (b.listing?._id || b.listing) === listing?._id && b.status !== "cancelled"
//   )

//   if (!listing) return null

//   const images = listing.images || []
//   const avgRating = listing.ratings ? listing.ratings.toFixed(1) : null
//   const isOwner = listing.host?._id === userData?._id || listing.host === userData?._id

//   return (
//     <div className='min-h-screen bg-white pb-20'>
//       <Navbar />
//       <div className='max-w-5xl mx-auto px-4 pt-6'>
//         {/* Back */}
//         <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mb-6' onClick={() => navigate("/")}>
//           <FaArrowLeftLong className='text-white w-4 h-4' />
//         </button>

//         {/* Title */}
//         <h1 className='text-2xl font-bold text-gray-900 mb-1'>{listing.title}</h1>
//         <div className='flex items-center gap-3 text-sm text-gray-600 mb-4'>
//           {avgRating && <span className='flex items-center gap-1'><FaStar className='text-red-400' />{avgRating} ({listing.ratingsCount} reviews)</span>}
//           <span>·</span>
//           <span>{listing.landMark}, {listing.city}</span>
//           {!isOwner && (
//             <button className='ml-auto flex items-center gap-1 text-red-500 hover:underline' onClick={() => setShowReport(prev => !prev)}>
//               <MdFlag /> Report
//             </button>
//           )}
//         </div>

//         {showReport && !isOwner && (
//           <div className='mb-6 border border-red-100 bg-red-50 rounded-xl p-4'>
//             <p className='font-medium text-gray-800 mb-3'>Report this listing</p>
//             <select className='w-full border border-red-100 rounded-lg px-3 py-2 text-sm outline-none mb-3 bg-white' value={reportReason} onChange={e => setReportReason(e.target.value)}>
//               <option>Misleading or inaccurate listing</option>
//               <option>Unsafe or suspicious property</option>
//               <option>Inappropriate images or content</option>
//               <option>Spam or duplicate listing</option>
//               <option>Other</option>
//             </select>
//             <textarea className='w-full border border-red-100 rounded-lg px-3 py-2 text-sm outline-none resize-none bg-white' rows={3} placeholder='Add details for admin review' value={reportDetails} onChange={e => setReportDetails(e.target.value)} />
//             <div className='flex gap-2 mt-3'>
//               <button className='px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 disabled:opacity-60' onClick={handleReport} disabled={reporting}>
//                 {reporting ? "Submitting..." : "Submit report"}
//               </button>
//               <button className='px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-50' onClick={() => setShowReport(false)}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Images */}
//         <div className='relative rounded-2xl overflow-hidden mb-8 bg-gray-100'>
//           {images.length > 0 ? (
//             <div className='relative h-72 md:h-96'>
//               <img src={images[imgIdx]} alt="" className='w-full h-full object-cover' />
//               {images.length > 1 && (
//                 <>
//                   <button onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
//                     className='absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center text-lg'>‹</button>
//                   <button onClick={() => setImgIdx(i => (i + 1) % images.length)}
//                     className='absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center text-lg'>›</button>
//                   <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5'>
//                     {images.map((_, i) => (
//                       <button key={i} onClick={() => setImgIdx(i)}
//                         className={`w-2 h-2 rounded-full ${i === imgIdx ? "bg-white" : "bg-white/50"}`} />
//                     ))}
//                   </div>
//                   <div className='absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full'>
//                     {imgIdx + 1} / {images.length}
//                   </div>
//                 </>
//               )}
//             </div>
//           ) : (
//             <div className='h-72 flex items-center justify-center text-gray-400'>No photos</div>
//           )}
//         </div>

//         <div className='grid md:grid-cols-[1fr_340px] gap-8'>
//           {/* Left */}
//           <div>
//             {/* Host info */}
//             <div className='flex items-center gap-3 mb-4 pb-4 border-b border-gray-100'>
//               {listing.host?.avatar
//                 ? <img src={listing.host.avatar} className='w-12 h-12 rounded-full object-cover' alt="" />
//                 : <div className='w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-lg'>
//                     {listing.host?.name?.charAt(0).toUpperCase()}
//                   </div>
//               }
//               <div>
//                 <p className='font-semibold text-gray-800'>Hosted by {listing.host?.name}</p>
//                 <p className='text-sm text-gray-500'>Member since {new Date(listing.host?.createdAt || listing.createdAt).getFullYear()}</p>
//               </div>
//             </div>

//             {/* Details */}
//             <div className='flex gap-5 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100'>
//               <span className='flex items-center gap-1'><MdOutlineBed className='w-5 h-5' /> {listing.bedrooms} bed{listing.bedrooms !== 1 ? "s" : ""}</span>
//               <span className='flex items-center gap-1'><MdBathtub className='w-5 h-5' /> {listing.bathrooms} bath{listing.bathrooms !== 1 ? "s" : ""}</span>
//               <span>Up to {listing.maxGuests} guest{listing.maxGuests !== 1 ? "s" : ""}</span>
//             </div>

//             {/* Description */}
//             <p className='text-gray-700 leading-relaxed mb-6'>{listing.description}</p>

//             {/* Amenities */}
//             {listing.amenities && listing.amenities.length > 0 && (
//               <div className='mb-6 pb-6 border-b border-gray-100'>
//                 <h2 className='text-xl font-semibold text-gray-800 mb-4'>What this place offers</h2>
//                 <div className='grid grid-cols-2 gap-3'>
//                   {listing.amenities.map((a, i) => (
//                     <div key={i} className='flex items-center gap-2 text-gray-700'>
//                       <span className='text-lg'>{AMENITY_ICONS[a.toLowerCase()] || "✓"}</span>
//                       <span className='capitalize text-sm'>{a}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Map coords */}
//             {listing.latitude && listing.longitude && listing.latitude !== 0 && (
//               <div className='mb-6 pb-6 border-b border-gray-100'>
//                 <h2 className='text-xl font-semibold text-gray-800 mb-3'>Location</h2>
//                 <p className='text-sm text-gray-500 mb-2'>{listing.address || `${listing.landMark}, ${listing.city}`}</p>
//                 <a
//                   href={`https://maps.google.com/?q=${listing.latitude},${listing.longitude}`}
//                   target="_blank" rel="noreferrer"
//                   className='text-sm text-red-500 hover:underline'
//                 >
//                   View on Google Maps →
//                 </a>
//               </div>
//             )}

//             {/* Reviews */}
//             <div>
//               <h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
//                 <FaStar className='text-red-400' />
//                 {avgRating ? `${avgRating} · ${listing.ratingsCount} review${listing.ratingsCount !== 1 ? "s" : ""}` : "No reviews yet"}
//               </h2>

//               {/* Write a review */}
//               {userData && userBooking && (
//                 <div className='bg-gray-50 rounded-xl p-4 mb-6'>
//                   <p className='font-medium text-gray-800 mb-3'>Leave a review</p>
//                   <Star onRate={setReviewRating} value={reviewRating} />
//                   <textarea
//                     className='w-full mt-3 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none resize-none focus:border-red-300'
//                     rows={3} placeholder="Share your experience..."
//                     value={reviewText} onChange={e => setReviewText(e.target.value)}
//                   />
//                   <button
//                     className='mt-2 px-5 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 disabled:opacity-60'
//                     onClick={() => handleSubmitReview(userBooking._id)}
//                     disabled={submittingReview}
//                   >
//                     {submittingReview ? "Submitting..." : "Submit Review"}
//                   </button>
//                 </div>
//               )}

//               {reviews.length === 0
//                 ? <p className='text-gray-400 text-sm'>No reviews yet. Be the first!</p>
//                 : reviews.map(r => (
//                   <div key={r._id} className='mb-5 pb-5 border-b border-gray-100 last:border-0'>
//                     <div className='flex items-center gap-2 mb-1'>
//                       {r.user?.avatar
//                         ? <img src={r.user.avatar} className='w-8 h-8 rounded-full object-cover' alt="" />
//                         : <div className='w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs font-bold'>
//                             {r.user?.name?.charAt(0).toUpperCase()}
//                           </div>
//                       }
//                       <span className='font-medium text-sm text-gray-800'>{r.user?.name}</span>
//                       <span className='text-xs text-gray-400'>{new Date(r.createdAt).toLocaleDateString()}</span>
//                     </div>
//                     <Star value={r.rating} readOnly size="w-4 h-4" />
//                     <p className='text-sm text-gray-600 mt-1'>{r.comment}</p>
//                   </div>
//                 ))
//               }
//             </div>
//           </div>

//           {/* Right - Booking widget */}
//           {!isOwner && (
//             <div>
//               <div className='sticky top-8 bg-white border border-gray-200 rounded-2xl shadow-lg p-5'>
//                 <p className='text-xl font-bold text-gray-900 mb-4'>
//                   ₹{listing.rent} <span className='text-base font-normal text-gray-500'>/ night</span>
//                 </p>

//                 <div className='border border-gray-300 rounded-xl overflow-hidden mb-3'>
//                   <div className='grid grid-cols-2 divide-x divide-gray-300'>
//                     <div className='p-3'>
//                       <p className='text-xs font-semibold text-gray-700 uppercase'>Check-in</p>
//                       <input type="date" className='w-full text-sm outline-none mt-1'
//                         value={checkIn} min={new Date().toISOString().split("T")[0]}
//                         onChange={e => setCheckIn(e.target.value)} />
//                     </div>
//                     <div className='p-3'>
//                       <p className='text-xs font-semibold text-gray-700 uppercase'>Check-out</p>
//                       <input type="date" className='w-full text-sm outline-none mt-1'
//                         value={checkOut} min={checkIn || new Date().toISOString().split("T")[0]}
//                         onChange={e => setCheckOut(e.target.value)} />
//                     </div>
//                   </div>
//                   <div className='border-t border-gray-300 p-3'>
//                     <p className='text-xs font-semibold text-gray-700 uppercase mb-1'>Guests</p>
//                     <select className='w-full text-sm outline-none'
//                       value={guests} onChange={e => setGuests(Number(e.target.value))}>
//                       {Array.from({ length: listing.maxGuests || 1 }, (_, i) => i + 1).map(n => (
//                         <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Availability status */}
//                 {checkIn && checkOut && (
//                   <div className={`text-sm py-2 px-3 rounded-lg mb-3 ${checkingAvail ? "bg-gray-100 text-gray-500" : available ? "bg-green-50 text-green-700" : available === false ? "bg-red-50 text-red-600" : ""}`}>
//                     {checkingAvail ? "Checking availability..." : available ? "✓ Available for these dates" : available === false ? "✗ Not available for these dates" : ""}
//                   </div>
//                 )}

//                 {night > 0 && (
//                   <div className='space-y-2 mb-4 text-sm'>
//                     <div className='flex justify-between text-gray-700'>
//                       <span>₹{listing.rent} × {night} night{night > 1 ? "s" : ""}</span>
//                       <span>₹{total}</span>
//                     </div>
//                     <div className='flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100'>
//                       <span>Total</span>
//                       <span>₹{total}</span>
//                     </div>
//                   </div>
//                 )}

//                 <button
//                   className='w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed'
//                   disabled={!checkIn || !checkOut || available === false || booking || !night}
//                   onClick={() => handleBooking(listing._id)}
//                 >
//                   {booking ? "Booking..." : available === false ? "Not Available" : "Reserve"}
//                 </button>

//                 {night > 0 && <p className='text-center text-xs text-gray-400 mt-2'>You won't be charged yet</p>}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default ViewCard


import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaWifi, FaSwimmingPool, FaParking, FaSnowflake, FaTv, FaHeart, FaRegHeart } from 'react-icons/fa'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { MdKitchen, MdPets, MdLocalLaundryService, MdFireplace, MdOutlineBed, MdBathtub, MdFlag } from 'react-icons/md'
import { FiMapPin, FiUsers, FiCalendar, FiChevronLeft, FiChevronRight, FiShare2 } from 'react-icons/fi'
import { GiConfirmed } from 'react-icons/gi'
import { listingDataContext } from '../Context/ListingContext'
import { bookingDataContext } from '../Context/BookingContext'
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import { useTheme } from '../Context/ThemeContext'
import Star from '../Component/Star'
import Navbar from '../Component/layout/NavBar'
import Footer from '../Component/layout/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

const AMENITY_ICONS = {
  wifi:      <FaWifi />,
  pool:      <FaSwimmingPool />,
  parking:   <FaParking />,
  ac:        <FaSnowflake />,
  tv:        <FaTv />,
  kitchen:   <MdKitchen />,
  pets:      <MdPets />,
  laundry:   <MdLocalLaundryService />,
  fireplace: <MdFireplace />
}

function ViewCard() {
  const navigate = useNavigate()
  const { cardDetails, setCardDetails } = useContext(listingDataContext)
  const { checkIn, setCheckIn, checkOut, setCheckOut, total, setTotal, night, setNight, guests, setGuests, handleBooking, booking } = useContext(bookingDataContext)
  const { userData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { isDarkMode } = useTheme()

  const [imgIdx, setImgIdx] = useState(0)
  const [available, setAvailable] = useState(null)
  const [checkingAvail, setCheckingAvail] = useState(false)
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState(0)
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviews, setReviews] = useState([])
  const [showReport, setShowReport] = useState(false)
  const [reportReason, setReportReason] = useState("Misleading or inaccurate listing")
  const [reportDetails, setReportDetails] = useState("")
  const [reporting, setReporting] = useState(false)

  const listing = cardDetails


    // ✅ FIXED — anyone can view listing detail, no login required
  const handleClick = () => {
    handleViewCard(listing._id);
  };

  // ── ALL ORIGINAL LOGIC UNTOUCHED ─────────────────────────────
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

  const handleReport = async () => {
    if (!userData) { navigate("/login"); return }
    setReporting(true)
    try {
      await axios.post(
        serverUrl + `/api/report/listing/${listing._id}`,
        { reason: reportReason, details: reportDetails },
        { withCredentials: true }
      )
      setShowReport(false)
      setReportDetails("")
      toast.success("Report submitted for admin review")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not submit report")
    } finally {
      setReporting(false)
    }
  }

  const userBooking = userData?.booking?.find(b =>
    (b.listing?._id || b.listing) === listing?._id && b.status !== "cancelled"
  )

  if (!listing) return null

  const images = listing.images || []
  const avgRating = listing.ratings ? listing.ratings.toFixed(1) : null
  const isOwner = listing.host?._id === userData?._id || listing.host === userData?._id

  // Theme shortcuts
  const bg = isDarkMode ? "bg-[#0f172a]" : "bg-white"
  const card = isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
  const text = isDarkMode ? "text-white" : "text-gray-900"
  const subtext = isDarkMode ? "text-slate-400" : "text-gray-500"
  const border = isDarkMode ? "border-slate-700" : "border-gray-100"
  const inputBg = isDarkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-gray-300 text-gray-900"

  return (
    <div className={`min-h-screen ${bg}`}>
      <Navbar />

      <div className={`pt-[70px] md:pt-[80px]`}>
        <div className='max-w-[1100px] mx-auto px-4 md:px-6 py-8'>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className='w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center mb-6 transition-all duration-200'
          >
            <FaArrowLeftLong className='text-[#FF385C] w-4 h-4' />
          </button>

          {/* TITLE ROW */}
          <div className='flex items-start justify-between gap-4 mb-2'>
            <h1 className={`text-2xl md:text-3xl font-bold ${text} leading-tight`}>
              {listing.title}
            </h1>
            <div className='flex items-center gap-2 flex-shrink-0'>
              <button className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:bg-gray-50 ${isDarkMode ? "border-slate-600 text-slate-300 hover:bg-slate-800" : "border-gray-200 text-gray-600"}`}>
                <FiShare2 className='w-4 h-4' />
              </button>
              {!isOwner && (
                <button
                  onClick={() => setShowReport(p => !p)}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${isDarkMode ? "border-slate-600 text-red-400 hover:bg-slate-800" : "border-gray-200 text-red-400 hover:bg-red-50"}`}
                >
                  <MdFlag className='w-4 h-4' />
                </button>
              )}
            </div>
          </div>

          {/* SUBTITLE ROW */}
          <div className={`flex flex-wrap items-center gap-3 text-sm ${subtext} mb-6`}>
            {avgRating && (
              <span className='flex items-center gap-1'>
                <FaStar className='text-[#FF385C] w-3.5 h-3.5' />
                <span className='font-semibold text-gray-900 dark:text-white'>{avgRating}</span>
                <span>({listing.ratingsCount} review{listing.ratingsCount !== 1 ? "s" : ""})</span>
              </span>
            )}
            <span>·</span>
            <span className='flex items-center gap-1'>
              <FiMapPin className='w-3.5 h-3.5' />
              {listing.landMark}, {listing.city}
            </span>
          </div>

          {/* REPORT FORM */}
          {showReport && !isOwner && (
            <div className={`mb-6 rounded-2xl border p-5 ${isDarkMode ? "bg-slate-800 border-red-900/50" : "bg-red-50 border-red-100"}`}>
              <p className={`font-semibold mb-3 ${text}`}>Report this listing</p>
              <select
                className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none mb-3 ${inputBg}`}
                value={reportReason}
                onChange={e => setReportReason(e.target.value)}
              >
                <option>Misleading or inaccurate listing</option>
                <option>Unsafe or suspicious property</option>
                <option>Inappropriate images or content</option>
                <option>Spam or duplicate listing</option>
                <option>Other</option>
              </select>
              <textarea
                className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none resize-none ${inputBg}`}
                rows={3}
                placeholder='Add details for admin review'
                value={reportDetails}
                onChange={e => setReportDetails(e.target.value)}
              />
              <div className='flex gap-2 mt-3'>
                <button
                  className='px-5 py-2.5 bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-xl text-sm font-semibold disabled:opacity-60 transition-all'
                  onClick={handleReport}
                  disabled={reporting}
                >
                  {reporting ? "Submitting..." : "Submit report"}
                </button>
                <button
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${isDarkMode ? "border-slate-600 text-white hover:bg-slate-700" : "border-gray-200 text-gray-700 hover:bg-white"}`}
                  onClick={() => setShowReport(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* IMAGE GALLERY */}
          <div className={`relative rounded-3xl overflow-hidden mb-8 ${isDarkMode ? "bg-slate-800" : "bg-gray-100"}`}>
            {images.length > 0 ? (
              <div className='relative h-[320px] md:h-[480px]'>
                <img
                  src={images[imgIdx]}
                  alt={listing.title}
                  className='w-full h-full object-cover'
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                      className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white transition-all'
                    >
                      <FiChevronLeft className='w-5 h-5 text-gray-800' />
                    </button>
                    <button
                      onClick={() => setImgIdx(i => (i + 1) % images.length)}
                      className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white transition-all'
                    >
                      <FiChevronRight className='w-5 h-5 text-gray-800' />
                    </button>
                    <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5'>
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIdx(i)}
                          className={`rounded-full transition-all duration-300 ${i === imgIdx ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/60"}`}
                        />
                      ))}
                    </div>
                    <div className='absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full font-medium'>
                      {imgIdx + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className={`h-72 flex items-center justify-center ${subtext}`}>No photos available</div>
            )}
          </div>

          {/* MAIN CONTENT GRID */}
          <div className='grid md:grid-cols-[1fr_360px] gap-10'>

            {/* LEFT COLUMN */}
            <div>

              {/* HOST INFO */}
              <div className={`flex items-center gap-4 pb-6 mb-6 border-b ${border}`}>
                {listing.host?.avatar
                  ? <img src={listing.host.avatar} className='w-14 h-14 rounded-full object-cover ring-2 ring-red-50' alt="" />
                  : <div className='w-14 h-14 rounded-full bg-[#FF385C] text-white flex items-center justify-center font-bold text-xl flex-shrink-0'>
                      {listing.host?.name?.charAt(0).toUpperCase()}
                    </div>
                }
                <div>
                  <p className={`font-bold ${text}`}>Hosted by {listing.host?.name}</p>
                  <p className={`text-sm ${subtext}`}>
                    Member since {new Date(listing.host?.createdAt || listing.createdAt).getFullYear()}
                  </p>
                </div>
              </div>

              {/* PROPERTY DETAILS */}
              <div className={`flex flex-wrap gap-5 pb-6 mb-6 border-b ${border}`}>
                <div className={`flex items-center gap-2 text-sm ${subtext}`}>
                  <div className='w-9 h-9 rounded-full bg-red-50 flex items-center justify-center'>
                    <MdOutlineBed className='w-5 h-5 text-[#FF385C]' />
                  </div>
                  <span>{listing.bedrooms} bed{listing.bedrooms !== 1 ? "s" : ""}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${subtext}`}>
                  <div className='w-9 h-9 rounded-full bg-red-50 flex items-center justify-center'>
                    <MdBathtub className='w-5 h-5 text-[#FF385C]' />
                  </div>
                  <span>{listing.bathrooms} bath{listing.bathrooms !== 1 ? "s" : ""}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${subtext}`}>
                  <div className='w-9 h-9 rounded-full bg-red-50 flex items-center justify-center'>
                    <FiUsers className='w-5 h-5 text-[#FF385C]' />
                  </div>
                  <span>Up to {listing.maxGuests} guest{listing.maxGuests !== 1 ? "s" : ""}</span>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className={`pb-6 mb-6 border-b ${border}`}>
                <h2 className={`text-lg font-bold ${text} mb-3`}>About this place</h2>
                <p className={`leading-relaxed text-sm ${subtext}`}>{listing.description}</p>
              </div>

              {/* AMENITIES */}
              {listing.amenities && listing.amenities.length > 0 && (
                <div className={`pb-6 mb-6 border-b ${border}`}>
                  <h2 className={`text-lg font-bold ${text} mb-4`}>What this place offers</h2>
                  <div className='grid grid-cols-2 gap-3'>
                    {listing.amenities.map((a, i) => (
                      <div key={i} className={`flex items-center gap-3 text-sm ${subtext}`}>
                        <div className='w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#FF385C] flex-shrink-0'>
                          {AMENITY_ICONS[a.toLowerCase()] || "✓"}
                        </div>
                        <span className='capitalize'>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LOCATION
              {listing.latitude && listing.longitude && listing.latitude !== 0 && (
                <div className={`pb-6 mb-6 border-b ${border}`}>
                  <h2 className={`text-lg font-bold ${text} mb-2`}>Location</h2>
                  <p className={`text-sm ${subtext} mb-3`}>
                    {listing.address || `${listing.landMark}, ${listing.city}`}
                  </p>
                  
                    href={`https://maps.google.com/?q=${listing.latitude},${listing.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className='inline-flex items-center gap-2 text-sm font-semibold text-[#FF385C] hover:text-[#E31C5F] transition-colors'
                  >
                    <FiMapPin className='w-4 h-4' />
                    View on Google Maps →
                  </a>
                </div>
              )} */}

              {/* REVIEWS */}
              <div>
                <h2 className={`text-lg font-bold ${text} mb-4 flex items-center gap-2`}>
                  <FaStar className='text-[#FF385C]' />
                  {avgRating
                    ? `${avgRating} · ${listing.ratingsCount} review${listing.ratingsCount !== 1 ? "s" : ""}`
                    : "No reviews yet"}
                </h2>

                {/* WRITE REVIEW */}
                {userData && userBooking && (
                  <div className={`rounded-2xl border p-5 mb-6 ${card}`}>
                    <p className={`font-semibold mb-3 ${text}`}>Leave a review</p>
                    <Star onRate={setReviewRating} value={reviewRating} />
                    <textarea
                      className={`w-full mt-3 border rounded-xl px-4 py-3 text-sm outline-none resize-none focus:border-[#FF385C] transition-all ${inputBg}`}
                      rows={3}
                      placeholder="Share your experience..."
                      value={reviewText}
                      onChange={e => setReviewText(e.target.value)}
                    />
                    <button
                      className='mt-3 px-5 py-2.5 bg-[#FF385C] hover:bg-[#E31C5F] text-white text-sm font-semibold rounded-xl disabled:opacity-60 transition-all'
                      onClick={() => handleSubmitReview(userBooking._id)}
                      disabled={submittingReview}
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                )}

                {/* REVIEW LIST */}
                {reviews.length === 0 ? (
                  <p className={`text-sm ${subtext}`}>No reviews yet. Be the first!</p>
                ) : (
                  <div className='space-y-5'>
                    {reviews.map(r => (
                      <div key={r._id} className={`pb-5 border-b last:border-0 ${border}`}>
                        <div className='flex items-center gap-3 mb-2'>
                          {r.user?.avatar
                            ? <img src={r.user.avatar} className='w-9 h-9 rounded-full object-cover' alt="" />
                            : <div className='w-9 h-9 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs font-bold flex-shrink-0'>
                                {r.user?.name?.charAt(0).toUpperCase()}
                              </div>
                          }
                          <div>
                            <p className={`font-semibold text-sm ${text}`}>{r.user?.name}</p>
                            <p className={`text-xs ${subtext}`}>{new Date(r.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <Star value={r.rating} readOnly size="w-4 h-4" />
                        <p className={`text-sm mt-2 ${subtext}`}>{r.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN — BOOKING WIDGET */}
            {!isOwner && (
              <div>
                <div className={`sticky top-24 rounded-2xl border shadow-xl p-6 ${card}`}>

                  {/* PRICE */}
                  <div className='flex items-baseline gap-2 mb-5'>
                    <span className={`text-2xl font-bold ${text}`}>
                      ₹{listing.rent.toLocaleString("en-IN")}
                    </span>
                    <span className={`text-sm ${subtext}`}>/ night</span>
                    {avgRating && (
                      <span className={`ml-auto flex items-center gap-1 text-sm ${subtext}`}>
                        <FaStar className='text-[#FF385C] w-3.5 h-3.5' />
                        {avgRating}
                      </span>
                    )}
                  </div>

                  {/* DATE INPUTS */}
                  <div className={`border rounded-2xl overflow-hidden mb-3 ${isDarkMode ? "border-slate-600" : "border-gray-200"}`}>
                    <div className={`grid grid-cols-2 divide-x ${isDarkMode ? "divide-slate-600" : "divide-gray-200"}`}>
                      <div className='p-3'>
                        <p className={`text-[10px] font-bold uppercase tracking-wide mb-1 ${subtext}`}>Check-in</p>
                        <input
                          type="date"
                          className={`w-full text-sm outline-none bg-transparent ${text}`}
                          value={checkIn}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={e => setCheckIn(e.target.value)}
                        />
                      </div>
                      <div className='p-3'>
                        <p className={`text-[10px] font-bold uppercase tracking-wide mb-1 ${subtext}`}>Check-out</p>
                        <input
                          type="date"
                          className={`w-full text-sm outline-none bg-transparent ${text}`}
                          value={checkOut}
                          min={checkIn || new Date().toISOString().split("T")[0]}
                          onChange={e => setCheckOut(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className={`border-t p-3 ${isDarkMode ? "border-slate-600" : "border-gray-200"}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wide mb-1 ${subtext}`}>Guests</p>
                      <select
                        className={`w-full text-sm outline-none bg-transparent ${text}`}
                        value={guests}
                        onChange={e => setGuests(Number(e.target.value))}
                      >
                        {Array.from({ length: listing.maxGuests || 1 }, (_, i) => i + 1).map(n => (
                          <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* AVAILABILITY STATUS */}
                  {checkIn && checkOut && (
                    <div className={`text-sm py-2.5 px-4 rounded-xl mb-3 font-medium ${
                      checkingAvail
                        ? isDarkMode ? "bg-slate-700 text-slate-400" : "bg-gray-100 text-gray-500"
                        : available
                          ? "bg-green-50 text-green-700"
                          : available === false
                            ? "bg-red-50 text-red-600"
                            : ""
                    }`}>
                      {checkingAvail
                        ? "Checking availability..."
                        : available
                          ? "✓ Available for these dates"
                          : available === false
                            ? "✗ Not available for these dates"
                            : ""}
                    </div>
                  )}

                  {/* PRICE BREAKDOWN */}
                  {night > 0 && (
                    <div className={`space-y-2 mb-4 text-sm border-t pt-4 ${border}`}>
                      <div className={`flex justify-between ${subtext}`}>
                        <span>₹{listing.rent.toLocaleString("en-IN")} × {night} night{night > 1 ? "s" : ""}</span>
                        <span>₹{total.toLocaleString("en-IN")}</span>
                      </div>
                      <div className={`flex justify-between font-bold pt-2 border-t ${text} ${border}`}>
                        <span>Total</span>
                        <span>₹{total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  )}

                  {/* RESERVE BUTTON */}
                  <button
                    className='w-full py-3.5 bg-[#FF385C] hover:bg-[#E31C5F] text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg'
                    disabled={!checkIn || !checkOut || available === false || booking || !night}
                    onClick={() => {
                      if (!userData) { navigate("/login"); return }
                      handleBooking(listing._id)
                    }}
                  >
                    {booking ? "Booking..." : available === false ? "Not Available" : "Reserve"}
                  </button>

                  {/* LOGIN PROMPT */}
                  {!userData && (
                    <p className={`text-center text-xs mt-3 ${subtext}`}>
                      <span
                        className='text-[#FF385C] font-semibold cursor-pointer hover:underline'
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </span>
                      {" "}to complete your booking
                    </p>
                  )}

                  {night > 0 && userData && (
                    <p className={`text-center text-xs mt-2 ${subtext}`}>You won't be charged yet</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ViewCard
