import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUsers, FaHome, FaCalendarCheck } from "react-icons/fa"
import { FaArrowLeftLong } from "react-icons/fa6"
import { MdAttachMoney, MdPending } from "react-icons/md"
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const tabs = ["Dashboard", "Users", "Listings", "Bookings"]

function AdminPanel() {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [listings, setListings] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const [s, u, l, b] = await Promise.all([
          axios.get(serverUrl + "/api/admin/stats", { withCredentials: true }),
          axios.get(serverUrl + "/api/admin/users", { withCredentials: true }),
          axios.get(serverUrl + "/api/admin/listings", { withCredentials: true }),
          axios.get(serverUrl + "/api/admin/bookings", { withCredentials: true }),
        ])
        setStats(s.data); setUsers(u.data.users); setListings(l.data.listings); setBookings(b.data.bookings)
      } catch (err) {
        toast.error("Could not load admin data")
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const approveListing = async (id) => {
    try {
      await axios.patch(serverUrl + `/api/admin/listing/approve/${id}`, {}, { withCredentials: true })
      setListings(prev => prev.map(l => l._id === id ? { ...l, status: "approved" } : l))
      toast.success("Listing approved")
    } catch { toast.error("Failed") }
  }

  const rejectListing = async (id) => {
    try {
      await axios.patch(serverUrl + `/api/admin/listing/reject/${id}`, {}, { withCredentials: true })
      setListings(prev => prev.map(l => l._id === id ? { ...l, status: "rejected" } : l))
      toast.success("Listing rejected")
    } catch { toast.error("Failed") }
  }

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return
    try {
      await axios.delete(serverUrl + `/api/admin/user/${id}`, { withCredentials: true })
      setUsers(prev => prev.filter(u => u._id !== id))
      toast.success("User deleted")
    } catch { toast.error("Failed") }
  }

  const deleteListingAdmin = async (id) => {
    if (!window.confirm("Delete this listing?")) return
    try {
      await axios.delete(serverUrl + `/api/admin/listing/${id}`, { withCredentials: true })
      setListings(prev => prev.filter(l => l._id !== id))
      toast.success("Listing deleted")
    } catch { toast.error("Failed") }
  }

  if (loading) return <div className='flex items-center justify-center h-screen'><div className='animate-spin rounded-full h-10 w-10 border-b-2 border-red-500' /></div>

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4'>
        <button className='w-9 h-9 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/")}>
          <FaArrowLeftLong className='text-white w-3.5 h-3.5' />
        </button>
        <h1 className='text-xl font-bold text-gray-800'>Admin Panel</h1>
        <div className='flex gap-1 ml-auto overflow-x-auto'>
          {tabs.map(t => (
            <button key={t}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${activeTab === t ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 py-6'>
        {/* Dashboard */}
        {activeTab === "Dashboard" && stats && (
          <div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
              <StatCard icon={<FaUsers className='w-6 h-6 text-blue-500' />} label="Total Users" value={stats.totalUsers} color="bg-blue-50" />
              <StatCard icon={<FaHome className='w-6 h-6 text-green-500' />} label="Total Listings" value={stats.totalListings} color="bg-green-50" />
              <StatCard icon={<FaCalendarCheck className='w-6 h-6 text-purple-500' />} label="Total Bookings" value={stats.totalBookings} color="bg-purple-50" />
              <StatCard icon={<MdAttachMoney className='w-6 h-6 text-yellow-500' />} label="Total Revenue" value={`₹${stats.totalRevenue?.toLocaleString()}`} color="bg-yellow-50" />
            </div>
            {stats.pendingListings > 0 && (
              <div className='bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-center gap-3'>
                <MdPending className='w-6 h-6 text-orange-500' />
                <p className='text-orange-700 font-medium'>{stats.pendingListings} listing{stats.pendingListings > 1 ? "s" : ""} awaiting approval</p>
                <button className='ml-auto text-sm text-orange-600 hover:underline' onClick={() => setActiveTab("Listings")}>Review →</button>
              </div>
            )}
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>Recent Bookings</h2>
            <div className='bg-white rounded-2xl border border-gray-200 overflow-hidden'>
              {stats.recentBookings?.map(b => (
                <div key={b._id} className='flex items-center gap-4 px-4 py-3 border-b border-gray-100 last:border-0'>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-800'>{b.listing?.title}</p>
                    <p className='text-xs text-gray-500'>{b.guest?.name} · {b.listing?.city}</p>
                  </div>
                  <span className='text-sm font-bold text-gray-900'>₹{b.totalRent}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === "Users" && (
          <div>
            <p className='text-sm text-gray-500 mb-4'>{users.length} users</p>
            <div className='bg-white rounded-2xl border border-gray-200 overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead className='bg-gray-50 text-left'>
                    <tr>
                      <Th>User</Th><Th>Email</Th><Th>Role</Th><Th>Joined</Th><Th>Actions</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id} className='border-t border-gray-100 hover:bg-gray-50'>
                        <td className='px-4 py-3'>
                          <div className='flex items-center gap-2'>
                            {u.avatar ? <img src={u.avatar} className='w-7 h-7 rounded-full object-cover' alt="" /> : <div className='w-7 h-7 rounded-full bg-gray-700 text-white text-xs flex items-center justify-center font-bold'>{u.name?.charAt(0)}</div>}
                            <span className='font-medium text-gray-800 truncate max-w-[120px]'>{u.name}</span>
                          </div>
                        </td>
                        <Td>{u.email}</Td>
                        <td className='px-4 py-3'>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === "admin" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}>{u.role}</span>
                        </td>
                        <Td>{new Date(u.createdAt).toLocaleDateString()}</Td>
                        <td className='px-4 py-3'>
                          {u.role !== "admin" && (
                            <button className='text-xs text-red-500 hover:underline' onClick={() => deleteUser(u._id)}>Delete</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Listings */}
        {activeTab === "Listings" && (
          <div>
            <p className='text-sm text-gray-500 mb-4'>{listings.length} listings</p>
            <div className='space-y-3'>
              {listings.map(l => (
                <div key={l._id} className='bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4'>
                  {l.images?.[0] && <img src={l.images[0]} className='w-16 h-14 rounded-xl object-cover flex-shrink-0' alt="" />}
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 mb-0.5'>
                      <p className='font-medium text-gray-800 truncate'>{l.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${l.status === "approved" ? "bg-green-100 text-green-700" : l.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-600"}`}>{l.status}</span>
                    </div>
                    <p className='text-xs text-gray-500'>{l.city} · by {l.host?.name}</p>
                    <p className='text-xs text-gray-500'>₹{l.rent}/night</p>
                  </div>
                  <div className='flex gap-2 flex-shrink-0'>
                    {l.status !== "approved" && <button className='text-xs px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600' onClick={() => approveListing(l._id)}>Approve</button>}
                    {l.status !== "rejected" && <button className='text-xs px-3 py-1.5 bg-orange-400 text-white rounded-lg hover:bg-orange-500' onClick={() => rejectListing(l._id)}>Reject</button>}
                    <button className='text-xs px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600' onClick={() => deleteListingAdmin(l._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings */}
        {activeTab === "Bookings" && (
          <div>
            <p className='text-sm text-gray-500 mb-4'>{bookings.length} bookings</p>
            <div className='bg-white rounded-2xl border border-gray-200 overflow-hidden'>
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead className='bg-gray-50 text-left'>
                    <tr><Th>Listing</Th><Th>Guest</Th><Th>Dates</Th><Th>Amount</Th><Th>Status</Th></tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b._id} className='border-t border-gray-100 hover:bg-gray-50'>
                        <Td>{b.listing?.title || "—"}</Td>
                        <Td>{b.guest?.name}</Td>
                        <td className='px-4 py-3 text-xs text-gray-600'>{new Date(b.checkIn).toLocaleDateString()} – {new Date(b.checkOut).toLocaleDateString()}</td>
                        <Td>₹{b.totalRent}</Td>
                        <td className='px-4 py-3'>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${b.status === "booked" ? "bg-green-100 text-green-700" : b.status === "cancelled" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}>{b.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`${color} rounded-2xl p-4`}>
      {icon}
      <p className='text-2xl font-bold text-gray-800 mt-2'>{value}</p>
      <p className='text-sm text-gray-500'>{label}</p>
    </div>
  )
}
function Th({ children }) { return <th className='px-4 py-3 text-xs font-semibold text-gray-600 uppercase'>{children}</th> }
function Td({ children }) { return <td className='px-4 py-3 text-gray-700 truncate max-w-[150px]'>{children}</td> }

export default AdminPanel
