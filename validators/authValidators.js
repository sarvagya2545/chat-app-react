const { body } = require('express-validator');

const checkAlphaNumeric = val => {
    const regex = /^[a-zA-Z0-9_]+$/;
    const result = val.match(regex);
    return result !== null;
}

const signupValidationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('A unique username name has to be specified')
            .bail()
            .custom(checkAlphaNumeric)
            .withMessage('The username can only contain alphanumeric characters and/or underscores'),

        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email field cannot be empty')
            .bail()
            .isEmail()
            .withMessage('The input is not a valid email.'),

        body('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long.'),

        body('confirmPassword')    
            .trim()
            .exists()
            .custom((val, { req }) => val === req.body.password)
            .withMessage('Confirm password field must match password field')
    ]
}

const loginValidationRules = () => {
    return [
        body('usernameOrEmail')
            .trim()
            .notEmpty()
            .withMessage('Please enter an email/username')
            .bail(),
            
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Please enter your password.')
    ]
}

module.exports = {
    signupValidationRules,
    loginValidationRules
}