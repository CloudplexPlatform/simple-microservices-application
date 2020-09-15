const { body } = require('express-validator');
const { Student } = require('../../models/user');

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
    .custom(async(value, { req }) => {
        await Student.find({ 'email': value }).then((user) => {
            if (user.length > 0 && user[0]._id != req.body.id) {
                throw new Error('Email is already taken');
            }
            return true;
        })
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

module.exports = {
    userCreateUpdateValidator
}