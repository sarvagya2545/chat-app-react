const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    messageText: String,
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
    }
})

const Message = mongoose.model('message', messageSchema);

module.exports = Message;