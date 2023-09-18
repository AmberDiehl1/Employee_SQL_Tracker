const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'WebDev0429$',
    database: 'department_db'
  },
  console.log(`Connected to department.db.`)
);

module.exports = db;