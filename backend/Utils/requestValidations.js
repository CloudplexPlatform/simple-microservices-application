const { validationResult } = require('express-validator');

const checkValidationErrorsFromRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array({ onlyFirstError: true }) });
    } else {
        next();
    }
}

module.exports = {
    checkValidationErrorsFromRequest,
}