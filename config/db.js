const mysql = require('mysql');
const dotenv = require('dotenv');
// load env variables
dotenv.config({ path: './config.env' });

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// open the MySQL connection
db.connect(err => {
  if(err) throw err;
  console.log('Successfully connected to the database');
});

module.exports = db;