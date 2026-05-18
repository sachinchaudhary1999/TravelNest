import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCamera } from "react-icons/fa"
import { FaArrowLeftLong } from "react-icons/fa6"
import {
  FiMail, FiCalendar, FiHome, FiShield, FiChevronRight,
  FiBookmark, FiHeart, FiStar, FiSettings, FiEdit2,
  FiPhone, FiUser, FiLock
} from "react-icons/fi"
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import { useTheme } from '../Context/ThemeContext'
import Navbar from '../Component/layout/NavBar'
import Footer from '../Component/layout/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

const inp = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#FF385C] focus:ring-2 focus:ring-red-50 transition bg-white"

function Field({ label, children }) {
  return (
    <div>
      <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5'>
        {label}
      </label>
      {children}
    </div>
  )
}

function QuickLink({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className='w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-200 group'
    >
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0'>
          {icon}
        </div>
        <span className='text-sm font-medium text-gray-700'>{label}</span>
      </div>
      <FiChevronRight className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors' />
    </button>
  )
}

function Profile() {
  const navigate = useNavigate()
  const { userData, getCurrentUser } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { isDarkMode } = useTheme()

  // ── ALL ORIGINAL STATE UNTOUCHED ─────────────────────────────
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(userData?.name || "")
  const [bio, setBio] = useState(userData?.bio || "")
  const [phone, setPhone] = useState(userData?.phone || "")
  const [location, setLocation] = useState(userData?.location || "")
  const [dob, setDob] = useState(userData?.dob ? new Date(userData.dob).toISOString().split('T')[0] : "")
  const [gender, setGender] = useState(userData?.gender || "other")
  const [socialLinks, setSocialLinks] = useState(userData?.socialLinks || { facebook: "", instagram: "", twitter: "" })
  const [preferences, setPreferences] = useState(userData?.preferences || { smoking: false, pets: false, partying: false })
  const [languages, setLanguages] = useState(userData?.languages?.join(", ") || "")
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const [changingPw, setChangingPw] = useState(false)
  const [currentPw, setCurrentPw] = useState("")
  const [newPw, setNewPw] = useState("")
  const [savingPw, setSavingPw] = useState(false)

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) { setAvatarFile(file); setAvatarPreview(URL.createObjectURL(file)) }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append("name", name)
      fd.append("bio", bio)
      fd.append("phone", phone)
      fd.append("location", location)
      if (dob) fd.append("dob", dob)
      fd.append("gender", gender)
      fd.append("socialLinks", JSON.stringify(socialLinks))
      fd.append("preferences", JSON.stringify(preferences))
      fd.append("languages", languages.split(",").map(l => l.trim()).filter(l => l))
      if (avatarFile) fd.append("avatar", avatarFile)
      await axios.put(serverUrl + "/api/user/update", fd, { withCredentials: true })
      await getCurrentUser()
      toast.success("Profile updated!")
      setEditing(false)
      setAvatarFile(null); setAvatarPreview(null)
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed")
    } finally {
      setSaving(false)
    }
  }

  const handleChangePw = async (e) => {
    e.preventDefault()
    setSavingPw(true)
    try {
      await axios.put(serverUrl + "/api/user/change-password", { currentPassword: currentPw, newPassword: newPw }, { withCredentials: true })
      toast.success("Password changed!")
      setCurrentPw(""); setNewPw(""); setChangingPw(false)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed")
    } finally {
      setSavingPw(false)
    }
  }

  if (!userData) return null

  const avatar = avatarPreview || userData.avatar
  const initials = userData.name?.charAt(0)?.toUpperCase()
  const memberSince = new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const bg = isDarkMode ? "bg-[#0f172a]" : "bg-gray-50"
  const card = isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
  const text = isDarkMode ? "text-white" : "text-gray-900"
  const subtext = isDarkMode ? "text-slate-400" : "text-gray-500"

  return (
    <div className={`min-h-screen ${bg}`}>
      <Navbar />

      <div className={`pt-[70px] md:pt-[80px]`}>
        <div className='max-w-[1100px] mx-auto px-4 md:px-6 py-10'>

          {/* HEADER */}
          <div className='flex items-center gap-4 mb-8'>
            <button
              onClick={() => navigate("/")}
              className='w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-all duration-200'
            >
              <FaArrowLeftLong className='text-[#FF385C] w-4 h-4' />
            </button>
            <h1 className={`text-2xl font-bold ${text}`}>My Profile</h1>
          </div>

          {/* ── MAIN PROFILE CARD ───────────────────────────────── */}
          <div className={`rounded-2xl border ${card} p-6 md:p-8 mb-4`}>
            <div className='flex flex-col md:flex-row gap-8'>

              {/* LEFT — Avatar + Info */}
              <div className='flex flex-col sm:flex-row md:flex-row gap-6 flex-1'>

                {/* AVATAR */}
                <div className='relative flex-shrink-0 self-start'>
                  <div className='w-32 h-32 rounded-full overflow-hidden ring-4 ring-red-50'>
                    {avatar
                      ? <img src={avatar} className='w-full h-full object-cover' alt="avatar" />
                      : <div className='w-full h-full bg-gray-800 text-white flex items-center justify-center text-4xl font-bold'>{initials}</div>
                    }
                  </div>
                  {editing && (
                    <label className='absolute bottom-1 right-1 w-9 h-9 bg-[#FF385C] rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-[#E31C5F] transition-all'>
                      <FaCamera className='text-white w-4 h-4' />
                      <input type="file" accept="image/*" className='hidden' onChange={handleAvatarChange} />
                    </label>
                  )}
                </div>

                {/* USER INFO */}
                <div className='flex-1 min-w-0'>
                  {editing ? (
                    <div className='space-y-4'>
                      <Field label="Full Name">
                        <input type="text" className={inp} value={name} onChange={e => setName(e.target.value)} />
                      </Field>
                      <Field label="Bio">
                        <textarea className={`${inp} resize-none`} rows={3} value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell guests about yourself..." />
                      </Field>
                      <Field label="Phone">
                        <input type="tel" className={inp} value={phone} onChange={e => setPhone(e.target.value)} />
                      </Field>
                      <Field label="Location">
                        <input type="text" className={inp} value={location} onChange={e => setLocation(e.target.value)} placeholder="City, Country" />
                      </Field>
                      <Field label="Date of Birth">
                        <input type="date" className={inp} value={dob} onChange={e => setDob(e.target.value)} />
                      </Field>
                      <Field label="Gender">
                        <select className={inp} value={gender} onChange={e => setGender(e.target.value)}>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </Field>
                      <Field label="Languages">
                        <input type="text" className={inp} value={languages} onChange={e => setLanguages(e.target.value)} placeholder="English, Hindi, etc." />
                      </Field>
                      <div className='space-y-2'>
                        <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Social Links</label>
                        <input type="url" className={inp} placeholder="Facebook URL" value={socialLinks.facebook} onChange={e => setSocialLinks({...socialLinks, facebook: e.target.value})} />
                        <input type="url" className={inp} placeholder="Instagram URL" value={socialLinks.instagram} onChange={e => setSocialLinks({...socialLinks, instagram: e.target.value})} />
                        <input type="url" className={inp} placeholder="Twitter URL" value={socialLinks.twitter} onChange={e => setSocialLinks({...socialLinks, twitter: e.target.value})} />
                      </div>
                      <div className='space-y-2'>
                        <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Preferences</label>
                        {[
                          { key: 'smoking', label: 'Smoking allowed' },
                          { key: 'pets', label: 'Pets allowed' },
                          { key: 'partying', label: 'Partying allowed' },
                        ].map(p => (
                          <label key={p.key} className='flex items-center gap-2 cursor-pointer'>
                            <input
                              type="checkbox"
                              checked={preferences[p.key]}
                              onChange={e => setPreferences({...preferences, [p.key]: e.target.checked})}
                              className='accent-[#FF385C]'
                            />
                            <span className={`text-sm ${subtext}`}>{p.label}</span>
                          </label>
                        ))}
                      </div>
                      <div className='flex gap-3 pt-2'>
                        <button
                          className='flex-1 py-2.5 bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-xl text-sm font-semibold disabled:opacity-60 transition-all'
                          onClick={handleSave}
                          disabled={saving}
                        >
                          {saving ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${isDarkMode ? "border-slate-600 text-white hover:bg-slate-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                          onClick={() => setEditing(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                  ) : (
                    <div>
                      {/* NAME + EDIT */}
                      <div className='flex items-center gap-3 mb-4 flex-wrap'>
                        <h2 className={`text-2xl font-bold ${text}`}>{userData.name}</h2>
                        {userData.role === "admin" && (
                          <span className='text-xs bg-red-100 text-red-600 px-2.5 py-1 rounded-full font-semibold'>Admin</span>
                        )}
                        <button
                          onClick={() => setEditing(true)}
                          className='flex items-center gap-1.5 text-sm text-[#FF385C] border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-full transition-all duration-200'
                        >
                          <FiEdit2 className='w-3.5 h-3.5' />
                          Edit Profile
                        </button>
                      </div>

                      {/* INFO ROWS */}
                      <div className='space-y-3'>
                        <div className='flex items-center gap-3'>
                          <FiMail className='w-4 h-4 text-[#FF385C] flex-shrink-0' />
                          <span className={`text-sm ${subtext}`}>{userData.email}</span>
                        </div>
                        <div className='flex items-center gap-3'>
                          <FiCalendar className='w-4 h-4 text-[#FF385C] flex-shrink-0' />
                          <div>
                            <p className={`text-xs ${subtext}`}>Member since</p>
                            <p className={`text-sm font-medium ${text}`}>{memberSince}</p>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <FiHome className='w-4 h-4 text-[#FF385C] flex-shrink-0' />
                          <div>
                            <p className={`text-xs ${subtext}`}>Total Listings</p>
                            <p className={`text-sm font-medium ${text}`}>{userData.listing?.length || 0} listing{userData.listing?.length !== 1 ? "s" : ""}</p>
                          </div>
                        </div>
                        {userData.phone && (
                          <div className='flex items-center gap-3'>
                            <FiPhone className='w-4 h-4 text-[#FF385C] flex-shrink-0' />
                            <span className={`text-sm ${subtext}`}>{userData.phone}</span>
                          </div>
                        )}
                        {userData.bio && (
                          <p className={`text-sm ${subtext} mt-1`}>{userData.bio}</p>
                        )}
                        <div className={`border-t ${isDarkMode ? "border-slate-700" : "border-gray-100"} pt-3`}>
                          <div className='flex items-center gap-3'>
                            <FiShield className='w-4 h-4 text-[#FF385C] flex-shrink-0' />
                            <span className={`text-sm ${subtext}`}>Account Status</span>
                            <span className='flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-semibold'>
                              Verified ✓
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT — Quick Links */}
              {!editing && (
                <div className={`w-full md:w-[260px] flex-shrink-0 border-t md:border-t-0 md:border-l ${isDarkMode ? "border-slate-700" : "border-gray-100"} pt-6 md:pt-0 md:pl-8`}>
                  <h3 className={`text-sm font-bold ${text} mb-2 px-4`}>Quick Links</h3>
                  <div className='flex flex-col'>
                    <QuickLink icon={<FiHome className='w-4 h-4 text-[#FF385C]' />} label="My Listings" onClick={() => navigate("/mylisting")} />
                    <QuickLink icon={<FiBookmark className='w-4 h-4 text-[#FF385C]' />} label="My Bookings" onClick={() => navigate("/mybooking")} />
                    <QuickLink icon={<FiHeart className='w-4 h-4 text-[#FF385C]' />} label="Wishlist" onClick={() => navigate("/wishlist")} />
                    <QuickLink icon={<FiStar className='w-4 h-4 text-[#FF385C]' />} label="Reviews" onClick={() => navigate("/reviews")} />
                    <QuickLink icon={<FiSettings className='w-4 h-4 text-[#FF385C]' />} label="Settings" onClick={() => navigate("/settings")} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── CHANGE PASSWORD CARD ─────────────────────────────── */}
          <div className={`rounded-2xl border ${card} p-6 md:p-8 mb-4`}>
            <div className='flex items-start justify-between gap-4'>
              <div className='flex items-start gap-4'>
                <div className='w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <FiLock className='w-5 h-5 text-[#FF385C]' />
                </div>
                <div>
                  <h2 className={`text-base font-bold ${text}`}>Change Password</h2>
                  <p className={`text-sm ${subtext} mt-0.5`}>Keep your account secure by using a strong password</p>
                  {!changingPw && (
                    <div className='flex items-center gap-2 mt-3'>
                      <FiLock className={`w-4 h-4 ${subtext}`} />
                      <span className={`text-sm tracking-[6px] ${subtext}`}>••••••••</span>
                    </div>
                  )}
                </div>
              </div>

              {!changingPw && (
                <button
                  onClick={() => setChangingPw(true)}
                  className='flex items-center gap-2 h-11 px-5 rounded-xl border border-[#FF385C] text-[#FF385C] text-sm font-semibold hover:bg-red-50 transition-all duration-200 flex-shrink-0'
                >
                  Change
                  <FiChevronRight className='w-4 h-4' />
                </button>
              )}
            </div>

            {changingPw && (
              <form onSubmit={handleChangePw} className='mt-6 space-y-4 max-w-md'>
                <Field label="Current Password">
                  <input type="password" required className={inp} value={currentPw} onChange={e => setCurrentPw(e.target.value)} />
                </Field>
                <Field label="New Password">
                  <input type="password" required minLength={6} className={inp} value={newPw} onChange={e => setNewPw(e.target.value)} />
                </Field>
                <div className='flex gap-3'>
                  <button
                    type="submit"
                    disabled={savingPw}
                    className='flex-1 py-2.5 bg-[#FF385C] hover:bg-[#E31C5F] text-white rounded-xl text-sm font-semibold disabled:opacity-60 transition-all'
                  >
                    {savingPw ? "Updating..." : "Update Password"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setChangingPw(false)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${isDarkMode ? "border-slate-600 text-white hover:bg-slate-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ── ACCOUNT INFORMATION CARD ─────────────────────────── */}
          <div className={`rounded-2xl border ${card} p-6 md:p-8`}>
            <h2 className={`text-base font-bold ${text} mb-6`}>Account Information</h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100'>

              {/* FULL NAME */}
              <div className='flex items-center gap-4 py-4 sm:py-0 sm:px-6 first:pl-0 last:pr-0'>
                <div className='w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0'>
                  <FiUser className='w-5 h-5 text-[#FF385C]' />
                </div>
                <div className='min-w-0'>
                  <p className={`text-xs ${subtext} mb-0.5`}>Full Name</p>
                  <p className={`text-sm font-semibold ${text} truncate`}>{userData.name}</p>
                </div>
              </div>

              {/* EMAIL */}
              <div className='flex items-center gap-4 py-4 sm:py-0 sm:px-6'>
                <div className='w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0'>
                  <FiMail className='w-5 h-5 text-[#FF385C]' />
                </div>
                <div className='min-w-0'>
                  <p className={`text-xs ${subtext} mb-0.5`}>Email Address</p>
                  <p className={`text-sm font-semibold ${text} truncate`}>{userData.email}</p>
                </div>
              </div>

              {/* PHONE */}
              <div className='flex items-center gap-4 py-4 sm:py-0 sm:px-6'>
                <div className='w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0'>
                  <FiPhone className='w-5 h-5 text-[#FF385C]' />
                </div>
                <div className='min-w-0'>
                  <p className={`text-xs ${subtext} mb-0.5`}>Phone Number</p>
                  <p className={`text-sm font-semibold ${text} truncate`}>
                    {userData.phone || "Not added"}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Profile;
