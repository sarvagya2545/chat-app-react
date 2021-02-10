const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    messageId: {
        type: String,
        required: true,
        unique: true
    },
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
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
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