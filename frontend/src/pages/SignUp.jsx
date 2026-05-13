import React, { useContext, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import { FaCamera } from "react-icons/fa"
import { FaArrowLeftLong } from "react-icons/fa6"
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'
import { userDataContext } from '../Context/UserContext'
import { toast } from 'react-toastify'

function SignUp() {
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const { serverUrl, loading, setLoading } = useContext(authDataContext)
  const { setUserData } = useContext(userDataContext)
  const navigate = useNavigate()

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append("name", name)
      fd.append("email", email)
      fd.append("password", password)
      if (avatarFile) {
        fd.append("avatar", avatarFile)
        console.log("Avatar file included:", avatarFile.name)
      }
      console.log("Sending signup request...")
      const result = await axios.post(serverUrl + "/api/auth/signup", fd, { withCredentials: true })
      console.log("Signup successful:", result.data)
      setUserData(result.data)
      toast.success("Account created!")
      navigate("/")
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-[#f5f5f0]">

      {/* ── LEFT PANEL ── hero image with overlaid content */}
      <div className="hidden lg:flex w-[42%] relative flex-col justify-between overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80')" }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        {/* Top: Logo */}
        <div className="relative z-10 p-8">
          <div className="flex items-center gap-2">
            {/* House icon SVG */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L4 14v14h8v-8h8v8h8V14L16 4z" fill="#ef4444" />
              <path d="M16 4L4 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-white text-xl font-bold tracking-wide">TravelNest</span>
          </div>
        </div>

        {/* Middle: Headline */}
        <div className="relative z-10 px-8">
          <h2 className="text-white text-5xl font-extrabold leading-tight mb-4">
            Find your<br />perfect<br />
            <span className="text-red-400">luxury</span> stay
          </h2>
          <p className="text-white/80 text-base leading-relaxed">
            Join thousands of travelers exploring<br />unique destinations around the world.
          </p>

          {/* Feature bullets */}
          <div className="mt-8 flex flex-col gap-4">
            {[
              { icon: "🛡️", title: "Best Price Guarantee", sub: "Get the best deals always" },
              { icon: "🎧", title: "24/7 Customer Support", sub: "We're here anytime you need" },
              { icon: "🔒", title: "Secure & Safe Booking", sub: "Your data is always protected" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-base shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{f.title}</p>
                  <p className="text-white/60 text-xs">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Review card */}
        <div className="relative z-10 p-8">
          <div className="bg-white rounded-2xl p-4 shadow-xl max-w-xs">
            <div className="flex items-center gap-3 mb-2">
              {/* Stacked avatar placeholders */}
              <div className="flex -space-x-2">
                {["#c084fc","#f97316","#38bdf8","#4ade80"].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-gray-800 font-bold text-sm">4.9/5</span>
                </div>
                <p className="text-gray-400 text-xs">From 10K+ reviews</p>
              </div>
            </div>
            <p className="text-gray-600 text-xs italic">"Amazing stays and unforgettable experiences."</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── form area */}
      <div className="flex-1 flex flex-col relative overflow-y-auto">

        {/* Top-right: Already have account */}
        <div className="flex justify-end items-center p-6 shrink-0">
          <span className="text-gray-500 text-sm">Already have an account?&nbsp;</span>
          <span
            className="text-red-500 font-semibold text-sm cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>

        {/* Right decorative feature badges */}
        <div className="absolute right-4 top-1/3 hidden xl:flex flex-col gap-5">
          {[
            { icon: "🛡️", title: "Trusted by Thousands", sub: "Over 10K+ happy travelers\ntrust TravelNest" },
            { icon: "🌐", title: "Explore the World", sub: "Discover unique stays in\n500+ cities worldwide" },
            { icon: "❤️", title: "Memorable Experiences", sub: "Create unforgettable\nmemories with TravelNest" },
          ].map((b) => (
            <div key={b.title} className="flex items-start gap-3 max-w-[180px]">
              <div className="w-9 h-9 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 text-base">
                {b.icon}
              </div>
              <div>
                <p className="text-gray-800 font-semibold text-xs">{b.title}</p>
                <p className="text-gray-400 text-xs whitespace-pre-line">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Center: Card */}
        <div className="flex-1 flex items-center justify-center px-4 py-6">
          <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">

            <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Create your account</h1>
            <p className="text-gray-500 text-sm text-center mb-6">Join TravelNest today</p>

            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="relative">
                {avatarPreview ? (
                  <img src={avatarPreview} className="w-20 h-20 rounded-full object-cover" alt="Profile preview" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg viewBox="0 0 40 40" className="w-10 h-10 text-gray-400" fill="currentColor">
                      <circle cx="20" cy="14" r="7" />
                      <path d="M4 36c0-8.837 7.163-16 16-16s16 7.163 16 16" />
                    </svg>
                  </div>
                )}
                <label className="absolute bottom-0 right-0 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition shadow-md">
                  <FaCamera className="text-white w-3 h-3" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>
              <p className="text-xs text-gray-400">Add a profile photo (optional)</p>
            </div>

            <form onSubmit={handleSignUp} className="flex flex-col gap-4">

              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-red-400 transition bg-white">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="7" r="4" /><path d="M5.5 20c0-3.038 2.91-5.5 6.5-5.5s6.5 2.462 6.5 5.5" />
                  </svg>
                  <input
                    type="text" required placeholder="Enter your full name"
                    className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                    value={name} onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-red-400 transition bg-white">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 8l10 7 10-7" />
                  </svg>
                  <input
                    type="email" required placeholder="Enter your email address"
                    className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                    value={email} onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-red-400 transition bg-white">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={show ? "text" : "password"} required minLength={6} placeholder="Create a password"
                    className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
                    value={password} onChange={e => setPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShow(p => !p)} className="shrink-0">
                    {show
                      ? <IoMdEyeOff className="w-5 h-5 text-gray-400" />
                      : <IoMdEye className="w-5 h-5 text-gray-400" />
                    }
                  </button>
                </div>
              </div>

              {/* Sign Up button */}
              <button
                type="submit" disabled={loading}
                className="w-full py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold rounded-xl transition disabled:opacity-60 text-base mt-1"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-1">
                <div className="w-full border-t border-gray-200" />
                <span className="absolute bg-white px-3 text-xs text-gray-400">or</span>
              </div>

              {/* Google button */}
              <button
                type="button"
                onClick={() => window.location.href = `${serverUrl}/api/auth/google`}
                className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition flex items-center justify-center gap-3 text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Terms */}
              <p className="text-center text-xs text-gray-400 mt-1">
                By signing up, you agree to our{" "}
                <span className="text-red-500 cursor-pointer hover:underline">Terms of Service</span>
                {" "}and{" "}
                <span className="text-red-500 cursor-pointer hover:underline">Privacy Policy</span>
              </p>
            </form>
          </div>
        </div>

        {/* Back to home */}
        <div className="flex justify-center pb-6 shrink-0">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700 transition"
          >
            <FaArrowLeftLong className="w-3.5 h-3.5" />
            Back to home
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp