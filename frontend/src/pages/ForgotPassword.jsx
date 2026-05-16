import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { FiMail, FiShield, FiSend } from "react-icons/fi"
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'
import { useTheme } from '../Context/ThemeContext'
import Logo from '../Component/Logo'
import { toast } from 'react-toastify'

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const { isDarkMode } = useTheme()
  const navigate = useNavigate()

  // ── ALL LOGIC UNTOUCHED ──────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(serverUrl + "/api/auth/forgot-password", { email })
      setSent(true)
      toast.success("Reset link sent!")
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="w-screen min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* BACKGROUND OVERLAY */}
      <div className={`absolute inset-0 backdrop-blur-sm ${isDarkMode ? "bg-black/60" : "bg-white/60"}`} />

      {/* BACK TO LOGIN — top left */}
      <button
        onClick={() => navigate("/login")}
        className="absolute top-6 left-6 flex items-center gap-2 z-10 group"
      >
        <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
          isDarkMode
            ? "bg-slate-800 border-slate-700 group-hover:bg-slate-700"
            : "bg-red-50 border-red-100 group-hover:bg-red-100"
        }`}>
          <FaArrowLeftLong className="text-[#FF385C] w-3.5 h-3.5" />
        </div>
        <span className={`text-sm font-medium transition-colors ${
          isDarkMode ? "text-white group-hover:text-slate-200" : "text-gray-700 group-hover:text-gray-900"
        }`}>
          Back to Login
        </span>
      </button>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-[440px] mx-4">
        <div className={`rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.20)] p-8 flex flex-col items-center ${
          isDarkMode ? "bg-slate-900" : "bg-white"
        }`}>

          {/* EMAIL ICON */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF385C] to-[#ff6b85] flex items-center justify-center shadow-lg shadow-red-200 mb-5">
            <FiMail className="w-7 h-7 text-white" />
          </div>

          {/* LOGO */}
          <div className="mb-4">
            <Logo />
          </div>

          {sent ? (
            /* ── SUCCESS STATE ───────────────────────────────── */
            <div className="w-full flex flex-col items-center gap-4 text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isDarkMode ? "bg-green-900/30" : "bg-green-50"
              }`}>
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Check your email!
              </h2>
              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                We've sent a password reset link to{" "}
                <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  {email}
                </span>.
                <br />It expires in 1 hour.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="mt-2 w-full py-3.5 bg-[#FF385C] hover:bg-[#E31C5F] text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Back to Login
              </button>
            </div>

          ) : (
            /* ── FORM STATE ──────────────────────────────────── */
            <>
              <h1 className={`text-2xl font-bold text-center mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Forgot your password?
              </h1>
              <p className={`text-sm text-center leading-relaxed mb-6 ${isDarkMode ? "text-slate-400" : "text-gray-400"}`}>
                Enter your email and we'll send you<br />a secure reset link.
              </p>

              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

                {/* EMAIL FIELD */}
                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-semibold ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>
                    Email
                  </label>
                  <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 focus-within:border-[#FF385C] focus-within:ring-2 focus-within:ring-red-100 transition-all duration-200 ${
                    isDarkMode
                      ? "border-slate-700 bg-slate-800"
                      : "border-gray-200 bg-white"
                  }`}>
                    <FiMail className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? "text-slate-500" : "text-gray-400"}`} />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={`flex-1 text-sm outline-none bg-transparent ${
                        isDarkMode
                          ? "text-white placeholder:text-slate-500"
                          : "text-gray-900 placeholder:text-gray-400"
                      }`}
                    />
                  </div>
                </div>

                {/* SEND BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FF385C] hover:bg-[#E31C5F] text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-60 shadow-md hover:shadow-lg"
                >
                  <FiSend className="w-4 h-4" />
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                {/* DIVIDER */}
                <div className="relative flex items-center justify-center my-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`w-full border-t ${isDarkMode ? "border-slate-700" : "border-gray-200"}`} />
                  </div>
                  <span className={`relative px-4 text-xs ${isDarkMode ? "bg-slate-900 text-slate-500" : "bg-white text-gray-400"}`}>
                    or
                  </span>
                </div>

                {/* BACK TO LOGIN */}
                <p className={`text-center text-sm ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                  Remember your password?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-[#FF385C] font-semibold cursor-pointer hover:text-[#E31C5F] transition-colors"
                  >
                    Back to login
                  </span>
                </p>

              </form>

              {/* SECURITY NOTE */}
              <div className={`flex items-start gap-3 mt-6 w-full rounded-2xl px-4 py-3 ${
                isDarkMode ? "bg-slate-800" : "bg-red-50"
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                  isDarkMode ? "bg-slate-700" : "bg-white"
                }`}>
                  <FiShield className="w-4 h-4 text-[#FF385C]" />
                </div>
                <div>
                  <p className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    Your security is our priority.
                  </p>
                  <p className={`text-xs mt-0.5 ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                    We never share your email with anyone.
                  </p>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

    </div>
  )
}

export default ForgotPassword