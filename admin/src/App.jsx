import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaCalendarCheck, FaCheck, FaEye, FaHome, FaTrash, FaUsers } from "react-icons/fa"
import { MdBlock, MdDashboard, MdFlag, MdOutlinePendingActions } from "react-icons/md"
import { IoClose, IoLogOutOutline, IoShieldCheckmark } from "react-icons/io5"
import logo from './assets/travelnest-favicon.svg'

const serverUrl = import.meta.env.VITE_SERVER_URL || ""

const tabs = [
  { key: "Dashboard", icon: <MdDashboard /> },
  { key: "Users", icon: <FaUsers /> },
  { key: "Listings", icon: <FaHome /> },
  { key: "Reports", icon: <MdFlag /> },
  { key: "Bookings", icon: <FaCalendarCheck /> },
]

function App() {
  const [admin, setAdmin] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  const checkAdmin = async () => {
    setCheckingAuth(true)
    try {
      const res = await axios.get(serverUrl + "/api/user/currentuser", { withCredentials: true })
      if (res.data.role !== "admin") {
        setAdmin(null)
        toast.error("Admin access required")
        return
      }
      setAdmin(res.data)
    } catch {
      setAdmin(null)
    } finally {
      setCheckingAuth(false)
    }
  }

  useEffect(() => { checkAdmin() }, [])

  if (checkingAuth) {
    return <div className='min-h-screen grid place-items-center bg-gray-50'><div className='h-10 w-10 rounded-full border-b-2 border-red-500 animate-spin' /></div>
  }

  return admin ? <AdminDashboard admin={admin} onLogout={() => setAdmin(null)} /> : <AdminLogin onSuccess={setAdmin} />
}

function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true })
      const user = await axios.get(serverUrl + "/api/user/currentuser", { withCredentials: true })
      if (user.data.role !== "admin") {
        await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true })
        toast.error("This account is not an admin")
        return
      }
      onSuccess(user.data)
      toast.success("Welcome to TravelNestAdmin")
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <form onSubmit={handleSubmit} className='w-full max-w-md bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
        <div className='flex items-center gap-3 mb-6'>
          <img src={logo} className='w-11 h-11 rounded-xl' alt='TravelNest logo' />
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>TravelNestAdmin</h1>
            <p className='text-sm text-gray-500'>Secure admin sign in</p>
          </div>
        </div>
        <div className='space-y-4'>
          <Field label='Email'>
            <input type='email' required className={input} value={email} onChange={e => setEmail(e.target.value)} />
          </Field>
          <Field label='Password'>
            <input type='password' required className={input} value={password} onChange={e => setPassword(e.target.value)} />
          </Field>
        </div>
        <button disabled={loading} className='w-full mt-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:opacity-60'>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  )
}

function AdminDashboard({ admin, onLogout }) {
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [listings, setListings] = useState([])
  const [bookings, setBookings] = useState([])
  const [reports, setReports] = useState([])
  const [selectedListing, setSelectedListing] = useState(null)
  const [loading, setLoading] = useState(true)

  const pendingListings = useMemo(() => listings.filter(l => l.status === "pending"), [listings])
  const openReports = useMemo(() => reports.filter(r => r.status === "open"), [reports])

  const fetchAdminData = async () => {
    setLoading(true)
    try {
      const [s, u, l, b, r] = await Promise.all([
        axios.get(serverUrl + "/api/admin/stats", { withCredentials: true }),
        axios.get(serverUrl + "/api/admin/users?limit=100", { withCredentials: true }),
        axios.get(serverUrl + "/api/admin/listings?limit=100", { withCredentials: true }),
        axios.get(serverUrl + "/api/admin/bookings?limit=100", { withCredentials: true }),
        axios.get(serverUrl + "/api/admin/reports?limit=100", { withCredentials: true }),
      ])
      setStats(s.data)
      setUsers(u.data.users || [])
      setListings(l.data.listings || [])
      setBookings(b.data.bookings || [])
      setReports(r.data.reports || [])
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load admin data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAdminData() }, [])

  const logout = async () => {
    await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true }).catch(() => {})
    onLogout()
  }

  const updateListingStatus = async (id, status) => {
    try {
      await axios.patch(serverUrl + `/api/admin/listing/${status}/${id}`, {}, { withCredentials: true })
      setListings(prev => prev.map(l => l._id === id ? { ...l, status: status === "approve" ? "approved" : "rejected" } : l))
      toast.success(status === "approve" ? "Listing approved" : "Listing rejected")
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed")
    }
  }

  const toggleBlock = async (user) => {
    try {
      const action = user.isBlocked ? "unblock" : "block"
      await axios.patch(serverUrl + `/api/admin/user/${action}/${user._id}`, {}, { withCredentials: true })
      setUsers(prev => prev.map(u => u._id === user._id ? { ...u, isBlocked: !u.isBlocked } : u))
      toast.success(user.isBlocked ? "User unblocked" : "User blocked")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update user")
    }
  }

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user and their listings?")) return
    try {
      await axios.delete(serverUrl + `/api/admin/user/${id}`, { withCredentials: true })
      setUsers(prev => prev.filter(u => u._id !== id))
      setListings(prev => prev.filter(l => (l.host?._id || l.host) !== id))
      toast.success("User deleted")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete user")
    }
  }

  const deleteListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return
    try {
      await axios.delete(serverUrl + `/api/admin/listing/${id}`, { withCredentials: true })
      setListings(prev => prev.filter(l => l._id !== id))
      setReports(prev => prev.filter(r => (r.listing?._id || r.listing) !== id))
      toast.success("Listing deleted")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete listing")
    }
  }

  const updateReport = async (id, status) => {
    try {
      const res = await axios.patch(serverUrl + `/api/admin/report/${id}`, { status }, { withCredentials: true })
      setReports(prev => prev.map(r => r._id === id ? res.data.report : r))
      toast.success(status === "reviewed" ? "Report marked reviewed" : "Report dismissed")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update report")
    }
  }

  if (loading) {
    return <div className='min-h-screen grid place-items-center bg-gray-50'><div className='h-10 w-10 rounded-full border-b-2 border-red-500 animate-spin' /></div>
  }

  return (
    <div className='min-h-screen bg-gray-50 text-gray-900 md:flex'>
      <aside className='md:fixed md:inset-y-0 md:left-0 md:w-72 bg-white border-r border-gray-200'>
        <div className='h-20 px-5 flex items-center gap-3 border-b border-gray-100'>
          <img src={logo} className='w-10 h-10 rounded-xl' alt='TravelNest logo' />
          <div>
            <h1 className='text-xl font-bold text-gray-900'>TravelNestAdmin</h1>
            <p className='text-xs text-gray-500'>{admin.email}</p>
          </div>
        </div>
        <nav className='p-4 flex md:block gap-2 overflow-x-auto'>
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === tab.key ? "bg-red-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className='text-lg'>{tab.icon}</span>
              {tab.key}
              {tab.key === "Listings" && pendingListings.length > 0 && <Badge>{pendingListings.length}</Badge>}
              {tab.key === "Reports" && openReports.length > 0 && <Badge>{openReports.length}</Badge>}
            </button>
          ))}
        </nav>
      </aside>

      <main className='md:ml-72 flex-1'>
        <header className='h-20 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center gap-4 sticky top-0 z-10'>
          <div>
            <h2 className='text-2xl font-bold'>{activeTab}</h2>
            <p className='text-sm text-gray-500'>Control users, listings, reports, and bookings securely.</p>
          </div>
          <button className='ml-auto px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50' onClick={fetchAdminData}>Refresh</button>
          <button className='px-4 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-800 flex items-center gap-2' onClick={logout}><IoLogOutOutline /> Logout</button>
        </header>

        <section className='p-4 md:p-8'>
          {activeTab === "Dashboard" && (
            <>
              <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8'>
                <StatCard icon={<FaUsers />} label="Users" value={stats?.totalUsers || 0} tone="blue" />
                <StatCard icon={<FaHome />} label="Listings" value={stats?.totalListings || 0} tone="green" />
                <StatCard icon={<FaCalendarCheck />} label="Active Bookings" value={stats?.activeBookings || 0} tone="purple" />
                <StatCard icon={<MdFlag />} label="Open Reports" value={stats?.openReports || 0} tone="red" />
              </div>
              <div className='grid lg:grid-cols-2 gap-4'>
                <Panel title="Moderation Queue" subtitle={`${pendingListings.length} pending listings, ${openReports.length} open reports`}>
                  <QueueRow icon={<MdOutlinePendingActions />} label="Pending listing approvals" value={pendingListings.length} onClick={() => setActiveTab("Listings")} />
                  <QueueRow icon={<MdFlag />} label="Open listing reports" value={openReports.length} onClick={() => setActiveTab("Reports")} />
                  <QueueRow icon={<MdBlock />} label="Blocked users" value={stats?.blockedUsers || 0} onClick={() => setActiveTab("Users")} />
                </Panel>
                <Panel title="Recent Bookings" subtitle="Latest guest activity">
                  {stats?.recentBookings?.length ? stats.recentBookings.map(b => (
                    <div key={b._id} className='flex items-center justify-between py-3 border-b border-gray-100 last:border-0'>
                      <div>
                        <p className='text-sm font-medium'>{b.listing?.title || "Listing"}</p>
                        <p className='text-xs text-gray-500'>{b.guest?.name || "Guest"} · {b.listing?.city || "City"}</p>
                      </div>
                      <span className='text-sm font-semibold'>Rs {b.totalRent}</span>
                    </div>
                  )) : <Empty text="No bookings yet" />}
                </Panel>
              </div>
            </>
          )}

          {activeTab === "Users" && (
            <Panel title="User Management" subtitle="View all users, block access, delete accounts, and inspect ownership.">
              <Table headers={["User", "Email", "Role", "Listings", "Status", "Actions"]}>
                {users.map(user => (
                  <tr key={user._id} className='border-t border-gray-100 hover:bg-gray-50'>
                    <td className='px-4 py-3'>
                      <div className='flex items-center gap-3'>
                        {user.avatar ? <img src={user.avatar} className='w-9 h-9 rounded-full object-cover' alt='' /> : <div className='w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold'>{user.name?.charAt(0)}</div>}
                        <div><p className='font-medium'>{user.name}</p><p className='text-xs text-gray-500'>Joined {new Date(user.createdAt).toLocaleDateString()}</p></div>
                      </div>
                    </td>
                    <Td>{user.email}</Td>
                    <Td><StatusPill status={user.role} /></Td>
                    <Td>{user.listing?.length || 0}</Td>
                    <Td><StatusPill status={user.isBlocked ? "blocked" : "active"} /></Td>
                    <td className='px-4 py-3'>
                      {user.role !== "admin" && <div className='flex gap-2'><IconButton label={user.isBlocked ? "Unblock" : "Block"} onClick={() => toggleBlock(user)} icon={user.isBlocked ? <IoShieldCheckmark /> : <MdBlock />} /><IconButton label="Delete" danger onClick={() => deleteUser(user._id)} icon={<FaTrash />} /></div>}
                    </td>
                  </tr>
                ))}
              </Table>
            </Panel>
          )}

          {activeTab === "Listings" && (
            <Panel title="Listing Management" subtitle="View all listings, approve, reject, and remove inappropriate properties.">
              <div className='grid lg:grid-cols-2 gap-4'>
                {listings.map(listing => (
                  <div key={listing._id} className='bg-white border border-gray-200 rounded-lg p-4 flex gap-4'>
                    {listing.images?.[0] ? <img src={listing.images[0]} className='w-28 h-24 rounded-lg object-cover flex-shrink-0' alt='' /> : <div className='w-28 h-24 rounded-lg bg-gray-100 flex-shrink-0' />}
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center gap-2'><p className='font-semibold truncate'>{listing.title}</p><StatusPill status={listing.status} /></div>
                      <p className='text-sm text-gray-500'>{listing.landMark}, {listing.city}</p>
                      <p className='text-sm text-gray-500'>By {listing.host?.name || "Unknown"} · Rs {listing.rent}/night</p>
                      <div className='flex flex-wrap gap-2 mt-3'>
                        <ActionButton label="View" icon={<FaEye />} muted onClick={() => setSelectedListing(listing)} />
                        {listing.status !== "approved" && <ActionButton label="Approve" icon={<FaCheck />} onClick={() => updateListingStatus(listing._id, "approve")} />}
                        {listing.status !== "rejected" && <ActionButton label="Reject" icon={<IoClose />} muted onClick={() => updateListingStatus(listing._id, "reject")} />}
                        <ActionButton label="Delete" danger icon={<FaTrash />} onClick={() => deleteListing(listing._id)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          )}

          {activeTab === "Reports" && (
            <Panel title="Reports And Moderation" subtitle="Review user reports and take action on unsafe listings.">
              <Table headers={["Listing", "Reporter", "Reason", "Status", "Actions"]}>
                {reports.map(report => (
                  <tr key={report._id} className='border-t border-gray-100 hover:bg-gray-50'>
                    <td className='px-4 py-3'><p className='font-medium'>{report.listing?.title || "Deleted listing"}</p><p className='text-xs text-gray-500'>{report.listing?.host?.name ? `Host: ${report.listing.host.name}` : "Host unavailable"}</p></td>
                    <Td>{report.reporter?.name || "User"}</Td>
                    <td className='px-4 py-3 max-w-xs'><p className='text-sm'>{report.reason}</p>{report.details && <p className='text-xs text-gray-500 mt-1'>{report.details}</p>}</td>
                    <Td><StatusPill status={report.status} /></Td>
                    <td className='px-4 py-3'><div className='flex gap-2'>{report.status === "open" && <IconButton label="Reviewed" icon={<FaCheck />} onClick={() => updateReport(report._id, "reviewed")} />}{report.status === "open" && <IconButton label="Dismiss" icon={<IoClose />} onClick={() => updateReport(report._id, "dismissed")} />}{report.listing?._id && <IconButton danger label="Delete Listing" icon={<FaTrash />} onClick={() => deleteListing(report.listing._id)} />}</div></td>
                  </tr>
                ))}
              </Table>
              {reports.length === 0 && <Empty text="No reports submitted yet" />}
            </Panel>
          )}

          {activeTab === "Bookings" && (
            <Panel title="Bookings Overview" subtitle="Read-only view of all platform bookings.">
              <Table headers={["Listing", "Guest", "Host", "Dates", "Amount", "Status"]}>
                {bookings.map(booking => (
                  <tr key={booking._id} className='border-t border-gray-100 hover:bg-gray-50'>
                    <Td>{booking.listing?.title || "Deleted listing"}</Td>
                    <Td>{booking.guest?.name || "Guest"}</Td>
                    <Td>{booking.host?.name || "Host"}</Td>
                    <td className='px-4 py-3 text-sm text-gray-600'>{new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}</td>
                    <Td>Rs {booking.totalRent}</Td>
                    <Td><StatusPill status={booking.status} /></Td>
                  </tr>
                ))}
              </Table>
            </Panel>
          )}
        </section>
      </main>
      {selectedListing && <ListingDetailsModal listing={selectedListing} onClose={() => setSelectedListing(null)} />}
    </div>
  )
}

const input = "w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-base outline-none focus:border-red-400 transition"
function Field({ label, children }) { return <div><label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>{children}</div> }
function Badge({ children }) { return <span className='ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full'>{children}</span> }
function StatCard({ icon, label, value, tone }) {
  const tones = { blue: "bg-blue-50 text-blue-600", green: "bg-green-50 text-green-600", purple: "bg-purple-50 text-purple-600", red: "bg-red-50 text-red-600" }
  return <div className='bg-white border border-gray-200 rounded-lg p-5'><div className={`w-11 h-11 rounded-lg flex items-center justify-center text-xl ${tones[tone]}`}>{icon}</div><p className='text-3xl font-bold mt-4'>{value}</p><p className='text-sm text-gray-500'>{label}</p></div>
}
function Panel({ title, subtitle, children }) { return <div className='bg-white border border-gray-200 rounded-lg p-4 md:p-5'><div className='mb-4'><h3 className='text-lg font-semibold'>{title}</h3><p className='text-sm text-gray-500'>{subtitle}</p></div>{children}</div> }
function QueueRow({ icon, label, value, onClick }) { return <button className='w-full flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 text-left hover:bg-gray-50 px-2 rounded-lg' onClick={onClick}><span className='text-xl text-red-500'>{icon}</span><span className='flex-1 text-sm font-medium'>{label}</span><span className='text-sm font-bold'>{value}</span></button> }
function Table({ headers, children }) { return <div className='overflow-x-auto border border-gray-200 rounded-lg'><table className='w-full text-sm'><thead className='bg-gray-50 text-left'><tr>{headers.map(h => <th key={h} className='px-4 py-3 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap'>{h}</th>)}</tr></thead><tbody>{children}</tbody></table></div> }
function Td({ children }) { return <td className='px-4 py-3 text-gray-700 whitespace-nowrap'>{children}</td> }
function StatusPill({ status }) {
  const map = { admin: "bg-red-100 text-red-700", user: "bg-gray-100 text-gray-700", active: "bg-green-100 text-green-700", approved: "bg-green-100 text-green-700", booked: "bg-green-100 text-green-700", open: "bg-red-100 text-red-700", blocked: "bg-gray-900 text-white", pending: "bg-yellow-100 text-yellow-700", reviewed: "bg-blue-100 text-blue-700", rejected: "bg-orange-100 text-orange-700", dismissed: "bg-gray-100 text-gray-600", cancelled: "bg-red-100 text-red-700" }
  return <span className={`text-xs px-2 py-1 rounded-full capitalize ${map[status] || "bg-gray-100 text-gray-700"}`}>{status}</span>
}
function IconButton({ label, icon, onClick, danger }) { return <button title={label} onClick={onClick} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${danger ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>{icon}<span>{label}</span></button> }
function ActionButton({ label, icon, onClick, danger, muted }) {
  const cls = danger ? "bg-red-500 hover:bg-red-600 text-white" : muted ? "bg-orange-100 hover:bg-orange-200 text-orange-700" : "bg-green-500 hover:bg-green-600 text-white"
  return <button onClick={onClick} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${cls}`}>{icon}{label}</button>
}
function Empty({ text }) { return <p className='text-sm text-gray-400 py-4'>{text}</p> }

function ListingDetailsModal({ listing, onClose }) {
  if (!listing) return null

  return (
    <div className='fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden'>
        <div className='flex items-center justify-between p-5 border-b border-gray-200'>
          <div>
            <h2 className='text-xl font-semibold'>{listing.title}</h2>
            <p className='text-sm text-gray-500'>{listing.landMark}, {listing.city}</p>
          </div>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-900 text-xl'>&times;</button>
        </div>
        <div className='p-5 grid gap-6 lg:grid-cols-[1.2fr,0.8fr] overflow-y-auto max-h-[calc(90vh-5.5rem)]'>
          <div className='space-y-4'>
            {listing.images?.length > 0 && (
              <img src={listing.images[0]} alt={listing.title} className='w-full h-72 object-cover rounded-3xl' />
            )}
            <div className='flex gap-3 overflow-x-auto pb-2'>
              {listing.images?.slice(1).map((img, idx) => (
                <img key={idx} src={img} alt={`${listing.title} ${idx + 2}`} className='h-24 min-w-[160px] object-cover rounded-2xl flex-shrink-0' />
              ))}
            </div>
            <div className='space-y-3'>
              <div className='space-y-2'>
              <div className='flex flex-wrap gap-3 items-center'>
                <StatusPill status={listing.status} />
                <span className='text-sm text-gray-500'>By {listing.host?.name || "Unknown host"}</span>
              </div>
              {listing.host?.email && <p className='text-sm text-gray-500'>Email: {listing.host.email}</p>}
              <p className='text-sm text-gray-500'>{listing.address || "No address provided"}</p>
              <p className='text-gray-700 whitespace-pre-line'>{listing.description}</p>
            </div>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='bg-gray-50 border border-gray-200 rounded-3xl p-4'>
              <h3 className='text-sm font-semibold text-gray-700 mb-3'>Listing details</h3>
              <DetailRow label='Category' value={listing.category} />
              <DetailRow label='Rent' value={`Rs ${listing.rent}/night`} />
              <DetailRow label='Guests' value={listing.maxGuests || 1} />
              <DetailRow label='Bedrooms' value={listing.bedrooms || 1} />
              <DetailRow label='Bathrooms' value={listing.bathrooms || 1} />
              <DetailRow label='Ratings' value={`${listing.ratings || 0} (${listing.ratingsCount || 0})`} />
            </div>
            {listing.amenities?.length > 0 && (
              <div className='bg-gray-50 border border-gray-200 rounded-3xl p-4'>
                <h3 className='text-sm font-semibold text-gray-700 mb-3'>Amenities</h3>
                <div className='flex flex-wrap gap-2'>
                  {listing.amenities.map(item => (
                    <span key={item} className='text-xs bg-white border border-gray-200 rounded-full px-3 py-1'>{item}</span>
                  ))}
                </div>
              </div>
            )}
            {listing.bookedDates?.length > 0 && (
              <div className='bg-gray-50 border border-gray-200 rounded-3xl p-4'>
                <h3 className='text-sm font-semibold text-gray-700 mb-3'>Booked ranges</h3>
                <div className='space-y-2'>
                  {listing.bookedDates.map((range, index) => (
                    <div key={index} className='text-sm text-gray-600'>
                      {new Date(range.checkIn).toLocaleDateString()} - {new Date(range.checkOut).toLocaleDateString()}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className='flex justify-between text-sm text-gray-600'>
      <span>{label}</span>
      <span className='font-semibold text-gray-900'>{value}</span>
    </div>
  )
}

export default App
