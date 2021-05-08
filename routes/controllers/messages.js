// const Room = require('../../models/Room');
const Message = require('../../models/Message');

module.exports = {
  getAllMessagesInRoom: async (req, res) => {
    try {
      // console.log('room', req.room);
      res.status(200).json({ messages: req.room.messages });
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error while getting messages', err });
    }
  }
}