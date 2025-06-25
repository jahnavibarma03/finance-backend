// server/controllers/transactionController.js
const db = require("../db/database");

// Add transaction
const addTransaction = (req, res) => {
  const { type, amount, category, description, date } = req.body;

  if (!type || !amount || !date) {
    return res.status(400).json({ msg: "Required fields missing" });
  }

  const query = `
    INSERT INTO transactions (user_id, type, amount, category, description, date)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(
    query,
    [req.userId, type, amount, category, description, date],
    function (err) {
      if (err) return res.status(500).json({ msg: "Error saving transaction" });
      res.status(201).json({ msg: "Transaction added", id: this.lastID });
    }
  );
};

// Get all transactions for the logged-in user
const getTransactions = (req, res) => {
  const query = `SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC`;

  db.all(query, [req.userId], (err, rows) => {
    if (err) return res.status(500).json({ msg: "Error fetching transactions" });
    res.json(rows);
  });
};

// Update a transaction
const updateTransaction = (req, res) => {
  const { type, amount, category, description, date } = req.body;
  const transactionId = req.params.id;

  const query = `
    UPDATE transactions
    SET type = ?, amount = ?, category = ?, description = ?, date = ?
    WHERE id = ? AND user_id = ?`;

  db.run(
    query,
    [type, amount, category, description, date, transactionId, req.userId],
    function (err) {
      if (err) return res.status(500).json({ msg: "Error updating transaction" });
      if (this.changes === 0) return res.status(404).json({ msg: "Transaction not found" });

      res.json({ msg: "Transaction updated" });
    }
  );
};

// Delete a transaction
const deleteTransaction = (req, res) => {
  const transactionId = req.params.id;

  const query = `DELETE FROM transactions WHERE id = ? AND user_id = ?`;

  db.run(query, [transactionId, req.userId], function (err) {
    if (err) return res.status(500).json({ msg: "Error deleting transaction" });
    if (this.changes === 0) return res.status(404).json({ msg: "Transaction not found" });

    res.json({ msg: "Transaction deleted" });
  });
};

module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
