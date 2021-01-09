const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }

    let extractedErrors = {}
    errors.array().map(err => {
        extractedErrors = {
            ...extractedErrors,
            [err.param]: err.msg
        }
    })
    console.log(errors);

    return res.status(400).json({
        errors: extractedErrors,
    });
}

module.exports = validate;