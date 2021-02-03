'use strict';
var db = require('../../db/mysql/mysql');

exports.create = function (req, res) {
    let sql = 'CREATE DATABASE IF NOT EXISTS student_database';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    })
};

exports.createTable = function (req, res) {
    let sql = `CREATE TABLE IF NOT EXISTS students(
        _id BIGINT UNSIGNED AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (id))
        `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Student table created...');
    })
};