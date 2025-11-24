import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    // 1. No token
    if (!token) {
      return res.status(400).json({ message: "User doesn't have a token" });
    }

    // 2. Verify token
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    // 3. If verifyToken is invalid
    if (!verifyToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // 4. Store user ID
    req.userId = verifyToken.userId;

    return next(); // IMPORTANT → stop here
  } catch (error) {
    return res.status(500).json({ message: `isAuth error: ${error.message}` });
  }
};

export default isAuth;
