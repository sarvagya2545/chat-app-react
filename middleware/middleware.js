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
  }
}