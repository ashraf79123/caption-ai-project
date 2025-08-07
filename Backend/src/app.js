const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// ✅ Add this line to fix req.body undefined
app.use(express.json()); 

// ✅ If you're using form data (optional, but recommended)
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(cookieParser());

// ✅ Routes
const authroute = require("./route/auth.route");
const postroute = require("./route/post.route");

app.use("/auth", authroute);
app.use("/api/post", postroute);

module.exports = app;
