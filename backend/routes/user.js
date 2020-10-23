var express = require('express');
var router = express.Router();
const { userCreateUpdateValidator } = require('../request/validations/user');
const { showUsers, createUser, updateUser, deleteUser, getUser, getAllUsers } = require('../request/handlers/user');
const { checkValidationErrorsFromRequest } = require('../Utils/requestValidations');


// router.get('/', showUsers);

router.post('/', [userCreateUpdateValidator, checkValidationErrorsFromRequest], createUser);

router.put('/', [userCreateUpdateValidator, checkValidationErrorsFromRequest], updateUser);

router.delete('/', deleteUser);

router.get('/get', getUser);

router.get('/get-all', getAllUsers);



module.exports = router;