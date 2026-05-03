import React, { useContext } from 'react'
import { FaTimes } from "react-icons/fa"
import { FaArrowLeftLong } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../Context/ListingContext'
import { toast } from 'react-toastify'

const AMENITY_LIST = ["wifi", "pool", "parking", "ac", "tv", "kitchen", "pets", "laundry", "fireplace"]
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"]

function ListingPage1() {
  const navigate = useNavigate()
  const {
    title, setTitle, description, setDescription,
    rent, setRent, city, setCity, landmark, setLandmark, address, setAddress,
    maxGuests, setMaxGuests, bedrooms, setBedrooms, bathrooms, setBathrooms,
    amenities, setAmenities, latitude, setLatitude, longitude, setLongitude,
    imageFiles, setImageFiles, imagePreviews, setImagePreviews,
  } = useContext(listingDataContext)

  const handleImages = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter(file => ALLOWED_IMAGE_TYPES.includes(file.type))
    const rejectedCount = files.length - validFiles.length

    if (rejectedCount > 0) {
      toast.error("Only JPEG, PNG, WebP, and AVIF images are allowed")
    }

    const newFiles = [...imageFiles, ...validFiles].slice(0, 10)
    if (imageFiles.length + validFiles.length > 10) {
      toast.info("You can upload up to 10 photos")
    }

    setImageFiles(newFiles)
    setImagePreviews(newFiles.map(f => URL.createObjectURL(f)))
    e.target.value = ""
  }

  const removeImage = (idx) => {
    const f = imageFiles.filter((_, i) => i !== idx)
    setImageFiles(f)
    setImagePreviews(f.map(file => URL.createObjectURL(file)))
  }

  const toggleAmenity = (a) => {
    setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])
  }

  const isValid = title && description && rent && city && landmark && imageFiles.length > 0

  return (
    <div className='min-h-screen bg-white px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/")}>
            <FaArrowLeftLong className='text-white w-4 h-4' />
          </button>
          <h1 className='text-2xl font-bold text-gray-800'>Setup your listing</h1>
          <span className='ml-auto text-sm text-gray-400'>Step 1 of 3</span>
        </div>

        <div className='space-y-5'>
          <Field label="Title" required>
            <input type="text" className={input} placeholder="e.g. 2BHK near beach" value={title} onChange={e => setTitle(e.target.value)} required />
          </Field>

          <Field label="Description" required>
            <textarea className={`${input} resize-none`} rows={4} placeholder="Describe your place..." value={description} onChange={e => setDescription(e.target.value)} />
          </Field>

          <div className='grid grid-cols-2 gap-4'>
            <Field label="City" required>
              <input type="text" className={input} placeholder="Mumbai" value={city} onChange={e => setCity(e.target.value)} />
            </Field>
            <Field label="Landmark" required>
              <input type="text" className={input} placeholder="Near Gateway" value={landmark} onChange={e => setLandmark(e.target.value)} />
            </Field>
          </div>

          <Field label="Full Address">
            <input type="text" className={input} placeholder="Street address (optional)" value={address} onChange={e => setAddress(e.target.value)} />
          </Field>

          <Field label="Rent per night (₹)" required>
            <input type="number" min="1" className={input} placeholder="2000" value={rent} onChange={e => setRent(e.target.value)} />
          </Field>

          <div className='grid grid-cols-3 gap-4'>
            <Field label="Max Guests">
              <input type="number" min="1" max="20" className={input} value={maxGuests} onChange={e => setMaxGuests(Number(e.target.value))} />
            </Field>
            <Field label="Bedrooms">
              <input type="number" min="1" max="20" className={input} value={bedrooms} onChange={e => setBedrooms(Number(e.target.value))} />
            </Field>
            <Field label="Bathrooms">
              <input type="number" min="1" max="10" className={input} value={bathrooms} onChange={e => setBathrooms(Number(e.target.value))} />
            </Field>
          </div>

          <Field label="Amenities">
            <div className='flex flex-wrap gap-2 mt-1'>
              {AMENITY_LIST.map(a => (
                <button key={a} type="button"
                  className={`px-3 py-1.5 rounded-full text-sm border capitalize transition ${amenities.includes(a) ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"}`}
                  onClick={() => toggleAmenity(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </Field>

          <div className='grid grid-cols-2 gap-4'>
            <Field label="Latitude (optional)">
              <input type="number" step="any" className={input} placeholder="28.6139" value={latitude} onChange={e => setLatitude(e.target.value)} />
            </Field>
            <Field label="Longitude (optional)">
              <input type="number" step="any" className={input} placeholder="77.2090" value={longitude} onChange={e => setLongitude(e.target.value)} />
            </Field>
          </div>

          <Field label={`Photos (${imageFiles.length}/10)`} required>
            <div className='border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-red-400 transition cursor-pointer' onClick={() => document.getElementById("imgInput").click()}>
              <p className='text-gray-500 text-sm'>Click to upload photos (max 10)</p>
              <p className='text-gray-400 text-xs mt-1'>JPEG, PNG, WebP, AVIF - max 5MB each</p>
              <input id="imgInput" type="file" accept="image/*" multiple className='hidden' onChange={handleImages} />
            </div>
            {imagePreviews.length > 0 && (
              <div className='flex gap-2 flex-wrap mt-3'>
                {imagePreviews.map((url, i) => (
                  <div key={i} className='relative w-20 h-20 rounded-lg overflow-hidden'>
                    <img src={url} className='w-full h-full object-cover' alt="" />
                    <button
                      type="button"
                      className='absolute top-0.5 right-0.5 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center'
                      onClick={() => removeImage(i)}
                    >
                      <FaTimes className='text-white w-2.5 h-2.5' />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Field>
        </div>

        <button
          className='w-full mt-8 py-3.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl disabled:opacity-50 transition'
          disabled={!isValid}
          onClick={() => navigate("/listingpage2")}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

const input = "w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-base outline-none focus:border-red-400 transition"

function Field({ label, children, required }) {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-1'>{label}{required && <span className='text-red-500 ml-0.5'>*</span>}</label>
      {children}
    </div>
  )
}

export default ListingPage1
