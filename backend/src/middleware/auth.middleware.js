const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authorize = async (req, res, next) => {
  const token =
    req.cookies?.accioConnectToken || req.headers.authorization?.split(" ")[1];

  if (!token) return res.err(401, "Authentication required");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FETCH FULL USER
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.err(401, "User not found");

    req.user = user; // 🔥 FULL USER OBJECT
    next();
  } catch (err) {
    return res.err(401, "Invalid or expired token");
  }
};

module.exports = authorize;
