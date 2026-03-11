const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const responseHandler = require("./utils/response");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const errorHandler = require("./middleware/error.middleware");
const { getAllLogs } = require("./controllers/admin.controller");

const app = express();
const CLIENT_URL = `${process.env.CLIENT_URL}`;

// Middleware
app.use(
  cors({
    origin: [CLIENT_URL, "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(responseHandler);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.get("/healthcheck", (req, res) => {
  res.status(200).json({
    message: "Hello from middleware",
  });
});

app.get("/admin", getAllLogs);
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            padding-top: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          h1 {
            color: black;
          }
        </style>
      </head>
      <body>
        <h1>Accio Connect</h1>
      </body>
    </html>
  `);
});
app.get("/test", (req, res) => res.send("Hello"));
// 404 Handler
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Route not found" }),
);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
