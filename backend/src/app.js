const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const responseHandler = require("./utils/response");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(responseHandler);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

// 404 Handler
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Route not found" })
);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
