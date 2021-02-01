const Message = require('../../models/Message');

module.exports = {
  getAllMessagesInRoom: async (req,res) => {
    try {
      const listOfMessageIDs = req.room.messages;
      let messageObjList = [];
      for(let msgID of listOfMessageIDs) {
        const msg = await Message.findOne({ messageId : msgID })
        if(msg) messageObjList.push(msg);
      }

      res.status(200).json({ messages: messageObjList }); 
    } catch (err) {
      res.status(500).json({ errorMessage: 'Error while getting messages', err });
    }
  }
}