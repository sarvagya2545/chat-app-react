const express = require('express');
const passport = require('passport');
const router = express.Router();
const RoomController = require('../controllers/rooms');
require('../../config/passport')
const { createRoomValidationRules } = require('../../validators/roomValidators');
const validate = require('../../validators/validate');
const { checkIfUserInRoom } = require('../../middleware/middleware');

const passportJWT = passport.authenticate('jwt', { session: false })

// create a new room
router.post('/new', passportJWT, createRoomValidationRules(), validate, RoomController.createRoom);

// join an existing room by id
router.route('/:roomid/join')
    .post(passportJWT, RoomController.joinRoomById)
;

// exit from a room
router.route('/:roomid/exit')
    .post(passportJWT, RoomController.exitRoom)
;

router.route('/profile/pic')
    .post(passportJWT, checkIfUserInRoom, RoomController.setProfilePic)
    .delete(passportJWT, checkIfUserInRoom, RoomController.deleteProfilePic)
;

// permanently delete the room
router.route('/:roomid/delete')
    .delete(stopAllRequests, RoomController.deleteRoom)
;

/* only while development to avoid accidental deletion of a room */
function stopAllRequests(req,res,next) {
    res.send('delete not allowed')
}

module.exports = router;