const express = require('express');
const passport = require('passport');
const router = express.Router();
const { checkIfUserInRoom } = require('../../middleware/middleware');
const MessageController = require('../controllers/messages');

const passportJWT = passport.authenticate('jwt', { session: false })

// get the messages of a particular room by its id
// endpoint is /api/message/room/:roomId
router.route('/room/:roomId')
    .get(passportJWT, checkIfUserInRoom, MessageController.getAllMessagesInRoom);

module.exports = router;