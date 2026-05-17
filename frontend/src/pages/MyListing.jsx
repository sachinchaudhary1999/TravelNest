import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { FaStar, FaWifi } from "react-icons/fa"
import { FiHome, FiEye, FiSearch, FiChevronDown, FiMapPin, FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi"
import { MdOutlineBed, MdBathtub } from "react-icons/md"
import { HiUsers } from "react-icons/hi"
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import { useTheme } from '../Context/ThemeContext'
import Navbar from '../Component/layout/NavBar'
import Footer from '../Component/layout/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

function MyListing() {
  const navigate = useNavigate()
  const { userData, getCurrentUser } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { isDarkMode } = useTheme()

  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [emptyMessage, setEmptyMessage] = useState("Start hosting and earn money")
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [openMenu, setOpenMenu] = useState(null)

  // ── ALL ORIGINAL LOGIC UNTOUCHED ─────────────────────────────
  const loadListingsFallback = async () => {
    const result = await axios.get(serverUrl + "/api/listing/get?limit=100")
    const allListings = result.data.listings || []
    const hostedListings = allListings.filter(listing => {
      const hostId = listing.host?._id || listing.host
      return hostId === userData?._id
    })
    setEmptyMessage(allListings.length > 0
      ? "The listings on the home page belong to a different account."
      : "Start hosting and earn money"
    )
    return hostedListings
  }

  const getMyListings = async () => {
    if (!userData?._id) return
    setLoading(true)
    try {
      const result = await axios.get(serverUrl + "/api/listing/my", { withCredentials: true })
      setListings(result.data.listings || [])
      setEmptyMessage("Start hosting and earn money")
      await getCurrentUser()
    } catch (error) {
      try {
        const hostedListings = await loadListingsFallback()
        setListings(hostedListings)
      } catch {
        toast.error(error.response?.data?.message || "Could not load your listings")
        setListings(userData?.listing || [])
      }
    } finally {
      setLoading(false)
    }
  }

  const deleteListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return
    try {
      await axios.delete(serverUrl + `/api/listing/delete/${id}`, { withCredentials: true })
      setListings(prev => prev.filter(l => l._id !== id))
      await getCurrentUser()
      toast.success("Listing deleted")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete listing")
    }
  }

  useEffect(() => { getMyListings() }, [userData?._id])

  // ── FILTER + SORT ────────────────────────────────────────────
  const filtered = listings
    .filter(l => {
      if (activeTab === "published") return l.status === "approved"
      if (activeTab === "drafts") return l.status === "draft"
      if (activeTab === "paused") return l.status === "paused"
      return true
    })
    .filter(l =>
      search.trim() === "" ||
      l.title?.toLowerCase().includes(search.toLowerCase()) ||
      l.city?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt)
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt)
      if (sortBy === "price_high") return b.rent - a.rent
      if (sortBy === "price_low") return a.rent - b.rent
      return 0
    })

  // ── STATS ────────────────────────────────────────────────────
  const stats = [
    { label: "Total Listings", value: listings.length, icon: <FiHome className="w-5 h-5 text-[#FF385C]" />, bg: isDarkMode ? "bg-red-900/20" : "bg-red-50" },
    { label: "Published",      value: listings.filter(l => l.status === "approved").length, icon: <span className="text-green-500 text-lg">✓</span>, bg: isDarkMode ? "bg-green-900/20" : "bg-green-50" },
    { label: "Drafts",         value: listings.filter(l => l.status === "draft").length,    icon: <span className="text-yellow-500 text-lg">⏱</span>, bg: isDarkMode ? "bg-yellow-900/20" : "bg-yellow-50" },
    { label: "Paused",         value: listings.filter(l => l.status === "paused").length,   icon: <span className="text-purple-500 text-lg">⏸</span>, bg: isDarkMode ? "bg-purple-900/20" : "bg-purple-50" },
    { label: "Total Views",    value: "—", icon: <FiEye className="w-5 h-5 text-blue-500" />, bg: isDarkMode ? "bg-blue-900/20" : "bg-blue-50" },
  ]

  const tabs = [
    { key: "all",       label: "All Listings" },
    { key: "published", label: "Published" },
    { key: "drafts",    label: "Drafts" },
    { key: "paused",    label: "Paused" },
  ]

  const getStatusBadge = (status) => {
    if (status === "approved") return { label: "Published", color: "bg-green-100 text-green-700", dot: "bg-green-500" }
    if (status === "draft")    return { label: "Draft",     color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" }
    if (status === "paused")   return { label: "Paused",    color: "bg-purple-100 text-purple-700", dot: "bg-purple-500" }
    return { label: "Published", color: "bg-green-100 text-green-700", dot: "bg-green-500" }
  }

  // Theme shortcuts
  const bg = isDarkMode ? "bg-[#0f172a]" : "bg-gray-50"
  const card = isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
  const text = isDarkMode ? "text-white" : "text-gray-900"
  const subtext = isDarkMode ? "text-slate-400" : "text-gray-500"
  const border = isDarkMode ? "border-slate-700" : "border-gray-200"
  const inputBg = isDarkMode ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" : "bg-white border-gray-200 text-gray-700 placeholder:text-gray-400"

  return (
    <div className={`min-h-screen ${bg}`}>
      <Navbar />

      <div className="pt-[70px] md:pt-[80px]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">

          {/* ── HEADER ──────────────────────────────────────────── */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all duration-200 flex-shrink-0"
              >
                <FaArrowLeftLong className="text-[#FF385C] w-4 h-4" />
              </button>
              <div>
                <h1 className={`text-2xl font-bold ${text}`}>My Listings</h1>
                <p className={`text-sm mt-0.5 ${subtext}`}>
                  Manage your properties, update details and track performance.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/listingpage1")}
              className="flex items-center gap-2 h-11 px-5 rounded-xl bg-[#FF385C] hover:bg-[#E31C5F] text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex-shrink-0"
            >
              + Add New Listing
            </button>
          </div>

          {/* ── STATS CARDS ─────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className={`rounded-2xl border p-4 flex items-center gap-4 ${card}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${stat.bg}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className={`text-[11px] ${subtext}`}>{stat.label}</p>
                  <p className={`text-xl font-bold ${text}`}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── TABS + SEARCH + SORT ─────────────────────────────── */}
          <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b ${border}`}>

            {/* TABS */}
            <div className="flex items-center gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? "text-[#FF385C] border-b-2 border-[#FF385C]"
                      : isDarkMode ? "text-slate-400 hover:text-slate-200" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* SEARCH + SORT */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 h-9 px-3 rounded-xl border ${inputBg}`}>
                <FiSearch className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="text-sm outline-none bg-transparent w-36"
                />
              </div>
              <div className={`flex items-center gap-2 h-9 px-3 rounded-xl border text-sm ${inputBg}`}>
                <span className={subtext}>Sort by</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="outline-none bg-transparent text-sm cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price_high">Price: High</option>
                  <option value="price_low">Price: Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── LISTING ROWS ─────────────────────────────────────── */}
          {loading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={`rounded-2xl border p-4 flex gap-4 animate-pulse ${card}`}>
                  <div className={`w-[220px] h-[140px] rounded-xl flex-shrink-0 ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                  <div className="flex-1 flex flex-col gap-3 py-2">
                    <div className={`h-4 w-1/2 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                    <div className={`h-3 w-1/3 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                    <div className={`h-3 w-1/4 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                  </div>
                </div>
              ))}
            </div>

          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isDarkMode ? "bg-slate-800" : "bg-gray-100"}`}>
                <FiHome className={`w-9 h-9 ${isDarkMode ? "text-slate-600" : "text-gray-300"}`} />
              </div>
              <p className={`text-xl font-semibold ${text}`}>No listings yet</p>
              <p className={`text-sm ${subtext}`}>{emptyMessage}</p>
              <button
                onClick={() => navigate("/listingpage1")}
                className="mt-2 h-11 px-6 rounded-xl bg-[#FF385C] hover:bg-[#E31C5F] text-white text-sm font-semibold transition-all shadow-md"
              >
                + List your home
              </button>
            </div>

          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map(l => {
                const badge = getStatusBadge(l.status)
                const avgRating = l.ratings ? l.ratings.toFixed(1) : null

                return (
                  <div
                    key={l._id}
                    className={`rounded-2xl border flex flex-col sm:flex-row gap-0 overflow-hidden transition-all duration-300 hover:shadow-md ${card}`}
                  >
                    {/* IMAGE */}
                    <div className="relative w-full sm:w-[220px] h-[180px] sm:h-auto flex-shrink-0">
                      {l.images?.[0] ? (
                        <img
                          src={l.images[0]}
                          alt={l.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? "bg-slate-700" : "bg-gray-100"}`}>
                          <FiHome className={`w-10 h-10 ${isDarkMode ? "text-slate-600" : "text-gray-300"}`} />
                        </div>
                      )}
                      {/* STATUS BADGE */}
                      <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        {badge.label}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 p-5 flex flex-col sm:flex-row gap-4">

                      {/* LEFT — listing info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-1">
                          <h3 className={`text-base font-bold truncate ${text}`}>{l.title}</h3>
                          {avgRating && (
                            <span className="flex items-center gap-1 text-sm flex-shrink-0">
                              <FaStar className="text-[#FF385C] w-3.5 h-3.5" />
                              <span className={`font-medium ${text}`}>{avgRating}</span>
                              <span className={subtext}>({l.ratingsCount})</span>
                            </span>
                          )}
                        </div>

                        <div className={`flex items-center gap-1 text-sm mb-3 ${subtext}`}>
                          <FiMapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          {l.landMark}, {l.city}
                        </div>

                        <div className={`flex flex-wrap items-center gap-4 text-sm mb-3 ${subtext}`}>
                          {l.bedrooms && (
                            <span className="flex items-center gap-1">
                              <MdOutlineBed className="w-4 h-4" />
                              {l.bedrooms} Bed{l.bedrooms !== 1 ? "s" : ""}
                            </span>
                          )}
                          {l.bathrooms && (
                            <span className="flex items-center gap-1">
                              <MdBathtub className="w-4 h-4" />
                              {l.bathrooms} Bath{l.bathrooms !== 1 ? "s" : ""}
                            </span>
                          )}
                          {l.maxGuests && (
                            <span className="flex items-center gap-1">
                              <HiUsers className="w-4 h-4" />
                              {l.maxGuests} Guests
                            </span>
                          )}
                          {l.amenities?.includes("wifi") && (
                            <span className="flex items-center gap-1">
                              <FaWifi className="w-4 h-4" />
                              WiFi
                            </span>
                          )}
                        </div>

                        <p className={`text-base font-bold ${text}`}>
                          ₹{l.rent?.toLocaleString("en-IN")}
                          <span className={`text-sm font-normal ${subtext}`}> / night</span>
                        </p>
                      </div>

                      {/* RIGHT — stats + actions */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">

                        {/* STATS ROW */}
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className={`text-[11px] ${subtext}`}>Views</p>
                            <p className={`text-base font-bold ${text}`}>—</p>
                          </div>
                          <div className="text-center">
                            <p className={`text-[11px] ${subtext}`}>Bookings</p>
                            <p className={`text-base font-bold ${text}`}>—</p>
                          </div>
                          <div className="text-center">
                            <p className={`text-[11px] ${subtext}`}>Revenue</p>
                            <p className={`text-base font-bold ${text}`}>—</p>
                          </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/editlisting/${l._id}`)}
                            className={`h-9 px-4 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                              isDarkMode
                                ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                                : "border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            Edit Listing
                          </button>

                          {/* THREE DOT MENU */}
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenu(openMenu === l._id ? null : l._id)}
                              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                                isDarkMode
                                  ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              <FiMoreVertical className="w-4 h-4" />
                            </button>

                            {openMenu === l._id && (
                              <div className={`absolute right-0 top-11 w-44 rounded-2xl border shadow-xl z-20 overflow-hidden py-1 ${
                                isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"
                              }`}>
                                <button
                                  onClick={() => { navigate(`/editlisting/${l._id}`); setOpenMenu(null) }}
                                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
                                    isDarkMode ? "text-slate-300 hover:bg-slate-700" : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  <FiEdit2 className="w-4 h-4" /> Edit listing
                                </button>
                                <button
                                  onClick={() => { deleteListing(l._id); setOpenMenu(null) }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                >
                                  <FiTrash2 className="w-4 h-4" /> Delete listing
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default MyListing