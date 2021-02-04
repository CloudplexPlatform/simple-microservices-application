const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');
const { userCreateUpdateValidator } = require('./../../request/validations/user');
const { checkValidationErrorsFromRequest } = require('./../../Utils/requestValidations');

// Retrieve all employees
router.get('/get-all', userController.findAll);
// Create a new employee
router.post('/', [userCreateUpdateValidator, checkValidationErrorsFromRequest], userController.create);
// Retrieve a single employee with id
router.get('/get', userController.findById);
// Update a employee with id
router.put('/', [userCreateUpdateValidator, checkValidationErrorsFromRequest], userController.update);
// Delete a employee with id
router.delete('/', userController.delete);

module.exports = router