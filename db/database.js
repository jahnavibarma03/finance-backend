// server/db/database.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./finance.db", (err) => {
  if (err) console.error("Database error:", err.message);
  else console.log("Connected to SQLite database.");
});

// Create users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
  )
`);

// Create transactions table
db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    type TEXT CHECK(type IN ('income', 'expense')),
    amount REAL,
    category TEXT,
    description TEXT,
    date TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

module.exports = db;
