require('dotenv').config();
const express = require('express');
const mysql = require('mysqdb');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();
const PORT = process.env.PORT || 4900;

// Middleware
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "employeedb"
};

const db = mysql.createConnection(dbConfig);

db.connect(err => {
  if (err) {
    console.error("Error connecting to DB:", err);
    return;
  }
  console.log("MySQL DB Connected successfully!");
});

// Routes
server.get('/getEmployees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

server.post('/addEmployee', (req, res) => {
  const { empid, name, project } = req.body;
  const query = 'INSERT INTO employees(empid, name, project) VALUES (?, ?, ?)';
  db.query(query, [empid, name, project], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json({ message: 'Data added successfully!' });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});