const mysql = require('mysql2');
require('dotenv').config(); 
const { URL } = require('url');

//database connection details from environment variables
const dbUrl = new URL(process.env.DB_URL);
// console.log(dbUrl)

// Extract connection parameters from the URL
const dbConfig = {
    host: dbUrl.hostname,
    port: dbUrl.port,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.substring(1),
};


// Creating a MySQL connection pool
const pool = mysql.createPool(dbConfig);

module.exports = pool.promise(); // Use promise-based API for async/await
