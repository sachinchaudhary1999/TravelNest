// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FaArrowLeftLong } from "react-icons/fa6"
// import { authDataContext } from '../Context/AuthContext'
// import { userDataContext } from '../Context/UserContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { IoChatbubblesOutline } from 'react-icons/io5'

// function Messages() {
//   const navigate = useNavigate()
//   const { serverUrl } = useContext(authDataContext)
//   const { userData } = useContext(userDataContext)
//   const [convos, setConvos] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const r = await axios.get(serverUrl + "/api/message/conversations", { withCredentials: true })
//         setConvos(r.data)
//       } catch (err) {
//         toast.error("Could not load messages")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetch()
//   }, [])

//   if (loading) return <div className='flex items-center justify-center h-screen'><div className='animate-spin rounded-full h-10 w-10 border-b-2 border-red-500' /></div>

//   return (
//     <div className='min-h-screen bg-gray-50 px-4 md:px-10 py-8'>
//       <div className='max-w-2xl mx-auto'>
//         <div className='flex items-center gap-4 mb-8'>
//           <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/")}>
//             <FaArrowLeftLong className='text-white w-4 h-4' />
//           </button>
//           <h1 className='text-2xl font-bold text-gray-800'>Messages</h1>
//         </div>

//         {convos.length === 0 ? (
//           <div className='text-center py-20'>
//             <IoChatbubblesOutline className='w-16 h-16 text-gray-300 mx-auto mb-4' />
//             <p className='text-xl text-gray-400'>No conversations yet</p>
//             <p className='text-gray-400 text-sm mt-1'>Messages appear here after booking</p>
//           </div>
//         ) : (
//           <div className='space-y-2'>
//             {convos.map(({ booking, unread, lastMessage }) => {
//               const isHost = booking.host?._id === userData?._id
//               const other = isHost ? booking.guest : booking.host
//               return (
//                 <div
//                   key={booking._id}
//                   className='bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition'
//                   onClick={() => navigate(`/chat/${booking._id}`)}
//                 >
//                   {other?.avatar
//                     ? <img src={other.avatar} className='w-12 h-12 rounded-full object-cover flex-shrink-0' alt="" />
//                     : <div className='w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold flex-shrink-0'>
//                         {other?.name?.charAt(0).toUpperCase()}
//                       </div>
//                   }
//                   <div className='flex-1 min-w-0'>
//                     <div className='flex items-center justify-between'>
//                       <p className='font-semibold text-gray-800 truncate'>{other?.name}</p>
//                       {lastMessage && <p className='text-xs text-gray-400 flex-shrink-0'>{new Date(lastMessage.createdAt).toLocaleDateString()}</p>}
//                     </div>
//                     <p className='text-sm text-gray-500 truncate'>{booking.listing?.title}</p>
//                     {lastMessage && <p className='text-sm text-gray-400 truncate mt-0.5'>{lastMessage.text}</p>}
//                   </div>
//                   {unread > 0 && (
//                     <span className='w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0'>{unread}</span>
//                   )}
//                 </div>
//               )
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Messages

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { FiSearch, FiChevronRight } from "react-icons/fi"
import { IoChatbubblesOutline } from 'react-icons/io5'
import { authDataContext } from '../Context/AuthContext'
import { userDataContext } from '../Context/UserContext'
import { useTheme } from '../Context/ThemeContext'
import Navbar from '../Component/layout/NavBar'
import Footer from '../Component/layout/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

function timeAgo(dateStr) {
  if (!dateStr) return ""
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  const hrs = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins} min ago`
  if (hrs < 24) return `${hrs} hour${hrs !== 1 ? "s" : ""} ago`
  return `${days} day${days !== 1 ? "s" : ""} ago`
}

function Messages() {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { userData } = useContext(userDataContext)
  const { isDarkMode } = useTheme()

  const [convos, setConvos] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  // ── ALL LOGIC UNTOUCHED ──────────────────────────────────────
  useEffect(() => {
    const fetchConvos = async () => {
      try {
        const r = await axios.get(serverUrl + "/api/message/conversations", { withCredentials: true })
        setConvos(r.data)
      } catch (err) {
        toast.error("Could not load messages")
      } finally {
        setLoading(false)
      }
    }
    fetchConvos()
  }, [])

  // Theme shortcuts
  const bg = isDarkMode ? "bg-[#0f172a]" : "bg-gray-50"
  const card = isDarkMode ? "bg-slate-800 border-slate-700 hover:bg-slate-700" : "bg-white border-gray-100 hover:shadow-md"
  const text = isDarkMode ? "text-white" : "text-gray-900"
  const subtext = isDarkMode ? "text-slate-400" : "text-gray-500"
  const inputBg = isDarkMode ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500" : "bg-white border-gray-200 text-gray-700 placeholder:text-gray-400"

  // Filter by search
  const filtered = convos.filter(({ booking }) => {
    if (!search.trim()) return true
    const isHost = booking.host?._id === userData?._id
    const other = isHost ? booking.guest : booking.host
    return (
      other?.name?.toLowerCase().includes(search.toLowerCase()) ||
      booking.listing?.title?.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className={`min-h-screen ${bg}`}>
      <Navbar />

      <div className="pt-[70px] md:pt-[80px]">
        <div className="max-w-[900px] mx-auto px-4 md:px-6 py-8">

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
                  <h1 className={`text-2xl font-bold ${text}`}>Messages</h1>
                  <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                    <IoChatbubblesOutline className="w-5 h-5 text-[#FF385C]" />
                  </div>
                </div>
                <p className={`text-sm mt-0.5 ${subtext}`}>
                  {filtered.length} conversation{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* SEARCH */}
            <div className={`flex items-center gap-2 h-11 px-4 rounded-2xl border transition-all duration-200 focus-within:border-[#FF385C] ${inputBg}`}>
              <FiSearch className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? "text-slate-500" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="text-sm outline-none bg-transparent w-44"
              />
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={`rounded-2xl border p-4 flex items-center gap-4 animate-pulse ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"}`}>
                  <div className={`w-12 h-12 rounded-full flex-shrink-0 ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className={`h-3 w-32 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                    <div className={`h-3 w-48 rounded-full ${isDarkMode ? "bg-slate-700" : "bg-gray-200"}`} />
                  </div>
                </div>
              ))}
            </div>

          ) : filtered.length === 0 ? (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isDarkMode ? "bg-slate-800" : "bg-red-50"}`}>
                <IoChatbubblesOutline className="w-9 h-9 text-[#FF385C]" />
              </div>
              <p className={`text-xl font-semibold ${text}`}>
                {search ? "No results found" : "No conversations yet"}
              </p>
              <p className={`text-sm ${subtext}`}>
                {search ? `No messages matching "${search}"` : "Messages appear here after booking"}
              </p>
              {!search && (
                <button
                  onClick={() => navigate("/")}
                  className="mt-2 h-11 px-6 rounded-xl bg-[#FF385C] hover:bg-[#E31C5F] text-white text-sm font-semibold transition-all shadow-md"
                >
                  Explore listings
                </button>
              )}
            </div>

          ) : (
            /* CONVERSATION LIST */
            <div className="flex flex-col gap-3">
              {filtered.map(({ booking, unread, lastMessage }) => {
                const isHost = booking.host?._id === userData?._id
                const other = isHost ? booking.guest : booking.host

                return (
                  <div
                    key={booking._id}
                    onClick={() => navigate(`/chat/${booking._id}`)}
                    className={`rounded-2xl border p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 ${card}`}
                  >
                    {/* AVATAR */}
                    {other?.avatar ? (
                      <img
                        src={other.avatar}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-gray-100 dark:ring-slate-700"
                        alt={other?.name}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {other?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-base truncate ${text}`}>
                        {other?.name}
                      </p>
                      <p className={`text-sm truncate mt-0.5 ${subtext}`}>
                        {booking.listing?.title}
                      </p>
                      {lastMessage && (
                        <p className={`text-xs truncate mt-0.5 ${isDarkMode ? "text-slate-500" : "text-gray-400"}`}>
                          {lastMessage.text}
                        </p>
                      )}
                    </div>

                    {/* RIGHT — time + unread + chevron */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {lastMessage && (
                        <span className={`text-xs ${subtext}`}>
                          {timeAgo(lastMessage.createdAt)}
                        </span>
                      )}
                      {unread > 0 && (
                        <span className="w-6 h-6 bg-[#FF385C] text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {unread}
                        </span>
                      )}
                      <FiChevronRight className={`w-5 h-5 ${isDarkMode ? "text-slate-500" : "text-gray-400"}`} />
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

export default Messages
