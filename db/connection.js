const mysql = require('mysql2');


// Connect to database // variable db holds connection //
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'ClaudiaAndre327',
    database: 'employee_tracker'
});

module.exports = db;