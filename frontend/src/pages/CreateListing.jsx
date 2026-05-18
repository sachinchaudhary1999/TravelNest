import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { FaTimes, FaStar, FaWifi, FaSwimmingPool, FaParking, FaSnowflake, FaTv, FaFire } from "react-icons/fa"
import { MdKitchen, MdPets, MdLocalLaundryService, MdOutlineBed, MdBathtub, MdSecurity, MdOutdoorGrill, MdCleaningServices, MdWorkspaces } from "react-icons/md"
import { FiUsers, FiUploadCloud, FiHeadphones } from "react-icons/fi"
import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi"
import { MdBedroomParent, MdOutlinePool } from "react-icons/md"
import { SiHomeassistantcommunitystore } from "react-icons/si"
import { IoBedOutline } from "react-icons/io5"
import { FaTreeCity } from "react-icons/fa6"
import { BiBuildingHouse } from "react-icons/bi"
import { listingDataContext } from '../Context/ListingContext'
import { useTheme } from '../Context/ThemeContext'
import Navbar from '../Component/layout/NavBar'
import { toast } from 'react-toastify'

// ── CONSTANTS ────────────────────────────────────────────────
const CATEGORIES = [
  { key: "villa",     label: "Villa",         icon: GiFamilyHouse },
  { key: "farmHouse", label: "Farm House",    icon: FaTreeCity },
  { key: "poolHouse", label: "Pool House",    icon: MdOutlinePool },
  { key: "rooms",     label: "Rooms",         icon: MdBedroomParent },
  { key: "flat",      label: "Flat",          icon: BiBuildingHouse },
  { key: "pg",        label: "PG",            icon: IoBedOutline },
  { key: "cabin",     label: "Cabin",         icon: GiWoodCabin },
  { key: "shops",     label: "Shop / Studio", icon: SiHomeassistantcommunitystore },
]

const AMENITIES = [
  { key: "wifi",      label: "Wifi",             icon: FaWifi },
  { key: "pool",      label: "Pool",             icon: FaSwimmingPool },
  { key: "parking",   label: "Parking",          icon: FaParking },
  { key: "ac",        label: "AC",               icon: FaSnowflake },
  { key: "tv",        label: "TV",               icon: FaTv },
  { key: "kitchen",   label: "Kitchen",          icon: MdKitchen },
  { key: "pets",      label: "Pets allowed",     icon: MdPets },
  { key: "laundry",   label: "Laundry",          icon: MdLocalLaundryService },
  { key: "fireplace", label: "Fireplace",        icon: FaFire },
  { key: "hotwater",  label: "Hot water",        icon: FaFire },
  { key: "security",  label: "Security cameras", icon: MdSecurity },
  { key: "bbq",       label: "BBQ grill",        icon: MdOutdoorGrill },
  { key: "games",     label: "Indoor games",     icon: MdBedroomParent },
  { key: "cleaning",  label: "Daily cleaning",   icon: MdCleaningServices },
  { key: "workspace", label: "Workspace",        icon: MdWorkspaces },
]

const HOUSE_RULES = [
  { key: "noSmoking",   label: "No smoking" },
  { key: "noPets",      label: "No pets" },
  { key: "noParties",   label: "No parties or events" },
  { key: "quietHours",  label: "Quiet hours after 10:00 PM" },
  { key: "checkIn",     label: "Check-in after 2:00 PM" },
  { key: "checkOut",    label: "Check-out before 11:00 AM" },
]

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"]

const STEPS = [
  { num: 1, label: "Basic details",    sub: "Provide the basic information" },
  { num: 2, label: "Amenities & rules", sub: "Add amenities and house rules" },
  { num: 3, label: "Photos & preview",  sub: "Upload photos and review" },
]

// ── SIDEBAR ──────────────────────────────────────────────────
function Sidebar({ step, isDarkMode }) {
  const card = isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
  const text = isDarkMode ? "text-white" : "text-gray-900"
  const subtext = isDarkMode ? "text-slate-400" : "text-gray-500"

  return (
    <div className="w-[280px] flex-shrink-0 flex flex-col gap-4">
      {/* STEPS */}
      <div className={`rounded-2xl border p-6 ${card}`}>
        <div className="flex flex-col gap-6">
          {STEPS.map((s, i) => {
            const done = step > s.num
            const active = step === s.num
            return (
              <div key={s.num} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                    done ? "bg-[#FF385C] text-white" :
                    active ? "bg-[#FF385C] text-white" :
                    isDarkMode ? "bg-slate-700 text-slate-400 border-2 border-slate-600" : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                  }`}>
                    {done ? "✓" : s.num}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-0.5 h-8 mt-1 ${done ? "bg-[#FF385C]" : isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                  )}
                </div>
                <div className="pt-1.5">
                  <p className={`text-sm font-semibold ${active ? "text-[#FF385C]" : text}`}>{s.label}</p>
                  <p className={`text-xs mt-0.5 ${subtext}`}>{s.sub}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* NEED HELP */}
      <div className={`rounded-2xl border p-5 ${isDarkMode ? "bg-red-900/20 border-red-900/30" : "bg-red-50 border-red-100"}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#FF385C]/10 flex items-center justify-center">
            <FiHeadphones className="w-5 h-5 text-[#FF385C]" />
          </div>
          <p className={`text-sm font-bold ${text}`}>Need help?</p>
        </div>
        <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-gray-500"} leading-relaxed mb-4`}>
          Our team is here to help you create the perfect listing.
        </p>
        <button className="w-full py-2.5 bg-[#FF385C] hover:bg-[#E31C5F] text-white text-sm font-semibold rounded-xl transition-all">
          Visit Help Center
        </button>
      </div>
    </div>
  )
}

// ── FIELD ────────────────────────────────────────────────────
function Field({ label, required, children, hint }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5">
        {label}{required && <span className="text-[#FF385C] ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

// ── MAIN COMPONENT ───────────────────────────────────────────
function ListingPage() {
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()
  const {
    title, setTitle, description, setDescription,
    rent, setRent, city, setCity, landmark, setLandmark, address, setAddress,
    category, setCategory,
    maxGuests, setMaxGuests, bedrooms, setBedrooms, bathrooms, setBathrooms,
    amenities, setAmenities,
    latitude, setLatitude, longitude, setLongitude,
    imageFiles, setImageFiles, imagePreviews, setImagePreviews,
    handleAddListing, adding,
  } = useContext(listingDataContext)

  const [step, setStep] = useState(1)
  const [houseRules, setHouseRules] = useState({
    noSmoking: true, noPets: false, noParties: true,
    quietHours: true, checkIn: true, checkOut: true,
  })

  // Theme shortcuts
  const bg = isDarkMode ? "bg-[#0f172a]" : "bg-gray-50"
  const card = isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
  const text = isDarkMode ? "text-white" : "text-gray-900"
  const subtext = isDarkMode ? "text-slate-400" : "text-gray-500"
  const inp = `w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 ${
    isDarkMode
      ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-[#FF385C]"
      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#FF385C] focus:ring-2 focus:ring-red-50"
  }`

  // ── IMAGE HANDLERS ─────────────────────────────────────────
  const handleImages = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter(f => ALLOWED_IMAGE_TYPES.includes(f.type))
    if (files.length !== validFiles.length) toast.error("Only JPEG, PNG, WebP, AVIF allowed")
    const newFiles = [...imageFiles, ...validFiles].slice(0, 10)
    if (imageFiles.length + validFiles.length > 10) toast.info("Max 10 photos")
    setImageFiles(newFiles)
    setImagePreviews(newFiles.map(f => URL.createObjectURL(f)))
    e.target.value = ""
  }

  const removeImage = (idx) => {
    const f = imageFiles.filter((_, i) => i !== idx)
    setImageFiles(f)
    setImagePreviews(f.map(file => URL.createObjectURL(file)))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const validFiles = files.filter(f => ALLOWED_IMAGE_TYPES.includes(f.type))
    const newFiles = [...imageFiles, ...validFiles].slice(0, 10)
    setImageFiles(newFiles)
    setImagePreviews(newFiles.map(f => URL.createObjectURL(f)))
  }

  const toggleAmenity = (key) => {
    setAmenities(prev => prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key])
  }

  const toggleRule = (key) => {
    setHouseRules(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // ── VALIDATION ─────────────────────────────────────────────
  const step1Valid = title && description && rent && city && landmark && category
  const step2Valid = true // amenities optional
  const step3Valid = imageFiles.length > 0

  // ── STEP 1 ─────────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="flex flex-col gap-6">

      <Field label="Title" required>
        <input
          type="text"
          className={inp}
          placeholder="e.g. 2BHK near beach with pool"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Field>

      <Field label="Description" required>
        <div className="relative">
          <textarea
            className={`${inp} resize-none`}
            rows={5}
            placeholder="Describe your place, its highlights, nearby attractions, and what guests will love..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={500}
          />
          <span className={`absolute bottom-3 right-3 text-xs ${subtext}`}>
            {description.length} / 500
          </span>
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="City" required>
          <input type="text" className={inp} placeholder="e.g. Mumbai" value={city} onChange={e => setCity(e.target.value)} />
        </Field>
        <Field label="Landmark" required>
          <input type="text" className={inp} placeholder="e.g. Near Gateway of India" value={landmark} onChange={e => setLandmark(e.target.value)} />
        </Field>
      </div>

      <Field label="Full Address (optional)">
        <input type="text" className={inp} placeholder="Street address, apartment, building, etc." value={address} onChange={e => setAddress(e.target.value)} />
      </Field>

      <Field label="Rent per night (₹)" required>
        <input type="number" min="1" className={inp} placeholder="e.g. 2500" value={rent} onChange={e => setRent(e.target.value)} />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Max Guests" required>
          <div className={`flex items-center border rounded-xl overflow-hidden ${isDarkMode ? "border-slate-600" : "border-gray-200"}`}>
            <div className={`px-3 py-3 ${isDarkMode ? "bg-slate-700" : "bg-gray-50"}`}>
              <FiUsers className={`w-4 h-4 ${subtext}`} />
            </div>
            <select
              value={maxGuests}
              onChange={e => setMaxGuests(Number(e.target.value))}
              className={`flex-1 px-3 py-3 text-sm outline-none bg-transparent ${text}`}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </Field>
        <Field label="Bedrooms" required>
          <div className={`flex items-center border rounded-xl overflow-hidden ${isDarkMode ? "border-slate-600" : "border-gray-200"}`}>
            <div className={`px-3 py-3 ${isDarkMode ? "bg-slate-700" : "bg-gray-50"}`}>
              <MdOutlineBed className={`w-4 h-4 ${subtext}`} />
            </div>
            <select
              value={bedrooms}
              onChange={e => setBedrooms(Number(e.target.value))}
              className={`flex-1 px-3 py-3 text-sm outline-none bg-transparent ${text}`}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </Field>
        <Field label="Bathrooms" required>
          <div className={`flex items-center border rounded-xl overflow-hidden ${isDarkMode ? "border-slate-600" : "border-gray-200"}`}>
            <div className={`px-3 py-3 ${isDarkMode ? "bg-slate-700" : "bg-gray-50"}`}>
              <MdBathtub className={`w-4 h-4 ${subtext}`} />
            </div>
            <select
              value={bathrooms}
              onChange={e => setBathrooms(Number(e.target.value))}
              className={`flex-1 px-3 py-3 text-sm outline-none bg-transparent ${text}`}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </Field>
      </div>

      {/* CATEGORY */}
      <Field label="Property Type" required>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon
            const active = category === cat.key
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setCategory(cat.key)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-xs font-medium transition-all duration-200 ${
                  active
                    ? "border-[#FF385C] bg-red-50 text-[#FF385C]"
                    : isDarkMode
                      ? "border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                      : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
                }`}
              >
                <Icon className="w-6 h-6" />
                {cat.label}
              </button>
            )
          })}
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Latitude (optional)">
          <input type="number" step="any" className={inp} placeholder="28.6139" value={latitude} onChange={e => setLatitude(e.target.value)} />
        </Field>
        <Field label="Longitude (optional)">
          <input type="number" step="any" className={inp} placeholder="77.2090" value={longitude} onChange={e => setLongitude(e.target.value)} />
        </Field>
      </div>

    </div>
  )

  // ── STEP 2 ─────────────────────────────────────────────────
  const renderStep2 = () => (
    <div className="flex flex-col gap-8">

      {/* AMENITIES */}
      <div>
        <h3 className={`text-base font-bold ${text} mb-1`}>Amenities</h3>
        <p className={`text-sm ${subtext} mb-4`}>Select all that apply to your property</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {AMENITIES.map(a => {
            const Icon = a.icon
            const active = amenities.includes(a.key)
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => toggleAmenity(a.key)}
                className={`relative flex flex-col items-start gap-2 p-4 rounded-2xl border text-xs font-medium transition-all duration-200 ${
                  active
                    ? isDarkMode ? "border-[#FF385C] bg-red-900/20 text-white" : "border-[#FF385C] bg-white text-gray-900"
                    : isDarkMode ? "border-slate-700 text-slate-400 hover:border-slate-600" : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-[#FF385C]" : subtext}`} />
                <span>{a.label}</span>
                {/* CHECKBOX top right */}
                <div className={`absolute top-3 right-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  active ? "border-[#FF385C] bg-[#FF385C]" : isDarkMode ? "border-slate-600" : "border-gray-300"
                }`}>
                  {active && <span className="text-white text-[10px] font-bold">✓</span>}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* HOUSE RULES */}
      <div>
        <h3 className={`text-base font-bold ${text} mb-1`}>House rules</h3>
        <p className={`text-sm ${subtext} mb-4`}>Set clear expectations for your guests</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HOUSE_RULES.map(rule => (
            <button
              key={rule.key}
              type="button"
              onClick={() => toggleRule(rule.key)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl border text-sm transition-all duration-200 ${
                isDarkMode ? "border-slate-700 hover:border-slate-600" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className={text}>{rule.label}</span>
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                houseRules[rule.key]
                  ? "border-[#FF385C] bg-[#FF385C]"
                  : isDarkMode ? "border-slate-600" : "border-gray-300"
              }`}>
                {houseRules[rule.key] && <span className="text-white text-[10px] font-bold">✓</span>}
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  )

  // ── STEP 3 ─────────────────────────────────────────────────
  const renderStep3 = () => (
    <div className="flex flex-col gap-6">

      {/* UPLOAD AREA */}
      <div>
        <h3 className={`text-base font-bold ${text} mb-1`}>
          Upload photos <span className="text-[#FF385C]">*</span>
        </h3>
        <p className={`text-sm ${subtext} mb-4`}>
          Add up to 10 photos. The first photo will be your cover photo.
        </p>

        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => document.getElementById("imgInput").click()}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${
            isDarkMode
              ? "border-slate-600 hover:border-[#FF385C] hover:bg-red-900/10"
              : "border-gray-200 hover:border-[#FF385C] hover:bg-red-50/50"
          }`}
        >
          <FiUploadCloud className={`w-10 h-10 ${isDarkMode ? "text-slate-500" : "text-gray-400"}`} />
          <div className="text-center">
            <p className={`text-sm font-medium ${text}`}>
              Drag and drop your photos here
            </p>
            <p className={`text-sm ${subtext}`}>
              or <span className="text-[#FF385C] font-semibold">click to browse</span>
            </p>
            <p className={`text-xs mt-1 ${subtext}`}>JPG, PNG or WebP · Max 5MB per file</p>
          </div>
          <input id="imgInput" type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
        </div>
      </div>

      {/* PHOTO PREVIEW GRID */}
      {imagePreviews.length > 0 && (
        <div>
          <p className={`text-sm font-semibold ${text} mb-3`}>
            Photo preview ({imagePreviews.length}/10)
          </p>
          <div className="grid grid-cols-4 gap-3">
            {imagePreviews.map((url, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden aspect-square group">
                <img src={url} className="w-full h-full object-cover" alt="" />
                {/* NUMBER */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {i + 1}
                </div>
                {/* COVER BADGE */}
                {i === 0 && (
                  <div className="absolute bottom-2 left-2 bg-[#FF385C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Cover photo
                  </div>
                )}
                {/* REMOVE */}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-all"
                >
                  <FaTimes className="text-white w-2.5 h-2.5" />
                </button>
              </div>
            ))}

            {/* ADD MORE SLOTS */}
            {imagePreviews.length < 10 && Array.from({ length: Math.min(2, 10 - imagePreviews.length) }).map((_, i) => (
              <button
                key={`add-${i}`}
                type="button"
                onClick={() => document.getElementById("imgInput").click()}
                className={`rounded-2xl aspect-square flex flex-col items-center justify-center gap-2 border-2 border-dashed transition-all ${
                  isDarkMode ? "border-slate-600 hover:border-[#FF385C] text-slate-500" : "border-gray-200 hover:border-[#FF385C] text-gray-400"
                }`}
              >
                <span className="text-2xl">+</span>
                <span className="text-xs">Add photo</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ALMOST THERE BANNER */}
      <div className={`flex items-start gap-4 p-4 rounded-2xl border ${
        isDarkMode ? "bg-red-900/20 border-red-900/30" : "bg-red-50 border-red-100"
      }`}>
        <div className="w-10 h-10 rounded-full bg-[#FF385C]/10 flex items-center justify-center flex-shrink-0">
          <FaStar className="w-4 h-4 text-[#FF385C]" />
        </div>
        <div>
          <p className={`text-sm font-bold ${text}`}>Almost there!</p>
          <p className={`text-xs mt-0.5 ${subtext}`}>
            Review your listing details before publishing. You can edit everything later.
          </p>
        </div>
      </div>

    </div>
  )

  return (
    <div className={`min-h-screen ${bg}`}>
      <Navbar />

      <div className="pt-[70px] md:pt-[80px]">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-8 flex gap-6">

          {/* SIDEBAR — hidden on mobile */}
          <div className="hidden lg:block">
            <Sidebar step={step} isDarkMode={isDarkMode} />
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 min-w-0">
            <div className={`rounded-2xl border ${card} p-6 md:p-8`}>

              {/* CONTENT HEADER */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => step === 1 ? navigate("/") : setStep(s => s - 1)}
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 hover:bg-gray-50 dark:hover:bg-slate-700 flex-shrink-0"
                    style={{ borderColor: isDarkMode ? "#334155" : "#e5e7eb" }}
                  >
                    <FaArrowLeftLong className={`w-4 h-4 ${isDarkMode ? "text-slate-300" : "text-gray-600"}`} />
                  </button>
                  <h1 className={`text-xl font-bold ${text}`}>
                    {step === 1 ? "Setup your listing" : step === 2 ? "Amenities & rules" : "Photos & preview"}
                  </h1>
                </div>
                <span className={`text-sm font-medium ${subtext}`}>Step {step} of 3</span>
              </div>

              {/* STEP CONTENT */}
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}

              {/* FOOTER BUTTONS */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: isDarkMode ? "#334155" : "#f1f5f9" }}>
                {step > 1 ? (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    className={`flex items-center gap-2 h-11 px-6 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                      isDarkMode ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    ← Previous
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/")}
                    className={`flex items-center gap-2 h-11 px-6 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                      isDarkMode ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Save & Exit
                  </button>
                )}

                {step < 3 ? (
                  <button
                    onClick={() => {
                      if (step === 1 && !step1Valid) { toast.error("Please fill all required fields"); return }
                      setStep(s => s + 1)
                    }}
                    disabled={step === 1 && !step1Valid}
                    className="flex items-center gap-2 h-11 px-6 rounded-xl bg-[#FF385C] hover:bg-[#E31C5F] text-white text-sm font-semibold transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
                  >
                    {step === 1 ? "Next: Amenities & rules →" : "Next: Photos & preview →"}
                  </button>
                ) : (
                  <button
                    onClick={handleAddListing}
                    disabled={adding || !step3Valid}
                    className="flex items-center gap-2 h-11 px-6 rounded-xl bg-[#FF385C] hover:bg-[#E31C5F] text-white text-sm font-semibold transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
                  >
                    {adding ? "Publishing..." : "Review & publish listing →"}
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ListingPage;