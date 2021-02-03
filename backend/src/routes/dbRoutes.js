const express = require('express')
const router = express.Router()
const dbController = require('../controllers/dbController');

// create DB
router.get('/db', dbController.create);
// Create employee table
router.get('/student', dbController.createTable);

module.exports = router