const mysql = require('mysql');
require('dotenv').config()

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const dbConn = mysql.createConnection({
    host,
    user,
    password,
    database
});

dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;