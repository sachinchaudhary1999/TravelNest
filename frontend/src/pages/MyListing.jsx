import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import Card from '../Component/Card'
import axios from 'axios'
import { toast } from 'react-toastify'

function MyListing() {
  const navigate = useNavigate()
  const { userData, getCurrentUser } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [emptyMessage, setEmptyMessage] = useState("Start hosting and earn money")

  const loadListingsFallback = async () => {
    const result = await axios.get(serverUrl + "/api/listing/get?limit=100")
    const allListings = result.data.listings || []
    const hostedListings = allListings.filter(listing => {
      const hostId = listing.host?._id || listing.host
      return hostId === userData?._id
    })
    setEmptyMessage(allListings.length > 0
      ? "The listings on the home page belong to a different account."
      : "Start hosting and earn money"
    )
    return hostedListings
  }

  const getMyListings = async () => {
    if (!userData?._id) return
    setLoading(true)
    try {
      const result = await axios.get(serverUrl + "/api/listing/my", { withCredentials: true })
      setListings(result.data.listings || [])
      setEmptyMessage("Start hosting and earn money")
      await getCurrentUser()
    } catch (error) {
      try {
        const hostedListings = await loadListingsFallback()
        setListings(hostedListings)
      } catch {
        toast.error(error.response?.data?.message || "Could not load your listings")
        setListings(userData?.listing || [])
      }
    } finally {
      setLoading(false)
    }
  }

  const deleteListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return
    try {
      await axios.delete(serverUrl + `/api/listing/delete/${id}`, { withCredentials: true })
      setListings(prev => prev.filter(listing => listing._id !== id))
      await getCurrentUser()
      toast.success("Listing deleted")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete listing")
    }
  }

  useEffect(() => { getMyListings() }, [userData?._id])

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-8 md:px-10'>
      <div className='max-w-5xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <button className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center' onClick={() => navigate("/")}>
            <FaArrowLeftLong className='text-white w-4 h-4' />
          </button>
          <h1 className='text-2xl font-bold text-gray-800'>My Listings</h1>
          <button
            className='ml-auto px-5 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 text-sm font-medium'
            onClick={() => navigate("/listingpage1")}
          >
            + Add New
          </button>
        </div>

        {loading ? (
          <div className='text-center py-20 text-gray-400'>Loading your listings...</div>
        ) : listings.length === 0 ? (
          <div className='text-center py-20'>
            <p className='text-xl text-gray-400 mb-2'>No listings yet</p>
            <p className='text-gray-400 text-sm mb-6'>{emptyMessage}</p>
            <button className='px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600' onClick={() => navigate("/listingpage1")}>
              List your home
            </button>
          </div>
        ) : (
          <div className='flex flex-wrap gap-6 justify-center'>
            {listings.map(l => (
              <div key={l._id} className='w-[300px] max-w-[90vw]'>
                <Card listing={l} />
                <div className='mt-3 grid grid-cols-2 gap-2'>
                  <button
                    className='px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50'
                    onClick={() => navigate(`/editlisting/${l._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className='px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600'
                    onClick={() => deleteListing(l._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyListing
