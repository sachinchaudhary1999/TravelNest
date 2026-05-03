import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../Context/ListingContext'
import { FaStar } from 'react-icons/fa'

function ListingPage3() {
  const navigate = useNavigate()
  const { title, description, rent, city, landmark, category, maxGuests, bedrooms, bathrooms, amenities, imagePreviews, handleAddListing, adding } = useContext(listingDataContext)

  return (
    <div className='min-h-screen bg-white px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/listingpage2")}>
            <FaArrowLeftLong className='text-white w-4 h-4' />
          </button>
          <h1 className='text-2xl font-bold text-gray-800'>Preview your listing</h1>
          <span className='ml-auto text-sm text-gray-400'>Step 3 of 3</span>
        </div>

        {/* Image preview */}
        {imagePreviews.length > 0 && (
          <div className='grid grid-cols-3 gap-2 mb-6 rounded-2xl overflow-hidden'>
            {imagePreviews.slice(0, 3).map((url, i) => (
              <img key={i} src={url} className='w-full h-32 object-cover' alt="" />
            ))}
          </div>
        )}

        {/* Info */}
        <div className='bg-gray-50 rounded-2xl p-5 mb-6 space-y-3'>
          <h2 className='text-xl font-bold text-gray-900'>{title}</h2>
          <p className='text-sm text-gray-500'>{landmark}, {city} · <span className='capitalize'>{category}</span></p>
          <div className='flex gap-4 text-sm text-gray-600'>
            <span>👥 {maxGuests} guests</span>
            <span>🛏 {bedrooms} bedrooms</span>
            <span>🚿 {bathrooms} bathrooms</span>
          </div>
          <p className='text-gray-700 text-sm'>{description}</p>
          {amenities.length > 0 && (
            <div className='flex gap-2 flex-wrap'>
              {amenities.map(a => <span key={a} className='bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full capitalize'>{a}</span>)}
            </div>
          )}
          <p className='text-xl font-bold text-gray-900 mt-2'>₹{rent} <span className='text-base font-normal text-gray-500'>/ night</span></p>
        </div>

        <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800'>
          <strong>Looks good?</strong> Once published, guests can discover and book your listing.
        </div>

        <button
          className='w-full py-3.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl disabled:opacity-50 transition'
          onClick={handleAddListing}
          disabled={adding}
        >
          {adding ? "Publishing..." : "Publish Listing 🎉"}
        </button>
      </div>
    </div>
  )
}

export default ListingPage3
