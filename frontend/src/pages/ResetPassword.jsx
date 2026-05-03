import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'
import { toast } from 'react-toastify'

function ResetPassword() {
  const { token } = useParams()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) { toast.error("Passwords do not match"); return }
    setLoading(true)
    try {
      await axios.post(serverUrl + `/api/auth/reset-password/${token}`, { password })
      setDone(true)
      toast.success("Password reset successful!")
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed. Link may have expired.")
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='text-center'>
        <p className='text-2xl font-bold text-gray-800 mb-2'>Password Reset!</p>
        <p className='text-gray-500 mb-6'>You can now login with your new password.</p>
        <button className='px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600' onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    </div>
  )

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-white'>
      <form onSubmit={handleSubmit} className='w-full max-w-md px-6 flex flex-col gap-5'>
        <h1 className='text-3xl font-bold text-gray-800'>Reset Password</h1>

        <div className='flex flex-col gap-1 relative'>
          <label className='text-sm font-medium'>New Password</label>
          <input type={show ? "text" : "password"} required minLength={6}
            className='border-2 border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-red-400 pr-10'
            value={password} onChange={e => setPassword(e.target.value)} />
          <button type="button" className='absolute right-3 bottom-3' onClick={() => setShow(p => !p)}>
            {show ? <IoMdEyeOff className='w-5 h-5 text-gray-500' /> : <IoMdEye className='w-5 h-5 text-gray-500' />}
          </button>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>Confirm Password</label>
          <input type="password" required
            className='border-2 border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-red-400'
            value={confirm} onChange={e => setConfirm(e.target.value)} />
        </div>

        <button type="submit" disabled={loading} className='w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 disabled:opacity-60'>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
