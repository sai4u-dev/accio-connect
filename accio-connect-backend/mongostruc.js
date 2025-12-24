/**
 * -----------------------------------------
 *  ACCIO CONNECT SERVER
 * -----------------------------------------
 */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Load ENV first
dotenv.config();

// Initialize Express app
const app = express();

/* ---------------------------------------------
   MIDDLEWARE CONFIGURATION
---------------------------------------------- */

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend base URL
    credentials: true, // allow cookies
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

/* ---------------------------------------------
   ENV CONFIG
---------------------------------------------- */

const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_COOKIE_NAME = "accioConnectToken";

if (!MONGO_URI || !JWT_SECRET) {
  console.error("❌ Environment variables missing");
  process.exit(1);
}

/* ---------------------------------------------
   DATABASE CONNECTION
---------------------------------------------- */

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  });

/* ---------------------------------------------
   USER SCHEMA
---------------------------------------------- */

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email format",
      ],
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

/* ---------------------------------------------
   GLOBAL RESPONSE HELPERS
---------------------------------------------- */

app.use((req, res, next) => {
  res.success = (status, message, data = null) =>
    res.status(status).json({ success: true, message, data });

  res.err = (status, message, details = null) =>
    res.status(status).json({ success: false, message, details });

  next();
});

/* ---------------------------------------------
   SIGN UP
---------------------------------------------- */

app.post("/signUp", async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (!firstName || !email || !password || !phoneNumber) {
      return res.err(400, "All required fields must be filled");
    }

    if (password.length < 8) {
      return res.err(400, "Password must be at least 8 characters long");
    }

    // Check duplicates
    if (await User.findOne({ email })) {
      return res.err(409, "Email already in use");
    }

    if (await User.findOne({ phoneNumber })) {
      return res.err(409, "Phone number already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    const { password: _, ...safeUser } = user.toObject();

    res.success(201, "User registered successfully", safeUser);
  } catch (err) {
    next(err);
  }
});

/* ---------------------------------------------
   SIGN IN
---------------------------------------------- */

app.post("/signIn", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.err(400, "Email and password required");

    const user = await User.findOne({ email });
    if (!user) return res.err(404, "User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.err(401, "Invalid credentials");

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Cookie setup
    res.cookie(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...safeUser } = user.toObject();

    res.success(200, "Login successful", safeUser);
  } catch (err) {
    next(err);
  }
});

/* ---------------------------------------------
   AUTH MIDDLEWARE
---------------------------------------------- */

function authorize(req, res, next) {
  const token = req.cookies[TOKEN_COOKIE_NAME];

  if (!token) return res.err(401, "Authentication required");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.err(401, "Invalid or expired token");
  }
}

/* ---------------------------------------------
   PROFILE ROUTE
---------------------------------------------- */

app.get("/profile", authorize, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.err(404, "User not found");

    res.success(200, "Profile fetched successfully", user);
  } catch (err) {
    next(err);
  }
});

/* ---------------------------------------------
   GLOBAL ERROR HANDLER
---------------------------------------------- */

app.use((err, req, res, next) => {
  console.error("🚨 SERVER ERROR:", err);

  if (err.name === "ValidationError") {
    return res.err(400, err.message);
  }

  res.err(500, "Internal server error");
});

/* ---------------------------------------------
   404 HANDLER
---------------------------------------------- */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

/* ---------------------------------------------
   SERVER LISTEN
---------------------------------------------- */

const PORT = process.env.PORT || 8800;
app.listen(PORT, () =>
  console.log(
    `🚀 Server running on port ${PORT} | Mode: ${process.env.NODE_ENV}`
  )
);

/* ---------------------------------------------
   GRACEFUL SHUTDOWN
---------------------------------------------- */

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, closing server...");
  await mongoose.connection.close();
  process.exit(0);
});
