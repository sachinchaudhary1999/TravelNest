import React, { useContext, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md"
import { FiHome, FiStar, FiUsers, FiShield, FiHeadphones, FiTag, FiCalendar } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { authDataContext } from '../Context/AuthContext'
import { useTheme } from '../Context/ThemeContext'
import Logo from '../Component/Logo'
import axios from 'axios'
import { userDataContext } from '../Context/UserContext'
import { toast } from 'react-toastify'

function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { serverUrl, loading, setLoading } = useContext(authDataContext)
  const { setUserData } = useContext(userDataContext)
  const { isDarkMode } = useTheme()
  const navigate = useNavigate()

  // ── ALL LOGIC UNTOUCHED ──────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true })
      setUserData(result.data)
      toast.success("Welcome back!")
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  // Theme shortcuts
  const bg = isDarkMode ? "bg-[#0f172a]" : "bg-[#f7f7f8]"
  const card = isDarkMode ? "bg-slate-900" : "bg-white"
  const rightPanel = isDarkMode ? "bg-slate-900" : "bg-white"
  const text = isDarkMode ? "text-white" : "text-gray-900"
  const subtext = isDarkMode ? "text-slate-400" : "text-gray-400"
  const label = isDarkMode ? "text-slate-300" : "text-gray-700"
  const inputBorder = isDarkMode ? "border-slate-700 bg-slate-800" : "border-gray-200 bg-white"
  const inputText = isDarkMode ? "text-white placeholder:text-slate-500" : "text-gray-900 placeholder:text-gray-400"
  const iconColor = isDarkMode ? "text-slate-500" : "text-gray-400"
  const dividerLine = isDarkMode ? "border-slate-700" : "border-gray-200"
  const dividerBg = isDarkMode ? "bg-slate-900 text-slate-500" : "bg-white text-gray-400"
  const googleBtn = isDarkMode ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200" : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
  const badgeCard = isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"
  const badgeTitle = isDarkMode ? "text-slate-200" : "text-gray-800"
  const badgeSub = isDarkMode ? "text-slate-500" : "text-gray-400"
  const footerText = isDarkMode ? "text-slate-500" : "text-gray-400"
  const footerDot = isDarkMode ? "text-slate-700" : "text-gray-300"

  return (
    <div className={`min-h-screen w-screen ${bg} flex flex-col items-center justify-center px-4 py-6 overflow-auto`}>

      {/* ── MAIN CARD ─────────────────────────────────────────────── */}
      <div className={`w-full max-w-[900px] md:h-[580px] ${card} rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row`}>

        {/* ── LEFT PANEL — image + branding ─────────────────────── */}
        <div className="relative w-full md:w-[45%] min-h-[280px] md:h-full flex-shrink-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=85"
            alt="luxury stay"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

          {/* ✅ Logo component on dark background */}
          <div className="absolute top-5 left-5 z-10">
            <div className="flex items-center gap-2 select-none">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="#FF385C" />
                <path d="M18 9.5L9 17.5V27H15V21H21V27H27V17.5L18 9.5Z" fill="white" />
                <rect x="15.5" y="21" width="5" height="6" rx="1" fill="#FF385C" />
                <circle cx="18" cy="17" r="1.5" fill="#FF385C" />
              </svg>
              <div className="flex items-baseline">
                <span className="text-lg font-black tracking-tight text-white">Travel</span>
                <span className="text-lg font-black tracking-tight text-[#FF385C]">Nest</span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="absolute top-1/2 left-5 right-5 -translate-y-1/2 z-10">
            <h2 className="text-3xl font-extrabold text-white leading-tight drop-shadow-md">
              Find places that <br />feel like{" "}
              <span className="text-[#FF385C]">home</span>
            </h2>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              Handpicked stays. Unforgettable <br />experiences. Just for you.
            </p>
          </div>

          {/* Stats bar */}
          <div className="absolute bottom-5 left-4 right-4 z-10 bg-black/60 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center justify-between">
            <div className="flex flex-col items-center gap-1">
              <FiHome className="w-5 h-5 text-[#FF385C]" />
              <p className="text-white font-bold text-sm">10K+</p>
              <p className="text-white/60 text-[11px]">Stays</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="flex flex-col items-center gap-1">
              <FiStar className="w-5 h-5 text-[#FF385C]" />
              <p className="text-white font-bold text-sm">4.8</p>
              <p className="text-white/60 text-[11px]">Guest Rating</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="flex flex-col items-center gap-1">
              <FiUsers className="w-5 h-5 text-[#FF385C]" />
              <p className="text-white font-bold text-sm">50K+</p>
              <p className="text-white/60 text-[11px]">Happy Guests</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — form ────────────────────────────────── */}
        <div className={`relative flex-1 px-8 md:px-10 py-8 flex flex-col justify-center overflow-y-auto ${rightPanel}`}>

          {/* Back button */}
          <button
            className={`absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
              isDarkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => navigate("/")}
          >
            <FaArrowLeftLong className={`w-4 h-4 ${isDarkMode ? "text-slate-300" : "text-gray-600"}`} />
          </button>

          {/* Heading */}
          <h1 className={`text-2xl font-bold mb-1 ${text}`}>Welcome back 👋</h1>
          <p className={`text-sm mb-7 ${subtext}`}>Login to your account</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* EMAIL */}
            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-semibold ${label}`}>Email</label>
              <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 focus-within:border-[#FF385C] focus-within:ring-2 focus-within:ring-red-100 transition-all duration-200 ${inputBorder}`}>
                <MdOutlineEmail className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className={`flex-1 text-sm outline-none bg-transparent ${inputText}`}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1.5">
              <label className={`text-sm font-semibold ${label}`}>Password</label>
              <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 focus-within:border-[#FF385C] focus-within:ring-2 focus-within:ring-red-100 transition-all duration-200 ${inputBorder}`}>
                <MdOutlineLock className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
                <input
                  type={show ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className={`flex-1 text-sm outline-none bg-transparent ${inputText}`}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShow(p => !p)} className="flex-shrink-0">
                  {show
                    ? <IoMdEyeOff className={`w-5 h-5 ${iconColor} hover:text-gray-600`} />
                    : <IoMdEye className={`w-5 h-5 ${iconColor} hover:text-gray-600`} />
                  }
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right -mt-1">
              <span
                className="text-sm text-[#FF385C] cursor-pointer hover:text-[#E31C5F] font-medium transition-colors duration-200"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </span>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#FF385C] hover:bg-[#E31C5F] text-white text-base font-semibold rounded-xl transition-all duration-300 disabled:opacity-60 shadow-md hover:shadow-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* DIVIDER */}
            <div className="relative flex items-center justify-center my-1">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${dividerLine}`} />
              </div>
              <div className={`relative px-4 text-sm ${dividerBg}`}>or</div>
            </div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              onClick={() => window.location.href = `${serverUrl}/api/auth/google`}
              className={`w-full py-3 border text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md ${googleBtn}`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* SIGN UP LINK */}
            <p className={`text-center text-sm mt-1 ${subtext}`}>
              Don't have an account?{" "}
              <span
                className="text-[#FF385C] cursor-pointer font-semibold hover:text-[#E31C5F] transition-colors duration-200"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>

          </form>
        </div>
      </div>

      {/* ── TRUST BADGES ──────────────────────────────────────────── */}
      <div className={`w-full max-w-[900px] mt-4 rounded-2xl shadow-sm border px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 ${badgeCard}`}>
        {[
          { icon: <FiShield className="w-5 h-5 text-[#FF385C]" />,     title: "Secure booking",       sub: "Your data is protected" },
          { icon: <FiHeadphones className="w-5 h-5 text-[#FF385C]" />, title: "24/7 support",         sub: "We're here to help" },
          { icon: <FiTag className="w-5 h-5 text-[#FF385C]" />,        title: "Best price guarantee", sub: "Find a lower price? We'll match it" },
          { icon: <FiCalendar className="w-5 h-5 text-[#FF385C]" />,   title: "Free cancellation",    sub: "Flexible travel plans" },
        ].map((b) => (
          <div key={b.title} className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? "bg-slate-700" : "bg-red-50"}`}>
              {b.icon}
            </div>
            <div>
              <p className={`text-xs font-semibold ${badgeTitle}`}>{b.title}</p>
              <p className={`text-[11px] mt-0.5 ${badgeSub}`}>{b.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <div className="mt-5 text-center pb-4">
        <p className={`text-xs ${footerText}`}>© 2026 TravelNest. All rights reserved.</p>
        <div className="flex items-center justify-center gap-3 mt-2">
          {["Terms of Service", "Privacy Policy", "Help Center"].map((link, i, arr) => (
            <React.Fragment key={link}>
              <span className={`text-xs cursor-pointer transition-colors ${footerText} hover:text-gray-600`}>{link}</span>
              {i < arr.length - 1 && <span className={`text-xs ${footerDot}`}>•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Login