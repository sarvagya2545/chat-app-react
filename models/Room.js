const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    roomName: {
        type: String,
        required: true
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
    pfpUrl: {
        type: String,
        default: ''
    },
    messages: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'message',
                required: true
            }
        ],
        default: []
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

roomSchema.statics.getRoomUsers = function(id) {
    return this.findById(id, { people: 1 })
}

const Room = mongoose.model('room', roomSchema);
module.exports = Room