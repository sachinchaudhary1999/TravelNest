import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User from "../model/user.model.js"
import genToken from "./token.js"

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL || "http://localhost:travelnest-backend-4q1w.onrender.com//api/auth/google/callback"

const googleOAuthConfigured = Boolean(googleClientId && googleClientSecret)

if (googleOAuthConfigured) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: googleCallbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value })

          if (user) {
            if (!user.avatar && profile.photos && profile.photos.length > 0) {
              user.avatar = profile.photos[0].value
              await user.save()
            }
            return done(null, user)
          }

          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : "",
            isVerified: true,
          })

          return done(null, newUser)
        } catch (error) {
          return done(error, null)
        }
      }
    )
  )
} else {
  console.warn("Google OAuth is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable it.")
}

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
      .populate("listing", "title images description rent category city landMark ratings bookedDates status")
      .populate({ path: "booking", populate: { path: "listing", select: "title images rent city landMark category ratings" } })
      .populate("wishlist", "title images rent city landMark category ratings")
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

export default passport