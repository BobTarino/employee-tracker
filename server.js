const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
// Connect to database // variable db holds connection

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'ClaudiaAndre327',
    database: 'election'
});

// API ROUTES

// Default response for any other request (Not Found) // CATCHALL // make sure this is last route
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});