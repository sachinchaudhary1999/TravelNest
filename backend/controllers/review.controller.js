import Review from "../model/review.model.js"
import Listing from "../model/listing.model.js"
import Booking from "../model/booking.model.js"

export const addReview = async (req, res) => {
  try {
    const { listingId } = req.params
    const { rating, comment, bookingId } = req.body

    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required" })
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" })
    }

    // Verify the user actually booked this listing
    const booking = await Booking.findOne({ _id: bookingId, guest: req.userId, listing: listingId })
    if (!booking) {
      return res.status(403).json({ message: "You can only review listings you have booked" })
    }

    const existing = await Review.findOne({ listing: listingId, user: req.userId })
    if (existing) {
      return res.status(400).json({ message: "You have already reviewed this listing" })
    }

    const review = await Review.create({
      listing: listingId,
      user: req.userId,
      booking: bookingId,
      rating: Number(rating),
      comment,
    })

    // Recalculate average rating on the listing
    const listing = await Listing.findById(listingId)
    listing.ratingsTotal += Number(rating)
    listing.ratingsCount += 1
    listing.ratings = listing.ratingsTotal / listing.ratingsCount
    await listing.save()

    await review.populate("user", "name avatar")
    return res.status(201).json(review)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "You have already reviewed this listing" })
    }
    return res.status(500).json({ message: `Review error: ${error.message}` })
  }
}

export const getListingReviews = async (req, res) => {
  try {
    const { listingId } = req.params
    const reviews = await Review.find({ listing: listingId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
    return res.status(200).json(reviews)
  } catch (error) {
    return res.status(500).json({ message: `Get reviews error: ${error.message}` })
  }
}

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params
    const review = await Review.findById(id)
    if (!review) return res.status(404).json({ message: "Review not found" })
    if (review.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    // Recalculate rating
    const listing = await Listing.findById(review.listing)
    if (listing && listing.ratingsCount > 0) {
      listing.ratingsTotal -= review.rating
      listing.ratingsCount -= 1
      listing.ratings = listing.ratingsCount > 0 ? listing.ratingsTotal / listing.ratingsCount : 0
      await listing.save()
    }

    await Review.findByIdAndDelete(id)
    return res.status(200).json({ message: "Review deleted" })
  } catch (error) {
    return res.status(500).json({ message: `Delete review error: ${error.message}` })
  }
}
