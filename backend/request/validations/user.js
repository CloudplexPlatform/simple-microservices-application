const { body } = require('express-validator');
const Student = require('../../src/models/userModel');

var userCreateUpdateValidator = [
    body('name')
        .isLength({ min: 1 })
        .withMessage('Name is Required Field'),
    body('email')
        .isLength({ min: 1 })
        .withMessage('Email is Required')
        .isEmail()
        .withMessage('Email is not valid')
        .normalizeEmail()
        .custom(async email => {
            const value = await isEmailInUse(email);
            if (value) {
                throw new Error('Email is already exists!!!');
            }
            return true;
        }),
    body('password')
        .isLength({ min: 1 })
        .withMessage('Password is required.'),
    body('password_confirmation')
        .isLength({ min: 1 })
        .withMessage('Password Confirmation is required.')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
];

function isEmailInUse(email) {
    var conn = require('./../../db/mysql/mysql');
    return new Promise((resolve, reject) => {
        conn.query('SELECT COUNT(*) AS total FROM students WHERE email = ?', [email], function (error, results, fields) {
            if (!error) {
                console.log("EMAIL COUNT : " + results[0].total);
                return resolve(results[0].total > 0);
            } else {
                return reject(new Error('Database error!!'));
            }
        }
        );
    });
}

module.exports = {
    userCreateUpdateValidator
}