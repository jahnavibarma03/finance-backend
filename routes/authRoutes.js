// server/routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth API is working fine!");
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
