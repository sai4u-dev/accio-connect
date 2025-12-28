const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { LOCATION, COURSE_TYPE, ALL_BATCH } = require("../constants");

const cookieName = "accioConnectToken";

// SIGNUP
const signup = async (req, res, next) => {
  // Verify email exists in accio databases

  // Verify batch in system

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      profilePicture: image_Url,
      batch,
      location,
      courseType,
    } = req.body;

    if (!ALL_BATCH[batch]) {
      return res.err(400, "Given batch doesnt exists");
    }

    // Verify location of centres from system
    if (!LOCATION.includes(location)) {
      return res.err(400, "Centre not present in given location");
    }

    // Verify course type
    if (!COURSE_TYPE.includes(courseType)) {
      return res.err(400, "Course type invalid");
    }

    if (!firstName || !email || !password || !phoneNumber)
      return res.err(400, "All required fields are needed");

    if (await User.findOne({ email }))
      return res.err(409, "Email already used");
    if (await User.findOne({ phoneNumber }))
      return res.err(409, "Phone already used");

    const hashed = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashed,
      batch,
      location,
      courseType,
      profilePicture: image_Url,
    });

    const { password: _, ...safeUser } = user.toObject();
    res.success(201, "User registered", safeUser);
  } catch (err) {
    next(err);
  }
};

// LOGIN
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body; //email, password
    if (!email || !password) return res.err(400, "Enter email & password");

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.err(404, "User not found");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.err(401, "Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...safeUser } = user.toObject();
    res.success(200, "Login success", safeUser);
  } catch (err) {
    next(err);
  }
};

// LOGOUT
const logout = async (req, res, next) => {
  try {
    res.clearCookie(cookieName, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax",
    });

    return res.success(200, "Logout successful");
  } catch (err) {
    next(err);
  }
};

// PROFILE
const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.err(404, "User not found");
    res.success(200, "Profile fetched", user);
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    res.success(200, "Authenticated", req.user);
  } catch (err) {
    next(err);
  }
};

module.exports = { signin, signup, profile, logout, me };
