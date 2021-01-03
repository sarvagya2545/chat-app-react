const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    roomId: {
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
    messages: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'message'
            }
        ]
    }
})

const Room = mongoose.model('room', roomSchema);
module.exports = Room