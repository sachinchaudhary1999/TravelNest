import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiSearch } from "react-icons/fi"
import { GiHamburgerMenu } from "react-icons/gi"
import { CgProfile } from "react-icons/cg"
import { MdWhatshot, MdBedroomParent, MdOutlinePool, MdSettings, MdAdminPanelSettings } from "react-icons/md"
import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi"
import { SiHomeassistantcommunitystore } from "react-icons/si"
import { IoBedOutline } from "react-icons/io5"
import { FaTreeCity } from "react-icons/fa6"
import { BiBuildingHouse } from "react-icons/bi"
import { FaHeart } from "react-icons/fa"
import { IoChatbubblesOutline } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { userDataContext } from '../Context/UserContext'
import { listingDataContext } from '../Context/ListingContext'

const categories = [
  { key: "trending", label: "Trending", icon: <MdWhatshot className='w-7 h-7' /> },
  { key: "villa", label: "Villa", icon: <GiFamilyHouse className='w-7 h-7' /> },
  { key: "farmHouse", label: "Farm House", icon: <FaTreeCity className='w-7 h-7' /> },
  { key: "poolHouse", label: "Pool House", icon: <MdOutlinePool className='w-7 h-7' /> },
  { key: "rooms", label: "Rooms", icon: <MdBedroomParent className='w-7 h-7' /> },
  { key: "flat", label: "Flat", icon: <BiBuildingHouse className='w-7 h-7' /> },
  { key: "pg", label: "PG", icon: <IoBedOutline className='w-7 h-7' /> },
  { key: "cabin", label: "Cabins", icon: <GiWoodCabin className='w-7 h-7' /> },
  { key: "shops", label: "Shops", icon: <SiHomeassistantcommunitystore className='w-7 h-7' /> },
]

function Nav() {
  const [showPopup, setShowPopup] = useState(false)
  const [activeCat, setActiveCat] = useState("trending")
  const [input, setInput] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isDarkMenu, setIsDarkMenu] = useState(false)
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    amenities: [],
    category: ""
  })
  const popupRef = useRef(null)

  const { userData, setUserData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { listingData, setNewListData, searchData, handleSearch, handleViewCard, setSearchData } = useContext(listingDataContext)
  const navigate = useNavigate()
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174"

  const handleLogOut = async () => {
    try {
      await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true })
      setUserData(null)
      navigate("/")
    } catch (error) { console.log(error) }
    setShowPopup(false)
    setShowSettings(false)
  }

  useEffect(() => {
    const stored = localStorage.getItem("darkMenu")
    const enabled = stored === "true"
    setIsDarkMenu(enabled)
    document.documentElement.classList.toggle("dark", enabled)
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMenu", isDarkMenu.toString())
    document.documentElement.classList.toggle("dark", isDarkMenu)
  }, [isDarkMenu])

  const togglePopup = () => {
    setShowPopup(prev => {
      if (prev) setShowSettings(false)
      return !prev
    })
  }

  const handleCategory = (cat) => {
    setActiveCat(cat)
    if (cat === "trending") setNewListData(listingData)
    else setNewListData(listingData.filter(l => l.category === cat))
  }

  useEffect(() => {
    const timer = setTimeout(() => handleSearch(input, filters), 300)
    return () => clearTimeout(timer)
  }, [input, filters])

  // Close popup on outside click
  useEffect(() => {
    const handler = (e) => { if (popupRef.current && !popupRef.current.contains(e.target)) setShowPopup(false) }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className='fixed top-0 bg-white z-20 w-full shadow-sm'>
      {/* Top bar */}
      <div className='w-full min-h-[72px] border-b border-gray-200 px-4 md:px-10 flex items-center justify-between gap-4'>
        <div className='cursor-pointer flex-shrink-0' onClick={() => navigate("/")}>
          <h1 className='text-3xl font-bold text-red-500'>TravelNest</h1>
        </div>

        {/* Search bar - desktop */}
        <div className='relative hidden md:flex flex-1 max-w-md'>
          <input
            type="text"
            className='w-full px-5 py-2.5 border-2 border-gray-300 rounded-full text-base outline-none focus:border-red-400 transition'
            placeholder='Search city, landmark, title...'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className='absolute right-2 top-1.5 p-2 rounded-full bg-red-500 hover:bg-red-600 transition'>
            <FiSearch className='w-4 h-4 text-white' />
          </button>
        </div>

        {/* Filter button */}
        <button 
          className='hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:shadow-md transition'
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className='text-sm'>Filters</span>
          <span className='text-xs'>▼</span>
        </button>

        {/* Right section */}
        <div className='flex items-center gap-3' ref={popupRef}>
          <span
            className='text-base cursor-pointer rounded-full hover:bg-gray-100 px-3 py-2 hidden md:block whitespace-nowrap'
            onClick={() => navigate("/listingpage1")}
          >
            List your home
          </span>

          {userData && (
            <>
              <button className='relative p-2 hover:bg-gray-100 rounded-full' onClick={() => navigate("/wishlist")}>
                <FaHeart className='w-5 h-5 text-red-500' />
              </button>
              <button className='relative p-2 hover:bg-gray-100 rounded-full' onClick={() => navigate("/messages")}>
                <IoChatbubblesOutline className='w-5 h-5 text-gray-700' />
              </button>
            </>
          )}

          <button
            className='px-4 py-2 flex items-center gap-2 border border-gray-300 rounded-full hover:shadow-md transition'
            onClick={togglePopup}
          >
            <GiHamburgerMenu className='w-5 h-5' />
            {!userData
              ? <CgProfile className='w-6 h-6' />
              : <span className='w-7 h-7 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-semibold'>
                  {userData.name.charAt(0).toUpperCase()}
                </span>
            }
          </button>

          {showPopup && (
            <div className={`absolute top-[110%] right-4 md:right-10 w-56 z-50 rounded-xl shadow-xl overflow-hidden border ${isDarkMenu ? "bg-slate-950 border-slate-700 text-white" : "bg-white border-gray-200 text-gray-700"}`}>
              {!userData ? (
                <>
                  <MenuItem label="Login" onClick={() => { navigate("/login"); setShowPopup(false); setShowSettings(false) }} dark={isDarkMenu} />
                  <MenuItem label="Sign up" onClick={() => { navigate("/signup"); setShowPopup(false); setShowSettings(false) }} dark={isDarkMenu} />
                </>
              ) : (
                <>
                  <MenuItem label="My Profile" onClick={() => { navigate("/profile"); setShowPopup(false); setShowSettings(false) }} dark={isDarkMenu} />
                  <MenuItem label="My Listing" onClick={() => { navigate("/mylisting"); setShowPopup(false); setShowSettings(false) }} dark={isDarkMenu} />
                  <MenuItem label="My Bookings" onClick={() => { navigate("/mybooking"); setShowPopup(false); setShowSettings(false) }} dark={isDarkMenu} />
                  <MenuItem label="Wishlist" onClick={() => { navigate("/wishlist"); setShowPopup(false); setShowSettings(false) }} dark={isDarkMenu} />
                  <MenuItem label="Messages" onClick={() => { navigate("/messages"); setShowPopup(false); setShowSettings(false) }} dark={isDarkMenu} />
                  {userData.role === "admin" && (
                    <MenuItem label="Admin Panel" icon={<MdAdminPanelSettings />} onClick={() => { window.location.href = adminUrl; setShowPopup(false); setShowSettings(false) }} dark={isDarkMenu} />
                  )}
                  <MenuItem label="Settings" icon={<MdSettings />} onClick={() => setShowSettings(prev => !prev)} dark={isDarkMenu} />
                  {showSettings && (
                    <div className={`px-4 py-3 border-t ${isDarkMenu ? "border-slate-700 bg-slate-900" : "border-gray-100 bg-slate-50"}`}>
                      <div className='flex items-center justify-between gap-3'>
                        <div>
                          <p className={`text-sm font-medium ${isDarkMenu ? "text-white" : "text-gray-900"}`}>Dark theme</p>
                          <p className={`text-xs ${isDarkMenu ? "text-slate-300" : "text-gray-500"}`}>Toggle site dark mode</p>
                        </div>
                        <button type='button' onClick={() => setIsDarkMenu(prev => !prev)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${isDarkMenu ? "bg-red-500" : "bg-gray-300"}`}>
                          <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${isDarkMenu ? "translate-x-5" : "translate-x-0"}`} />
                        </button>
                      </div>
                    </div>
                  )}
                  <div className={`border-t ${isDarkMenu ? "border-slate-700" : "border-gray-100"}`} />
                  <MenuItem label="List your home" onClick={() => { navigate("/listingpage1"); setShowPopup(false); setShowSettings(false) }} dark={isDarkMenu} />
                  <MenuItem label="Logout" onClick={handleLogOut} danger dark={isDarkMenu} />
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search - mobile */}
      <div className='md:hidden px-4 py-2 relative'>
        <input
          type="text"
          className='w-full px-5 py-2.5 border-2 border-gray-300 rounded-full text-base outline-none'
          placeholder='Search anywhere...'
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className='absolute right-6 top-3.5 p-2 rounded-full bg-red-500'>
          <FiSearch className='w-4 h-4 text-white' />
        </button>
      </div>

      {/* Search results dropdown */}
      {searchData && searchData.length > 0 && (
        <div className='absolute left-1/2 -translate-x-1/2 top-full w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-72 overflow-auto'>
          {searchData.map(s => (
            <div
              key={s._id}
              className='px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0'
              onClick={() => { handleViewCard(s._id); setInput(""); setSearchData([]) }}
            >
              <p className='font-medium text-sm'>{s.title}</p>
              <p className='text-xs text-gray-500'>{s.landMark}, {s.city}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters dropdown */}
      {showFilters && (
        <div className='absolute left-1/2 -translate-x-1/2 top-full mt-2 w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-xl z-40 p-4'>
          <div className='space-y-3'>
            <div className='flex gap-2'>
              <input type="number" placeholder="Min Price" className='flex-1 px-3 py-2 border rounded' value={filters.minPrice} onChange={e => setFilters({...filters, minPrice: e.target.value})} />
              <input type="number" placeholder="Max Price" className='flex-1 px-3 py-2 border rounded' value={filters.maxPrice} onChange={e => setFilters({...filters, maxPrice: e.target.value})} />
            </div>
            <select className='w-full px-3 py-2 border rounded' value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})}>
              <option value="">All Categories</option>
              {categories.filter(cat => cat.key !== "trending").map(cat => (
                <option key={cat.key} value={cat.key}>{cat.label}</option>
              ))}
            </select>
            <div>
              <label className='text-sm font-medium'>Amenities:</label>
              <div className='flex flex-wrap gap-2 mt-1'>
                {["wifi", "pool", "parking", "ac", "tv", "kitchen"].map(amenity => (
                  <label key={amenity} className='flex items-center gap-1 text-sm'>
                    <input type="checkbox" checked={filters.amenities.includes(amenity)} onChange={e => {
                      const newAmenities = e.target.checked 
                        ? [...filters.amenities, amenity] 
                        : filters.amenities.filter(a => a !== amenity)
                      setFilters({...filters, amenities: newAmenities})
                    }} />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
            <button className='w-full py-2 bg-red-500 text-white rounded hover:bg-red-600' onClick={() => setShowFilters(false)}>
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Category bar */}
      <div className='w-full h-20 bg-white flex items-center gap-6 md:gap-10 overflow-x-auto px-4 md:px-10 md:justify-center border-t border-gray-100'>
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`flex flex-col items-center gap-1 text-xs text-gray-500 flex-shrink-0 pb-1 border-b-2 transition hover:text-gray-900 ${activeCat === cat.key ? "border-gray-900 text-gray-900" : "border-transparent"}`}
            onClick={() => handleCategory(cat.key)}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function MenuItem({ label, onClick, danger, icon, dark }) {
  const baseText = danger ? "text-red-500" : dark ? "text-white" : "text-gray-700"
  const hoverBg = dark ? "hover:bg-slate-800" : "hover:bg-gray-50"

  return (
    <button
      className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 ${baseText} ${hoverBg}`}
      onClick={onClick}
    >
      {icon}{label}
    </button>
  )
}

export default Nav
