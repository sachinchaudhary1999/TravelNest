import Report from "../model/report.model.js"
import Listing from "../model/listing.model.js"

export const createReport = async (req, res) => {
  try {
    const { listingId } = req.params
    const { reason, details } = req.body

    if (!reason || reason.trim().length < 3) {
      return res.status(400).json({ message: "Report reason is required" })
    }

    const listing = await Listing.findById(listingId)
    if (!listing) return res.status(404).json({ message: "Listing not found" })

    const existingOpenReport = await Report.findOne({
      listing: listingId,
      reporter: req.userId,
      status: "open",
    })
    if (existingOpenReport) {
      return res.status(400).json({ message: "You already have an open report for this listing" })
    }

    const report = await Report.create({
      listing: listingId,
      reporter: req.userId,
      reason,
      details: details || "",
    })

    return res.status(201).json({ message: "Report submitted", report })
  } catch (error) {
    return res.status(500).json({ message: `Report error: ${error.message}` })
  }
}
