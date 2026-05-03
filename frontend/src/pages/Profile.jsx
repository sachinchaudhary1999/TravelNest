import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCamera } from "react-icons/fa"
import { FaArrowLeftLong } from "react-icons/fa6"
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Profile() {
  const navigate = useNavigate()
  const { userData, getCurrentUser } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
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
  const initials = userData.name.charAt(0).toUpperCase()

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-8'>
      <div className='max-w-xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/")}>
            <FaArrowLeftLong className='text-white w-4 h-4' />
          </button>
          <h1 className='text-2xl font-bold text-gray-800'>My Profile</h1>
        </div>

        <div className='bg-white rounded-2xl border border-gray-200 p-6 mb-4'>
          {/* Avatar */}
          <div className='flex items-center gap-5 mb-6'>
            <div className='relative'>
              {avatar
                ? <img src={avatar} className='w-20 h-20 rounded-full object-cover' alt="" />
                : <div className='w-20 h-20 rounded-full bg-gray-800 text-white flex items-center justify-center text-3xl font-bold'>{initials}</div>
              }
              {editing && (
                <label className='absolute bottom-0 right-0 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center cursor-pointer'>
                  <FaCamera className='text-white w-3 h-3' />
                  <input type="file" accept="image/*" className='hidden' onChange={handleAvatarChange} />
                </label>
              )}
            </div>
            <div>
              <p className='text-xl font-bold text-gray-800'>{userData.name}</p>
              <p className='text-sm text-gray-500'>{userData.email}</p>
              {userData.role === "admin" && <span className='text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full mt-1 inline-block'>Admin</span>}
            </div>
          </div>

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
                <label className='text-sm font-medium text-gray-700'>Social Links</label>
                <input type="url" className={inp} placeholder="Facebook URL" value={socialLinks.facebook} onChange={e => setSocialLinks({...socialLinks, facebook: e.target.value})} />
                <input type="url" className={inp} placeholder="Instagram URL" value={socialLinks.instagram} onChange={e => setSocialLinks({...socialLinks, instagram: e.target.value})} />
                <input type="url" className={inp} placeholder="Twitter URL" value={socialLinks.twitter} onChange={e => setSocialLinks({...socialLinks, twitter: e.target.value})} />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>Preferences</label>
                <label className='flex items-center gap-2'>
                  <input type="checkbox" checked={preferences.smoking} onChange={e => setPreferences({...preferences, smoking: e.target.checked})} />
                  <span className='text-sm'>Smoking allowed</span>
                </label>
                <label className='flex items-center gap-2'>
                  <input type="checkbox" checked={preferences.pets} onChange={e => setPreferences({...preferences, pets: e.target.checked})} />
                  <span className='text-sm'>Pets allowed</span>
                </label>
                <label className='flex items-center gap-2'>
                  <input type="checkbox" checked={preferences.partying} onChange={e => setPreferences({...preferences, partying: e.target.checked})} />
                  <span className='text-sm'>Partying allowed</span>
                </label>
              </div>
              <div className='flex gap-3 mt-2'>
                <button className='flex-1 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-60' onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button className='flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200' onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className='space-y-3'>
              {userData.bio && <p className='text-gray-600 text-sm'>{userData.bio}</p>}
              {userData.phone && <p className='text-sm text-gray-500'>📞 {userData.phone}</p>}
              {userData.location && <p className='text-sm text-gray-500'>📍 {userData.location}</p>}
              {userData.dob && <p className='text-sm text-gray-500'>🎂 {new Date(userData.dob).toLocaleDateString()}</p>}
              {userData.gender && userData.gender !== 'other' && <p className='text-sm text-gray-500'>👤 {userData.gender}</p>}
              {userData.languages?.length > 0 && <p className='text-sm text-gray-500'>🗣️ {userData.languages.join(", ")}</p>}
              {userData.socialLinks?.facebook && <p className='text-sm text-gray-500'>📘 <a href={userData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline'>Facebook</a></p>}
              {userData.socialLinks?.instagram && <p className='text-sm text-gray-500'>📷 <a href={userData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className='text-pink-500 hover:underline'>Instagram</a></p>}
              {userData.socialLinks?.twitter && <p className='text-sm text-gray-500'>🐦 <a href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className='text-blue-400 hover:underline'>Twitter</a></p>}
              {(userData.preferences?.smoking || userData.preferences?.pets || userData.preferences?.partying) && (
                <div className='text-sm text-gray-500'>
                  <span>🏠 Preferences: </span>
                  {userData.preferences.smoking && <span>Smoking, </span>}
                  {userData.preferences.pets && <span>Pets, </span>}
                  {userData.preferences.partying && <span>Partying</span>}
                </div>
              )}
              <p className='text-sm text-gray-500'>📅 Member since {new Date(userData.createdAt).getFullYear()}</p>
              <p className='text-sm text-gray-500'>🏠 {userData.listing?.length || 0} listing{userData.listing?.length !== 1 ? "s" : ""}</p>
              <button className='mt-2 px-5 py-2 border border-gray-300 rounded-xl text-sm hover:bg-gray-50' onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Change password */}
        <div className='bg-white rounded-2xl border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='font-semibold text-gray-800'>Change Password</h2>
            <button className='text-sm text-red-500 hover:underline' onClick={() => setChangingPw(p => !p)}>
              {changingPw ? "Cancel" : "Change"}
            </button>
          </div>
          {changingPw && (
            <form onSubmit={handleChangePw} className='space-y-3'>
              <Field label="Current Password">
                <input type="password" required className={inp} value={currentPw} onChange={e => setCurrentPw(e.target.value)} />
              </Field>
              <Field label="New Password">
                <input type="password" required minLength={6} className={inp} value={newPw} onChange={e => setNewPw(e.target.value)} />
              </Field>
              <button type="submit" disabled={savingPw} className='w-full py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-60 text-sm'>
                {savingPw ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

const inp = "w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-400 transition"
function Field({ label, children }) {
  return <div><label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>{children}</div>
}

export default Profile
