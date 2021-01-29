const { body } = require('express-validator');

const checkAlphaNumeric = val => {
    const regex = /^[a-zA-Z0-9_]+$/;
    const result = val.match(regex);
    return result !== null;
}

const restrictedKeyWords = ['not-set'];

const isNotRestricted = val => {
    return (!restrictedKeyWords.includes(val))
}

const signupValidationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('A unique username name has to be specified')
            .bail()
            .custom(checkAlphaNumeric)
            .withMessage('The username can only contain alphanumeric characters and/or underscores')
            .bail()
            .custom(isNotRestricted)
            .withMessage('The entered username is a keyword and may not be used to create a user'),

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
            .bail()
            .custom(isNotRestricted)
            .withMessage('The entered username is a keyword and may not be used to create a user'),
            
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Please enter your password.')
    ]
}

const usernameUpdateValidationRules = () => {
    return [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('Please provide a username')
            .bail()
            .custom(checkAlphaNumeric)
            .withMessage('The username can only contain alphanumeric characters and/or underscores')
            .bail()
            .custom(isNotRestricted)
            .withMessage('The entered username is a keyword and may not be used to create a user')
    ]
}

const resetPasswordValidationRules = () => {
    return [
        body('newPassword')
            .trim()
            .notEmpty()
            .withMessage('Please provide the new password')
            .bail()
            .isLength({ min: 6 })
            .withMessage('New password length must be at least 6 characters long'),

        body('confirmPassword')
            .trim()
            .exists()
            .custom((val, { req }) => val === req.body.newPassword)
            .withMessage('Confirm password field must match password field')
        
    ]
}

module.exports = {
    signupValidationRules,
    loginValidationRules,
    usernameUpdateValidationRules,
    resetPasswordValidationRules
}