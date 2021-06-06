const express = require('express');
const mysql = require('mysql2');
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



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });