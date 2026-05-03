import uploadOnCloudinary from "../config/cloudinary.js"
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"
import Review from "../model/review.model.js"

const toArray = (value) => {
  if (!value) return []
  return (Array.isArray(value) ? value : value.split(","))
    .map(item => item.trim())
    .filter(Boolean)
}

const toNumber = (value, fallback) => {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

export const addListing = async (req, res) => {
  try {
    const host = req.userId
    const { title, description, rent, city, landMark, address, category, maxGuests, bedrooms, bathrooms, amenities, latitude, longitude } = req.body

    const rentValue = Number(rent)
    if (!Number.isFinite(rentValue) || rentValue <= 0) {
      return res.status(400).json({ message: "Valid rent is required" })
    }

    if (!req.files || !req.files.images || req.files.images.length < 1) {
      return res.status(400).json({ message: "At least 1 image is required" })
    }

    const imageUrls = await Promise.all(
      req.files.images.map(file => uploadOnCloudinary(file.path))
    )
    const validImages = imageUrls.filter(Boolean)
    if (validImages.length === 0) {
      return res.status(500).json({ message: "Image upload failed" })
    }

    const listing = await Listing.create({
      title, description, rent: rentValue, city, landMark,
      address: address || "",
      category,
      maxGuests: toNumber(maxGuests, 1),
      bedrooms: toNumber(bedrooms, 1),
      bathrooms: toNumber(bathrooms, 1),
      amenities: toArray(amenities),
      latitude: toNumber(latitude, 0),
      longitude: toNumber(longitude, 0),
      images: validImages,
      host,
      status: "approved", // auto-approve; change to "pending" to enable moderation
    })

    await User.findByIdAndUpdate(host, { $push: { listing: listing._id } })
    return res.status(201).json(listing)
  } catch (error) {
    return res.status(500).json({ message: `AddListing error: ${error.message}` })
  }
}

export const getListing = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, minRent, maxRent, city, guests, amenities } = req.query
    const pageNumber = Math.max(toNumber(page, 1), 1)
    const limitNumber = Math.min(Math.max(toNumber(limit, 20), 1), 100)
    const filter = { status: "approved" }

    if (category && category !== "trending") filter.category = category
    if (city) filter.city = { $regex: city, $options: "i" }
    if (minRent || maxRent) {
      filter.rent = {}
      if (minRent) filter.rent.$gte = toNumber(minRent, 0)
      if (maxRent) filter.rent.$lte = toNumber(maxRent, Number.MAX_SAFE_INTEGER)
    }
    if (guests) filter.maxGuests = { $gte: toNumber(guests, 1) }
    if (amenities) {
      const arr = toArray(amenities)
      filter.amenities = { $all: arr }
    }

    const skip = (pageNumber - 1) * limitNumber
    const total = await Listing.countDocuments(filter)
    const listings = await Listing.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .populate("host", "name avatar")

    return res.status(200).json({ listings, total, page: pageNumber, pages: Math.ceil(total / limitNumber) })
  } catch (error) {
    return res.status(500).json({ message: `getListing error: ${error.message}` })
  }
}

export const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ host: req.userId })
      .sort({ createdAt: -1 })
      .populate("host", "name avatar")

    await User.findByIdAndUpdate(req.userId, {
      $addToSet: { listing: { $each: listings.map(listing => listing._id) } }
    })

    return res.status(200).json({ listings })
  } catch (error) {
    return res.status(500).json({ message: `getMyListings error: ${error.message}` })
  }
}

export const findListing = async (req, res) => {
  try {
    const { id } = req.params
    const listing = await Listing.findById(id).populate("host", "name avatar bio createdAt")
    if (!listing) return res.status(404).json({ message: "Listing not found" })
    const reviews = await Review.find({ listing: id }).populate("user", "name avatar").sort({ createdAt: -1 })
    return res.status(200).json({ ...listing.toObject(), reviews })
  } catch (error) {
    return res.status(500).json({ message: `findListing error: ${error.message}` })
  }
}

export const updateListing = async (req, res) => {
  try {
    const { id } = req.params
    const listing = await Listing.findById(id)
    if (!listing) return res.status(404).json({ message: "Listing not found" })
    if (listing.host.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const { title, description, rent, city, landMark, address, category, maxGuests, bedrooms, bathrooms, amenities, latitude, longitude } = req.body
    const updateData = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (rent !== undefined) {
      const rentValue = Number(rent)
      if (!Number.isFinite(rentValue) || rentValue <= 0) {
        return res.status(400).json({ message: "Valid rent is required" })
      }
      updateData.rent = rentValue
    }
    if (city !== undefined) updateData.city = city
    if (landMark !== undefined) updateData.landMark = landMark
    if (address !== undefined) updateData.address = address
    if (category !== undefined) updateData.category = category
    if (maxGuests !== undefined) updateData.maxGuests = toNumber(maxGuests, listing.maxGuests)
    if (bedrooms !== undefined) updateData.bedrooms = toNumber(bedrooms, listing.bedrooms)
    if (bathrooms !== undefined) updateData.bathrooms = toNumber(bathrooms, listing.bathrooms)
    if (latitude !== undefined) updateData.latitude = toNumber(latitude, listing.latitude)
    if (longitude !== undefined) updateData.longitude = toNumber(longitude, listing.longitude)
    if (amenities !== undefined) updateData.amenities = toArray(amenities)

    // Only upload new images if provided.
    if (req.files && req.files.images && req.files.images.length > 0) {
      const newUrls = await Promise.all(req.files.images.map(f => uploadOnCloudinary(f.path)))
      const valid = newUrls.filter(Boolean)
      if (valid.length > 0) updateData.images = valid
    }

    const updated = await Listing.findByIdAndUpdate(id, updateData, { new: true })
    return res.status(200).json(updated)
  } catch (error) {
    return res.status(500).json({ message: `UpdateListing error: ${error.message}` })
  }
}

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params
    const listing = await Listing.findById(id)
    if (!listing) return res.status(404).json({ message: "Listing not found" })
    if (listing.host.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" })
    }
    await Listing.findByIdAndDelete(id)
    await User.findByIdAndUpdate(listing.host, { $pull: { listing: listing._id } })
    await Review.deleteMany({ listing: id })
    return res.status(200).json({ message: "Listing deleted" })
  } catch (error) {
    return res.status(500).json({ message: `DeleteListing error: ${error.message}` })
  }
}

export const search = async (req, res) => {
  try {
    const { query, minPrice, maxPrice, category, amenities } = req.query
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: "Search query too short" })
    }
    const filter = { status: "approved" }

    // Text search
    filter.$or = [
      { landMark: { $regex: query, $options: "i" } },
      { city: { $regex: query, $options: "i" } },
      { title: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
      { address: { $regex: query, $options: "i" } },
    ]

    // Price filter
    if (minPrice) filter.rent = { ...filter.rent, $gte: toNumber(minPrice, 0) }
    if (maxPrice) filter.rent = { ...filter.rent, $lte: toNumber(maxPrice, Number.MAX_SAFE_INTEGER) }

    // Category filter
    if (category) filter.category = category

    // Amenities filter
    if (amenities) {
      const amenityList = toArray(amenities)
      filter.amenities = { $in: amenityList }
    }

    const listings = await Listing.find(filter).limit(10)
    return res.status(200).json(listings)
  } catch (error) {
    return res.status(500).json({ message: `Search error: ${error.message}` })
  }
}

export const checkAvailability = async (req, res) => {
  try {
    const { id } = req.params
    const { checkIn, checkOut } = req.query
    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: "checkIn and checkOut required" })
    }
    const listing = await Listing.findById(id)
    if (!listing) return res.status(404).json({ message: "Listing not found" })

    const inDate = new Date(checkIn)
    const outDate = new Date(checkOut)
    if (isNaN(inDate) || isNaN(outDate)) {
      return res.status(400).json({ message: "Invalid dates" })
    }
    if (inDate >= outDate) {
      return res.status(400).json({ message: "Check-out must be after check-in" })
    }

    const conflict = listing.bookedDates.find(d => {
      const bIn = new Date(d.checkIn)
      const bOut = new Date(d.checkOut)
      return inDate < bOut && outDate > bIn
    })

    return res.status(200).json({ available: !conflict })
  } catch (error) {
    return res.status(500).json({ message: `Availability check error: ${error.message}` })
  }
}
