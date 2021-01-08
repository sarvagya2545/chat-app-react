const express = require('express');
const passport = require('passport');
const router = express.Router();
const RoomController = require('../controllers/rooms');
require('../../config/passport')

const passportJWT = passport.authenticate('jwt', { session: false })

// get the list of all rooms a user has joined
router.get('/user', passportJWT, RoomController.getRoomsOfUser);

// create a new room
router.post('/new', passportJWT, RoomController.createRoom);

// join an existing room by id
router.route('/:roomid/join')
    .post(passportJWT, RoomController.joinRoomById)
;

// exit from a room
router.route('/:roomid/exit')
    .post(passportJWT, RoomController.exitRoom)
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