'use strict';
var dbConn = require('./../../db/mysql/mysql');

//Student object create
var Student = function (student) {
    this.name = student.name;
    this.email = student.email;
    this.password = student.password;
};

Student.create = function (newStudent, result) {
    dbConn.query("INSERT INTO students set ?", newStudent, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Student.findByEmail = function (email, result) {
    dbConn.query("Select * from students where email = ? ", email, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Student.findById = function (id, result) {
    dbConn.query("Select * from students where _id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Student.findAll = function (result) {
    dbConn.query("Select * from students", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('students : ', res);
            result(null, res);
        }
    });
};

Student.update = function (id, student, result) {
    dbConn.query("UPDATE students SET name = ? , email = ? , password = ? WHERE _id = ?", [student.name, student.email, student.password, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            const new_obj = {
                "_id": id,
                ...student
            }
            result(null, new_obj);
        }
    });
};

Student.delete = function (id, result) {
    dbConn.query("DELETE FROM students WHERE _id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Student;