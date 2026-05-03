import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'
import { toast } from 'react-toastify'

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()

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
    <div className='w-screen h-screen flex items-center justify-center bg-white relative'>
      <button className='absolute top-6 left-5 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/login")}>
        <FaArrowLeftLong className='text-white w-5 h-5' />
      </button>

      <div className='w-full max-w-md px-6 flex flex-col gap-5'>
        <h1 className='text-3xl font-bold text-gray-800'>Forgot Password</h1>

        {sent ? (
          <div className='bg-green-50 border border-green-200 rounded-xl p-5 text-green-700'>
            <p className='font-medium'>Check your email!</p>
            <p className='text-sm mt-1'>We've sent a password reset link to <strong>{email}</strong>. It expires in 1 hour.</p>
            <button className='mt-4 text-red-500 text-sm hover:underline' onClick={() => navigate("/login")}>Back to Login</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <p className='text-gray-500 text-sm'>Enter your email and we'll send you a reset link.</p>
            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-gray-700'>Email</label>
              <input
                type="email" required
                className='w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-red-400'
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" disabled={loading} className='w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition disabled:opacity-60'>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
