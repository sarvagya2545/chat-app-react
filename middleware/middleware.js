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
  }
}