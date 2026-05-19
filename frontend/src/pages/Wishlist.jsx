// // import React, { useContext } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import { FaArrowLeftLong } from "react-icons/fa6"
// // import { userDataContext } from '../Context/UserContext'
// // import NavBar from '../Component/layout/NavBar'
// // import Footer from '../Component/layout/Footer'
// // import Card from '../Component/Card'

// // function Wishlist() {
// //   const navigate = useNavigate()
// //   const { userData } = useContext(userDataContext)
// //   const wishlist = userData?.wishlist || []

// //   return (
// //     <div className='min-h-screen bg-gray-50 px-4 py-8 md:px-10'>
// //       <NavBar />
// //       <div className='max-w-5xl mx-auto'>
// //         <div className='flex items-center gap-4 mb-8'>
// //           <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/")}>
// //             <FaArrowLeftLong className='text-white w-4 h-4' />
// //           </button>
// //           <h1 className='text-2xl font-bold text-gray-800'>Wishlist</h1>
// //         </div>

// //         {wishlist.length === 0 ? (
// //           <div className='text-center py-20'>
// //             <p className='text-4xl mb-4'>❤️</p>
// //             <p className='text-xl text-gray-400 mb-2'>No saved listings</p>
// //             <p className='text-gray-400 text-sm mb-6'>Tap the heart on any listing to save it here</p>
// //             <button className='px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600' onClick={() => navigate("/")}>Explore listings</button>
// //           </div>
// //         ) : (
// //           <div className='flex flex-wrap gap-6 justify-center'>
// //             {wishlist.map(l => <Card key={l._id} listing={l} />)}
// //           </div>
// //         )}
// //       </div>
// //       <Footer />
// //     </div>
// //   )
// // }

// // export default Wishlist


// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   FaArrowLeftLong,
// } from "react-icons/fa6";

// import {
//   FiHeart,
//   FiGrid,
//   FiList,
//   FiShare2,
// } from "react-icons/fi";

// import { userDataContext } from "../Context/UserContext";

// import NavBar from "../Component/layout/NavBar";
// import Footer from "../Component/layout/Footer";
// import Card from "../Component/Card";

// function Wishlist() {

//   const navigate = useNavigate();

//   const { userData } =
//     useContext(userDataContext);

//   const wishlist =
//     userData?.wishlist || [];

//   /*
//     ONLY UI STATE
//     NO LOGIC CHANGED
//   */

//   const [gridView, setGridView] =
//     useState(true);

//   return (
//     <div
//       className="
//         min-h-screen
//         bg-[#FAFAFA]
//       "
//     >
//       {/* NAVBAR */}

//       <NavBar />

//       {/* MAIN */}

//       <div
//         className="
//           pt-10
//           pb-16
//           px-4
//           md:px-8
//           lg:px-10
//           max-w-[1600px]
//           mx-auto
//         "
//       >
//         {/* TOP HEADER */}

//         <div
//           className="
//             flex
//             flex-col
//             md:flex-row
//             md:items-center
//             md:justify-between
//             gap-6
//             mb-10
//           "
//         >
//           {/* LEFT */}

//           <div
//             className="
//               flex
//               items-start
//               gap-5
//             "
//           >
//             {/* BACK BUTTON */}

//             <button
//               onClick={() => navigate("/")}
//               className="
//                 w-14
//                 h-14
//                 rounded-full
//                 bg-[#FFF1F2]
//                 flex
//                 items-center
//                 justify-center
//                 hover:scale-105
//                 transition-all
//                 duration-300
//               "
//             >
//               <FaArrowLeftLong
//                 className="
//                   w-5
//                   h-5
//                   text-[#FF385C]
//                 "
//               />
//             </button>

//             {/* TITLE */}

//             <div>
//               <div
//                 className="
//                   flex
//                   items-center
//                   gap-3
//                 "
//               >
//                 <h1
//                   className="
//                     text-[42px]
//                     leading-none
//                     font-[800]
//                     tracking-[-2px]
//                     text-slate-900
//                   "
//                 >
//                   Wishlist
//                 </h1>

//                 <div
//                   className="
//                     w-12
//                     h-12
//                     rounded-full
//                     bg-[#FFF1F2]
//                     flex
//                     items-center
//                     justify-center
//                   "
//                 >
//                   <FiHeart
//                     className="
//                       w-5
//                       h-5
//                       text-[#FF385C]
//                       fill-[#FF385C]
//                     "
//                   />
//                 </div>
//               </div>

//               <p
//                 className="
//                   mt-2
//                   text-[17px]
//                   text-slate-500
//                 "
//               >
//                 {wishlist.length} places saved
//               </p>
//             </div>
//           </div>

//           {/* RIGHT */}

//           {wishlist.length > 0 && (
//             <div
//               className="
//                 flex
//                 items-center
//                 gap-4
//               "
//             >
//               {/* SHARE */}

//               <button
//                 className="
//                   h-14
//                   px-6
//                   rounded-full
//                   border
//                   border-slate-200
//                   bg-white
//                   flex
//                   items-center
//                   gap-3
//                   text-[16px]
//                   font-semibold
//                   text-slate-800
//                   hover:shadow-md
//                   transition-all
//                   duration-300
//                 "
//               >
//                 <FiShare2 className="w-5 h-5" />

//                 Share Wishlist
//               </button>

//               {/* VIEW TOGGLE */}

//               <div
//                 className="
//                   h-14
//                   p-1
//                   rounded-full
//                   border
//                   border-slate-200
//                   bg-white
//                   flex
//                   items-center
//                   gap-1
//                 "
//               >
//                 <button
//                   onClick={() =>
//                     setGridView(true)
//                   }
//                   className={`
//                     w-12
//                     h-12
//                     rounded-full
//                     flex
//                     items-center
//                     justify-center
//                     transition-all
//                     duration-300

//                     ${
//                       gridView
//                         ? `
//                           bg-[#FFF1F2]
//                           text-[#FF385C]
//                         `
//                         : `
//                           text-slate-500
//                         `
//                     }
//                   `}
//                 >
//                   <FiGrid className="w-5 h-5" />
//                 </button>

//                 <button
//                   onClick={() =>
//                     setGridView(false)
//                   }
//                   className={`
//                     w-12
//                     h-12
//                     rounded-full
//                     flex
//                     items-center
//                     justify-center
//                     transition-all
//                     duration-300

//                     ${
//                       !gridView
//                         ? `
//                           bg-[#FFF1F2]
//                           text-[#FF385C]
//                         `
//                         : `
//                           text-slate-500
//                         `
//                     }
//                   `}
//                 >
//                   <FiList className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* EMPTY STATE */}

//         {wishlist.length === 0 ? (

//           <div
//             className="
//               flex
//               flex-col
//               items-center
//               justify-center
//               py-24
//             "
//           >
//             <div
//               className="
//                 w-24
//                 h-24
//                 rounded-full
//                 bg-[#FFF1F2]
//                 flex
//                 items-center
//                 justify-center
//                 mb-6
//               "
//             >
//               <FiHeart
//                 className="
//                   w-10
//                   h-10
//                   text-[#FF385C]
//                 "
//               />
//             </div>

//             <h2
//               className="
//                 text-[34px]
//                 font-[800]
//                 tracking-[-1px]
//                 text-slate-900
//               "
//             >
//               No saved listings
//             </h2>

//             <p
//               className="
//                 mt-3
//                 text-[17px]
//                 text-slate-500
//                 text-center
//                 max-w-md
//                 leading-relaxed
//               "
//             >
//               Tap the heart icon on any
//               property to save your
//               favorite stays here.
//             </p>

//             <button
//               onClick={() =>
//                 navigate("/")
//               }
//               className="
//                 mt-8
//                 h-14
//                 px-8
//                 rounded-2xl
//                 bg-[#FF385C]
//                 hover:bg-[#E31C5F]
//                 text-white
//                 text-[15px]
//                 font-semibold
//                 shadow-lg
//                 hover:shadow-xl
//                 transition-all
//                 duration-300
//               "
//             >
//               Explore Listings
//             </button>
//           </div>

//         ) : (

//           <>
//             {/* GRID */}

//             <div
//               className={`
//                 grid
//                 gap-7

//                 ${
//                   gridView
//                     ? `
//                       grid-cols-1
//                       sm:grid-cols-2
//                       lg:grid-cols-3
//                       xl:grid-cols-5
//                     `
//                     : `
//                       grid-cols-1
//                     `
//                 }
//               `}
//             >
//               {wishlist.map(listing => (

//                 <Card
//                   key={listing._id}
//                   listing={listing}
//                 />

//               ))}
//             </div>

//             {/* FOOTER INFO */}

//             <div
//               className="
//                 flex
//                 items-center
//                 justify-center
//                 mt-14
//               "
//             >
//               <p
//                 className="
//                   text-[16px]
//                   text-slate-500
//                 "
//               >
//                 Showing{" "}
//                 <span
//                   className="
//                     font-semibold
//                     text-slate-800
//                   "
//                 >
//                   {wishlist.length}
//                 </span>{" "}
//                 of{" "}
//                 <span
//                   className="
//                     font-semibold
//                     text-slate-800
//                   "
//                 >
//                   {wishlist.length}
//                 </span>{" "}
//                 places
//               </p>
//             </div>

//             {/* PAGINATION UI */}

//             <div
//               className="
//                 flex
//                 items-center
//                 justify-center
//                 gap-3
//                 mt-6
//               "
//             >
//               <button
//                 className="
//                   w-12
//                   h-12
//                   rounded-2xl
//                   border
//                   border-slate-200
//                   bg-white
//                   text-slate-400
//                   flex
//                   items-center
//                   justify-center
//                 "
//               >
//                 ←
//               </button>

//               <button
//                 className="
//                   w-12
//                   h-12
//                   rounded-2xl
//                   bg-[#FFF1F2]
//                   text-[#FF385C]
//                   font-semibold
//                 "
//               >
//                 1
//               </button>

//               <button
//                 className="
//                   w-12
//                   h-12
//                   rounded-2xl
//                   border
//                   border-slate-200
//                   bg-white
//                   text-slate-500
//                   flex
//                   items-center
//                   justify-center
//                 "
//               >
//                 →
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* FOOTER */}

//       <Footer />
//     </div>
//   );
// }

// export default Wishlist;

import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { FaHeart, FaRegHeart, FaStar, FaWifi } from "react-icons/fa"
import { FiShare2, FiGrid, FiList, FiMapPin } from "react-icons/fi"
import { MdOutlineBed, MdBathtub } from "react-icons/md"
import { HiUsers } from "react-icons/hi"
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import { listingDataContext } from '../Context/ListingContext'
import { useTheme } from '../Context/ThemeContext'
import Navbar from '../Component/layout/NavBar'
import Footer from '../Component/layout/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

const PAGE_SIZE = 10

function WishlistCard({ listing, onRemove, isDarkMode }) {
  const { handleViewCard } = useContext(listingDataContext)
  const [imgIdx, setImgIdx] = useState(0)

  const images = listing.images || []
  const avgRating = listing.ratings ? listing.ratings.toFixed(1) : null

  const card = isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"
  const text = isDarkMode ? "text-white" : "text-gray-900"
  const subtext = isDarkMode ? "text-slate-400" : "text-gray-500"

  return (
    <div
      className={`rounded-2xl border overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${card}`}
      onClick={() => handleViewCard(listing._id)}
    >
      {/* IMAGE */}
      <div className="relative h-[200px] overflow-hidden bg-gray-100 dark:bg-slate-700">
        {images.length > 0 ? (
          <img
            src={images[imgIdx]}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">No photo</div>
        )}

        {/* HEART BUTTON */}
        <button
          onClick={e => { e.stopPropagation(); onRemove(listing._id) }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-all duration-200"
        >
          <FaHeart className="w-4 h-4 text-[#FF385C]" />
        </button>

        {/* IMAGE DOTS */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
            {images.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setImgIdx(i) }}
                className={`rounded-full transition-all duration-200 ${
                  i === imgIdx ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* TITLE */}
        <h3 className={`text-sm font-bold truncate mb-1 ${text}`}>{listing.title}</h3>

        {/* LOCATION */}
        <div className={`flex items-center gap-1 text-xs mb-3 ${subtext}`}>
          <FiMapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{listing.landMark}, {listing.city}</span>
        </div>

        {/* DETAILS ROW */}
        <div className={`flex items-center gap-3 text-xs mb-3 flex-wrap ${subtext}`}>
          {listing.bedrooms && (
            <span className="flex items-center gap-1">
              <MdOutlineBed className="w-3.5 h-3.5" />
              {listing.bedrooms} Bed{listing.bedrooms !== 1 ? "s" : ""}
            </span>
          )}
          {listing.bathrooms && (
            <span className="flex items-center gap-1">
              <MdBathtub className="w-3.5 h-3.5" />
              {listing.bathrooms} Bath{listing.bathrooms !== 1 ? "s" : ""}
            </span>
          )}
          {listing.maxGuests && (
            <span className="flex items-center gap-1">
              <HiUsers className="w-3.5 h-3.5" />
              {listing.maxGuests} Guests
            </span>
          )}
          {listing.amenities?.includes("wifi") && (
            <FaWifi className="w-3.5 h-3.5" />
          )}
        </div>

        {/* PRICE + BADGE */}
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-base font-bold ${text}`}>
              ₹{listing.rent?.toLocaleString("en-IN")}
            </span>
            <span className={`text-xs ${subtext}`}> / night</span>
          </div>
          {!avgRating && (
            <div className="flex items-center gap-1 bg-red-50 text-[#FF385C] text-xs font-bold px-2.5 py-1 rounded-full">
              <FaStar className="w-3 h-3" />
              New
            </div>
          )}
          {avgRating && (
            <div className={`flex items-center gap-1 text-xs font-medium ${subtext}`}>
              <FaStar className="w-3 h-3 text-[#FF385C]" />
              {avgRating}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Wishlist() {
  const navigate = useNavigate()
  const { userData, getCurrentUser } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { isDarkMode } = useTheme()

  const [viewMode, setViewMode] = useState("grid")
  const [page, setPage] = useState(1)

  const wishlist = userData?.wishlist || []
  const totalPages = Math.ceil(wishlist.length / PAGE_SIZE)
  const paginatedWishlist = wishlist.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleRemove = async (listingId) => {
    try {
      await axios.post(
        serverUrl + `/api/wishlist/toggle/${listingId}`,
        {},
        { withCredentials: true }
      )
      await getCurrentUser()
      toast.success("Removed from wishlist")
    } catch (err) {
      toast.error("Could not update wishlist")
    }
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  // Theme shortcuts
  const bg = isDarkMode ? "bg-[#0f172a]" : "bg-gray-50"
  const text = isDarkMode ? "text-white" : "text-gray-900"
  const subtext = isDarkMode ? "text-slate-400" : "text-gray-500"
  const btnBorder = isDarkMode ? "border-slate-700 text-slate-300 hover:bg-slate-800" : "border-gray-200 text-gray-700 hover:bg-gray-50"

  return (
    <div className={`min-h-screen ${bg}`}>
      <Navbar />

      <div className="pt-[70px] md:pt-[80px]">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6 py-8">

          {/* HEADER */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all duration-200 flex-shrink-0"
              >
                <FaArrowLeftLong className="text-[#FF385C] w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className={`text-2xl font-bold ${text}`}>Wishlist</h1>
                  <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                    <FaHeart className="w-4 h-4 text-[#FF385C]" />
                  </div>
                </div>
                <p className={`text-sm mt-0.5 ${subtext}`}>
                  {wishlist.length} place{wishlist.length !== 1 ? "s" : ""} saved
                </p>
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            {wishlist.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className={`flex items-center gap-2 h-10 px-4 rounded-xl border text-sm font-medium transition-all duration-200 ${btnBorder}`}
                >
                  <FiShare2 className="w-4 h-4" />
                  Share Wishlist
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                    viewMode === "grid"
                      ? "border-[#FF385C] bg-red-50 text-[#FF385C]"
                      : btnBorder
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                    viewMode === "list"
                      ? "border-[#FF385C] bg-red-50 text-[#FF385C]"
                      : btnBorder
                  }`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* EMPTY STATE */}
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isDarkMode ? "bg-slate-800" : "bg-red-50"}`}>
                <FaRegHeart className="w-9 h-9 text-[#FF385C]" />
              </div>
              <p className={`text-xl font-semibold ${text}`}>No saved listings</p>
              <p className={`text-sm ${subtext}`}>Tap the heart on any listing to save it here</p>
              <button
                onClick={() => navigate("/")}
                className="mt-2 h-11 px-6 rounded-xl bg-[#FF385C] hover:bg-[#E31C5F] text-white text-sm font-semibold transition-all shadow-md"
              >
                Explore listings
              </button>
            </div>

          ) : (
            <>
              {/* GRID VIEW */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  {paginatedWishlist.map(l => (
                    <WishlistCard
                      key={l._id}
                      listing={l}
                      onRemove={handleRemove}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </div>
              )}

              {/* LIST VIEW */}
              {viewMode === "list" && (
                <div className="flex flex-col gap-4">
                  {paginatedWishlist.map(l => (
                    <div
                      key={l._id}
                      onClick={() => {}}
                      className={`rounded-2xl border flex gap-4 overflow-hidden transition-all duration-300 hover:shadow-md ${
                        isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"
                      }`}
                    >
                      <div className="relative w-48 h-36 flex-shrink-0">
                        {l.images?.[0] && (
                          <img src={l.images[0]} alt={l.title} className="w-full h-full object-cover" />
                        )}
                        <button
                          onClick={e => { e.stopPropagation(); handleRemove(l._id) }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md"
                        >
                          <FaHeart className="w-3.5 h-3.5 text-[#FF385C]" />
                        </button>
                      </div>
                      <div className="flex-1 py-4 pr-4">
                        <h3 className={`text-sm font-bold mb-1 ${text}`}>{l.title}</h3>
                        <div className={`flex items-center gap-1 text-xs mb-2 ${subtext}`}>
                          <FiMapPin className="w-3 h-3" />
                          {l.landMark}, {l.city}
                        </div>
                        <div className={`flex items-center gap-3 text-xs mb-3 ${subtext}`}>
                          {l.bedrooms && <span className="flex items-center gap-1"><MdOutlineBed className="w-3.5 h-3.5" />{l.bedrooms} Beds</span>}
                          {l.bathrooms && <span className="flex items-center gap-1"><MdBathtub className="w-3.5 h-3.5" />{l.bathrooms} Baths</span>}
                          {l.maxGuests && <span className="flex items-center gap-1"><HiUsers className="w-3.5 h-3.5" />{l.maxGuests} Guests</span>}
                        </div>
                        <p className={`text-base font-bold ${text}`}>
                          ₹{l.rent?.toLocaleString("en-IN")}
                          <span className={`text-xs font-normal ${subtext}`}> / night</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* PAGINATION */}
              <div className="flex flex-col items-center gap-4 mt-10">
                <p className={`text-sm ${subtext}`}>
                  Showing {Math.min(page * PAGE_SIZE, wishlist.length)} of {wishlist.length} places
                </p>
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(p - 1, 1))}
                      disabled={page === 1}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                        page === 1
                          ? isDarkMode ? "border-slate-700 text-slate-600 cursor-not-allowed" : "border-gray-100 text-gray-300 cursor-not-allowed"
                          : isDarkMode ? "border-slate-600 text-white hover:bg-slate-800" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      ‹
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${
                          p === page
                            ? "bg-[#FF385C] text-white"
                            : isDarkMode ? "border border-slate-700 text-slate-300 hover:bg-slate-800" : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                      disabled={page === totalPages}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                        page === totalPages
                          ? isDarkMode ? "border-slate-700 text-slate-600 cursor-not-allowed" : "border-gray-100 text-gray-300 cursor-not-allowed"
                          : isDarkMode ? "border-slate-600 text-white hover:bg-slate-800" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Wishlist