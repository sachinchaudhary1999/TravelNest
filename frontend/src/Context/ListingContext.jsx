import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const listingDataContext = createContext()

function ListingContext({ children }) {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { getCurrentUser } = useContext(userDataContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rent, setRent] = useState("")
  const [city, setCity] = useState("")
  const [landmark, setLandmark] = useState("")
  const [address, setAddress] = useState("")
  const [category, setCategory] = useState("")
  const [maxGuests, setMaxGuests] = useState(1)
  const [bedrooms, setBedrooms] = useState(1)
  const [bathrooms, setBathrooms] = useState(1)
  const [amenities, setAmenities] = useState([])
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])

  const [adding, setAdding] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [listingData, setListingData] = useState([])
  const [newListData, setNewListData] = useState([])
  const [cardDetails, setCardDetails] = useState(null)
  const [searchData, setSearchData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  // ✅ ADDED
  const [listingLoading, setListingLoading] = useState(true)

  const resetForm = () => {
    setTitle(""); setDescription(""); setRent(""); setCity("")
    setLandmark(""); setAddress(""); setCategory(""); setMaxGuests(1)
    setBedrooms(1); setBathrooms(1); setAmenities([])
    setLatitude(""); setLongitude(""); setImageFiles([]); setImagePreviews([])
  }

  const handleAddListing = async () => {
    setAdding(true)
    try {
      if (!title || !description || !rent || !city || !landmark || !category || imageFiles.length === 0) {
        toast.error("Please complete all required listing fields")
        return
      }
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("rent", rent)
      formData.append("city", city)
      formData.append("landMark", landmark)
      formData.append("address", address)
      formData.append("category", category)
      formData.append("maxGuests", maxGuests)
      formData.append("bedrooms", bedrooms)
      formData.append("bathrooms", bathrooms)
      formData.append("latitude", latitude)
      formData.append("longitude", longitude)
      amenities.forEach(a => formData.append("amenities", a))
      imageFiles.forEach(file => formData.append("images", file))
      await axios.post(serverUrl + "/api/listing/add", formData, { withCredentials: true })
      resetForm()
      toast.success("Listing added successfully!")
      navigate("/mylisting")
      getCurrentUser().catch(() => {})
      getListing().catch(() => {})
    } catch (error) {
      console.error("Add listing error:", error.response?.data || error.message)
      toast.error(error.response?.data?.message || "Failed to add listing")
    } finally {
      setAdding(false)
    }
  }

  const handleViewCard = async (id) => {
    try {
      const result = await axios.get(serverUrl + `/api/listing/findlistingbyid/${id}`, { withCredentials: true })
      setCardDetails(result.data)
      navigate("/viewcard")
    } catch (error) {
      toast.error("Could not load listing details")
    }
  }

  const handleSearch = async (query, filters = {}) => {
    if (!query || query.trim().length < 2) { setSearchData([]); return }
    try {
      const params = new URLSearchParams({
        query,
        minPrice: filters.minPrice || '',
        maxPrice: filters.maxPrice || '',
        category: filters.category || '',
        amenities: filters.amenities?.join(',') || ''
      })
      const result = await axios.get(serverUrl + `/api/listing/search?${params}`)
      setSearchData(result.data)
    } catch (error) {
      setSearchData([])
    }
  }

  // ✅ UPDATED — with listingLoading
  const getListing = async (page = 1, filters = {}) => {
    setListingLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: 20, ...filters })
      const result = await axios.get(serverUrl + `/api/listing/get?${params}`)
      setListingData(result.data.listings)
      setNewListData(result.data.listings)
      setTotalPages(result.data.pages)
      setCurrentPage(result.data.page)
    } catch (error) {
      console.log("getListing error:", error)
    } finally {
      setListingLoading(false)
    }
  }

  useEffect(() => { getListing() }, [adding, updating, deleting])

  // ✅ UPDATED — listingLoading added to value
  const value = {
    title, setTitle, description, setDescription,
    rent, setRent, city, setCity, landmark, setLandmark,
    address, setAddress, category, setCategory,
    maxGuests, setMaxGuests, bedrooms, setBedrooms, bathrooms, setBathrooms,
    amenities, setAmenities, latitude, setLatitude, longitude, setLongitude,
    imageFiles, setImageFiles, imagePreviews, setImagePreviews,
    adding, setAdding, updating, setUpdating, deleting, setDeleting,
    listingData, setListingData, getListing,
    newListData, setNewListData,
    handleViewCard, cardDetails, setCardDetails,
    handleAddListing, handleSearch, searchData, setSearchData,
    resetForm, totalPages, currentPage, listingLoading,
  }

  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  )
}

export default ListingContext