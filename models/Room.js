const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    people: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
        default: []
    },
    messages: {
        type: [
            {
                type: String,
                required: true
            }
        ],
        default: []
    }
})

roomSchema.query.byRoomId = function(roomid) {
    return this.where({ roomId: roomid })
}

const Room = mongoose.model('room', roomSchema);
module.exports = Room