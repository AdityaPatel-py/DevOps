const express = require("express");
const mysql = require("mysql2");
const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "mydb.cx0wucoeqd4u.ap-south-1.rds.amazonaws.com",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "yourpassword",
  database: process.env.DB_NAME || "mydb"
});

connection.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL successfully");
});

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
