const { body } = require('express-validator');

const createRoomValidationRules = () => {
    return [
        body('roomName')
            .trim()
            .notEmpty()
            .withMessage('Enter a room name'),

        body('people')
            .if(body('people').exists())
            .notEmpty()
            .isArray()
            .withMessage('People object must be an array')
    ]
}

module.exports = {
    createRoomValidationRules
}