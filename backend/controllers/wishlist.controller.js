import User from "../model/user.model.js"

export const toggleWishlist = async (req, res) => {
  try {
    const { listingId } = req.params
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: "User not found" })

    const isWishlisted = user.wishlist.includes(listingId)
    if (isWishlisted) {
      user.wishlist.pull(listingId)
    } else {
      user.wishlist.push(listingId)
    }
    await user.save()
    return res.status(200).json({ wishlisted: !isWishlisted, wishlist: user.wishlist })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("wishlist", "title images rent city landMark category ratings bookedDates")
    if (!user) return res.status(404).json({ message: "User not found" })
    return res.status(200).json(user.wishlist)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
