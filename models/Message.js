const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room',
        required: true
    },
    timeStamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    content: {
        text: String,
        fileURL: String,
        isImage: Boolean,
        fileName: String
    }
})

const Message = mongoose.model('message', messageSchema);

module.exports = Message;