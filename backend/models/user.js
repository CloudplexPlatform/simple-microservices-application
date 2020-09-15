const { mongoose } = require('../db/mongoose/mongoose');
const { userSchema } = require('./schema/userSchema');
module.exports = {
    Student: mongoose.model('student', userSchema),
};