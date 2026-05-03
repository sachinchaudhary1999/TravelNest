import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaTimes } from "react-icons/fa"
import { FaArrowLeftLong } from "react-icons/fa6"
import axios from 'axios'
import { toast } from 'react-toastify'
import { authDataContext } from '../Context/AuthContext'
import { userDataContext } from '../Context/UserContext'

const AMENITY_LIST = ["wifi", "pool", "parking", "ac", "tv", "kitchen", "pets", "laundry", "fireplace"]
const CATEGORY_LIST = ["villa", "farmHouse", "poolHouse", "rooms", "flat", "pg", "cabin", "shops"]
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"]

function EditListing() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { userData, getCurrentUser } = useContext(userDataContext)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [listing, setListing] = useState(null)
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [form, setForm] = useState({
    title: "",
    description: "",
    rent: "",
    city: "",
    landMark: "",
    address: "",
    category: "",
    maxGuests: 1,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    latitude: "",
    longitude: "",
  })

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const toggleAmenity = (amenity) => {
    updateField("amenities", form.amenities.includes(amenity)
      ? form.amenities.filter(item => item !== amenity)
      : [...form.amenities, amenity]
    )
  }

  const handleImages = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter(file => ALLOWED_IMAGE_TYPES.includes(file.type))
    const rejectedCount = files.length - validFiles.length

    if (rejectedCount > 0) {
      toast.error("Only JPEG, PNG, WebP, and AVIF images are allowed")
    }
    if (validFiles.length > 10) {
      toast.info("You can upload up to 10 photos")
    }

    const limitedFiles = validFiles.slice(0, 10)
    setImageFiles(limitedFiles)
    setImagePreviews(limitedFiles.map(file => URL.createObjectURL(file)))
    e.target.value = ""
  }

  const removeImage = (idx) => {
    const files = imageFiles.filter((_, i) => i !== idx)
    setImageFiles(files)
    setImagePreviews(files.map(file => URL.createObjectURL(file)))
  }

  const loadListing = async () => {
    setLoading(true)
    try {
      const result = await axios.get(serverUrl + `/api/listing/findlistingbyid/${id}`, { withCredentials: true })
      const data = result.data
      const ownerId = data.host?._id || data.host
      if (ownerId !== userData?._id) {
        toast.error("You can only edit your own listing")
        navigate("/mylisting")
        return
      }
      setListing(data)
      setForm({
        title: data.title || "",
        description: data.description || "",
        rent: data.rent || "",
        city: data.city || "",
        landMark: data.landMark || "",
        address: data.address || "",
        category: data.category || "",
        maxGuests: data.maxGuests || 1,
        bedrooms: data.bedrooms || 1,
        bathrooms: data.bathrooms || 1,
        amenities: data.amenities || [],
        latitude: data.latitude || "",
        longitude: data.longitude || "",
      })
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load listing")
      navigate("/mylisting")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (key === "amenities") value.forEach(amenity => formData.append("amenities", amenity))
        else formData.append(key, value)
      })
      imageFiles.forEach(file => formData.append("images", file))

      await axios.put(serverUrl + `/api/listing/update/${id}`, formData, { withCredentials: true })
      await getCurrentUser()
      toast.success("Listing updated")
      navigate("/mylisting")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update listing")
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (userData) loadListing()
  }, [id, userData?._id])

  if (loading) return <div className='min-h-screen flex items-center justify-center text-gray-400'>Loading listing...</div>

  return (
    <div className='min-h-screen bg-white px-4 py-8'>
      <form onSubmit={handleSubmit} className='max-w-2xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <button type='button' className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/mylisting")}>
            <FaArrowLeftLong className='text-white w-4 h-4' />
          </button>
          <h1 className='text-2xl font-bold text-gray-800'>Edit listing</h1>
        </div>

        <div className='space-y-5'>
          <Field label="Title" required>
            <input className={input} value={form.title} onChange={e => updateField("title", e.target.value)} required />
          </Field>

          <Field label="Description" required>
            <textarea className={`${input} resize-none`} rows={4} value={form.description} onChange={e => updateField("description", e.target.value)} required />
          </Field>

          <div className='grid grid-cols-2 gap-4'>
            <Field label="City" required>
              <input className={input} value={form.city} onChange={e => updateField("city", e.target.value)} required />
            </Field>
            <Field label="Landmark" required>
              <input className={input} value={form.landMark} onChange={e => updateField("landMark", e.target.value)} required />
            </Field>
          </div>

          <Field label="Full Address">
            <input className={input} value={form.address} onChange={e => updateField("address", e.target.value)} />
          </Field>

          <div className='grid grid-cols-2 gap-4'>
            <Field label="Rent per night" required>
              <input type='number' min='1' className={input} value={form.rent} onChange={e => updateField("rent", e.target.value)} required />
            </Field>
            <Field label="Category" required>
              <select className={input} value={form.category} onChange={e => updateField("category", e.target.value)} required>
                <option value="">Choose category</option>
                {CATEGORY_LIST.map(category => <option key={category} value={category}>{category}</option>)}
              </select>
            </Field>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <Field label="Max Guests">
              <input type='number' min='1' className={input} value={form.maxGuests} onChange={e => updateField("maxGuests", e.target.value)} />
            </Field>
            <Field label="Bedrooms">
              <input type='number' min='1' className={input} value={form.bedrooms} onChange={e => updateField("bedrooms", e.target.value)} />
            </Field>
            <Field label="Bathrooms">
              <input type='number' min='1' className={input} value={form.bathrooms} onChange={e => updateField("bathrooms", e.target.value)} />
            </Field>
          </div>

          <Field label="Amenities">
            <div className='flex flex-wrap gap-2'>
              {AMENITY_LIST.map(amenity => (
                <button
                  key={amenity}
                  type='button'
                  className={`px-3 py-1.5 rounded-full text-sm border capitalize ${form.amenities.includes(amenity) ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-300"}`}
                  onClick={() => toggleAmenity(amenity)}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </Field>

          <div className='grid grid-cols-2 gap-4'>
            <Field label="Latitude">
              <input type='number' step='any' className={input} value={form.latitude} onChange={e => updateField("latitude", e.target.value)} />
            </Field>
            <Field label="Longitude">
              <input type='number' step='any' className={input} value={form.longitude} onChange={e => updateField("longitude", e.target.value)} />
            </Field>
          </div>

          <Field label="Photos">
            {listing?.images?.length > 0 && imagePreviews.length === 0 && (
              <div className='flex gap-2 flex-wrap mb-3'>
                {listing.images.slice(0, 10).map((url, i) => (
                  <img key={i} src={url} className='w-20 h-20 rounded-lg object-cover' alt='' />
                ))}
              </div>
            )}
            <div className='border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-red-400 transition cursor-pointer' onClick={() => document.getElementById("editImgInput").click()}>
              <p className='text-gray-500 text-sm'>Upload new photos only if you want to replace the current ones</p>
              <input id='editImgInput' type='file' accept='image/*' multiple className='hidden' onChange={handleImages} />
            </div>
            {imagePreviews.length > 0 && (
              <div className='flex gap-2 flex-wrap mt-3'>
                {imagePreviews.map((url, i) => (
                  <div key={i} className='relative w-20 h-20 rounded-lg overflow-hidden'>
                    <img src={url} className='w-full h-full object-cover' alt='' />
                    <button type='button' className='absolute top-0.5 right-0.5 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center' onClick={() => removeImage(i)}>
                      <FaTimes className='text-white w-2.5 h-2.5' />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Field>
        </div>

        <button type='submit' disabled={saving} className='w-full mt-8 py-3.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl disabled:opacity-50 transition'>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
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

export default EditListing
