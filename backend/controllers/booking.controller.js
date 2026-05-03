import Booking from "../model/booking.model.js"
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"
import { sendBookingConfirmation } from "../config/email.js"

export const createBooking = async (req, res) => {
  try {
    const { id } = req.params // listing id
    const { checkIn, checkOut, totalRent, guests } = req.body

    const listing = await Listing.findById(id).populate("host", "email name")
    if (!listing) return res.status(404).json({ message: "Listing not found" })
    if (listing.status !== "approved") return res.status(400).json({ message: "Listing is not available" })

    const inDate = new Date(checkIn)
    const outDate = new Date(checkOut)

    if (isNaN(inDate) || isNaN(outDate)) {
      return res.status(400).json({ message: "Invalid dates" })
    }
    if (inDate >= outDate) {
      return res.status(400).json({ message: "Check-out must be after check-in" })
    }
    if (inDate < new Date(new Date().toDateString())) {
      return res.status(400).json({ message: "Check-in cannot be in the past" })
    }

    // FIXED: Proper date-overlap conflict check (no more boolean isBooked race condition)
    const conflict = listing.bookedDates.find(d => {
      const bIn = new Date(d.checkIn)
      const bOut = new Date(d.checkOut)
      return inDate < bOut && outDate > bIn
    })
    if (conflict) {
      return res.status(400).json({ message: "These dates are already booked. Please choose different dates." })
    }

    // Prevent host from booking own listing
    if (listing.host._id.toString() === req.userId) {
      return res.status(400).json({ message: "You cannot book your own listing" })
    }

    const nights = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24))

    const booking = await Booking.create({
      checkIn: inDate,
      checkOut: outDate,
      totalRent: Number(totalRent),
      nights,
      guests: Number(guests) || 1,
      host: listing.host._id,
      guest: req.userId,
      listing: listing._id,
      paymentStatus: "pending",
    })

    // Add to listing's bookedDates
    listing.bookedDates.push({ checkIn: inDate, checkOut: outDate, bookingId: booking._id })
    await listing.save()

    // Add booking to user
    await User.findByIdAndUpdate(req.userId, { $push: { booking: booking._id } })

    // Populate for response
    await booking.populate("host", "email name")
    await booking.populate("listing", "title images city landMark")
    await booking.populate("guest", "name email")

    // Send confirmation email (non-blocking)
    sendBookingConfirmation({
      to: booking.guest.email,
      guestName: booking.guest.name,
      listingTitle: booking.listing.title,
      checkIn: inDate,
      checkOut: outDate,
      totalRent: booking.totalRent,
      bookingId: booking._id,
    }).catch(console.error)

    return res.status(201).json(booking)
  } catch (error) {
    return res.status(500).json({ message: `Booking error: ${error.message}` })
  }
}

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params // FIXED: this is now bookingId, not listingId

    const booking = await Booking.findById(id)
    if (!booking) return res.status(404).json({ message: "Booking not found" })

    // Only guest or host can cancel
    if (booking.guest.toString() !== req.userId && booking.host.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" })
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" })
    }

    // Remove from listing's bookedDates
    await Listing.findByIdAndUpdate(booking.listing, {
      $pull: { bookedDates: { bookingId: booking._id } }
    })

    // Remove from user's booking array
    await User.findByIdAndUpdate(booking.guest, {
      $pull: { booking: booking._id }
    })

    booking.status = "cancelled"
    await booking.save()

    return res.status(200).json({ message: "Booking cancelled successfully" })
  } catch (error) {
    return res.status(500).json({ message: `Cancel booking error: ${error.message}` })
  }
}

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.userId })
      .populate("listing", "title images city landMark category rent")
      .populate("host", "name avatar email")
      .sort({ createdAt: -1 })
    return res.status(200).json(bookings)
  } catch (error) {
    return res.status(500).json({ message: `getMyBookings error: ${error.message}` })
  }
}

export const getHostBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ host: req.userId })
      .populate("listing", "title images city landMark rent")
      .populate("guest", "name avatar email")
      .sort({ createdAt: -1 })
    return res.status(200).json(bookings)
  } catch (error) {
    return res.status(500).json({ message: `getHostBookings error: ${error.message}` })
  }
}
