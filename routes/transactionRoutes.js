// server/routes/transactionRoutes.js
const express = require("express");
const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// All routes are protected
router.use(authenticate);

router.post("/", addTransaction);
router.get("/", getTransactions);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
