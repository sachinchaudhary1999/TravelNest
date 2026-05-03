import Message from "../model/message.model.js"
import Booking from "../model/booking.model.js"

export const sendMessage = async (req, res) => {
  try {
    const { bookingId } = req.params
    const { text } = req.body
    if (!text || !text.trim()) return res.status(400).json({ message: "Message cannot be empty" })

    const booking = await Booking.findById(bookingId)
    if (!booking) return res.status(404).json({ message: "Booking not found" })

    const isHost = booking.host.toString() === req.userId
    const isGuest = booking.guest.toString() === req.userId
    if (!isHost && !isGuest) return res.status(403).json({ message: "Not authorized" })

    const receiver = isHost ? booking.guest : booking.host

    const message = await Message.create({
      booking: bookingId,
      sender: req.userId,
      receiver,
      text: text.trim(),
    })
    await message.populate("sender", "name avatar")
    return res.status(201).json(message)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getMessages = async (req, res) => {
  try {
    const { bookingId } = req.params
    const booking = await Booking.findById(bookingId)
    if (!booking) return res.status(404).json({ message: "Booking not found" })

    const isParticipant = booking.host.toString() === req.userId || booking.guest.toString() === req.userId
    if (!isParticipant) return res.status(403).json({ message: "Not authorized" })

    const messages = await Message.find({ booking: bookingId })
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 })

    // Mark as read
    await Message.updateMany({ booking: bookingId, receiver: req.userId, read: false }, { read: true })

    return res.status(200).json(messages)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getMyConversations = async (req, res) => {
  try {
    const bookings = await Booking.find({
      $or: [{ host: req.userId }, { guest: req.userId }],
      status: { $ne: "cancelled" }
    })
      .populate("listing", "title images city")
      .populate("host", "name avatar")
      .populate("guest", "name avatar")
      .sort({ updatedAt: -1 })

    const convos = await Promise.all(bookings.map(async (b) => {
      const unread = await Message.countDocuments({ booking: b._id, receiver: req.userId, read: false })
      const last = await Message.findOne({ booking: b._id }).sort({ createdAt: -1 })
      return { booking: b, unread, lastMessage: last }
    }))

    return res.status(200).json(convos)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
