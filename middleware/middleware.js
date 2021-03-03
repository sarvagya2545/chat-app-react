const Room = require('../models/Room');
const User = require('../models/User');

module.exports = {
  debugMiddleware: async (req,res,next) => {
    console.log(req.headers);
    console.log(req.query);
    next();
  },
  checkIfRequiresUsernameUpdate: async (req,res,next) => {    
    if(req.user.auth.username !== 'not-set') {
        return res.status(401).send('Unauthorized');
    }
    next();
  },
  checkIfUserEmailExists: async (req,res,next) => {
    const existingUser = await User.findOne({ "auth.email": req.body.email });

    if(!existingUser) 
      return res.status(401).json({ message: 'The given email does not match up with any user.' })
    else 
      req.user = existingUser;
    next();
  },
  checkIfSocialAccount: async (req,res,next) => {
    if(req.user) {
      if(req.user.config.method !== 'local') {
        return res.status(401).json({ message: 'The given email is logged in via a social account. Please login through social login and not by email/password.' });
      }
    }

    next();
  },
  checkIfUserInRoom: async (req,res,next) => {
    // find the room 
    const room = await Room.findOne({ roomId: req.params.roomId || req.body.roomId });

    if(!room)
      res.status(404).json({ err: 'Room corresponding to the room id not found' })

    if(!room.people.includes(req.user.id)) {
      res.status(401).json({ err: 'You are not allowed to view the chat history of this group because you are not present in the group' })
    }
    req.room = room;
    next();
  },
  redirectToHttps: (req,res,next) => {
    // if(req.headers['x-forwarded-proto'] !== 'https')
      res.redirect(status, "https://" + req.hostname + req.originalUrl);

    next();
  }
}