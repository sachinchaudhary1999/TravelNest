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
    <div className='w-screen h-screen flex items-center justify-center relative bg-white'>
      <button className='absolute top-6 left-5 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/")}>
        <FaArrowLeftLong className='text-white w-5 h-5' />
      </button>

      <form onSubmit={handleSignUp} className='w-full max-w-md px-6 flex flex-col gap-5'>
        <h1 className='text-3xl font-bold text-gray-800'>Create your account</h1>
        <p className='text-gray-500'>Join TravelNest today</p>

        {/* Avatar Upload */}
        <div className='flex flex-col items-center gap-3'>
          <div className='relative'>
            {avatarPreview ? (
              <img src={avatarPreview} className='w-20 h-20 rounded-full object-cover' alt="Profile preview" />
            ) : (
              <div className='w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center'>
                <span className='text-2xl text-gray-500'>👤</span>
              </div>
            )}
            <label className='absolute bottom-0 right-0 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition'>
              <FaCamera className='text-white w-3 h-3' />
              <input type="file" accept="image/*" className='hidden' onChange={handleAvatarChange} />
            </label>
          </div>
          <p className='text-sm text-gray-500'>Add a profile photo (optional)</p>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-700'>Full Name</label>
          <input type="text" required className='w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-red-400' value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-700'>Email</label>
          <input type="email" required className='w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-red-400' value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className='flex flex-col gap-1 relative'>
          <label className='text-sm font-medium text-gray-700'>Password</label>
          <input
            type={show ? "text" : "password"} required minLength={6}
            className='w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-red-400 pr-10'
            value={password} onChange={e => setPassword(e.target.value)}
          />
          <button type="button" className='absolute right-3 bottom-3' onClick={() => setShow(p => !p)}>
            {show ? <IoMdEyeOff className='w-5 h-5 text-gray-500' /> : <IoMdEye className='w-5 h-5 text-gray-500' />}
          </button>
        </div>

        <button type="submit" disabled={loading} className='w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition disabled:opacity-60'>
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <div className='relative flex items-center justify-center'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative bg-white px-4 text-sm text-gray-500'>or</div>
        </div>

        <button
          type="button"
          onClick={() => window.location.href = `${serverUrl}/api/auth/google`}
          className='w-full py-3 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition flex items-center justify-center gap-3'
        >
          <svg className='w-5 h-5' viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className='text-center text-sm text-gray-600'>
          Already have an account?{" "}
          <span className='text-red-500 cursor-pointer font-medium hover:underline' onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  )
}

export default SignUp
