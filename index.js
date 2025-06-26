// server/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(cors());
const allowedOrigins = [
  "http://localhost:3000",
  "https://finance-tracker-frontend-alpha.vercel.app" // Replace with actual Vercel domain
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// ✅ Test Route (for verifying Render server is live)
app.get("/api/test", (req, res) => {
  res.send("API is working");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

