const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5000;

// Replace with your RDS endpoint and credentials
const db = mysql.createConnection({
  host: 'mydb-instance.xxxxxx.us-east-1.rds.amazonaws.com', // RDS endpoint
  user: 'admin',       // RDS master username
  password: 'mypassword', // RDS master password
  database: 'mydb'     // Database name created in RDS
});

app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
