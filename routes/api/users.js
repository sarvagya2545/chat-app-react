const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require('../controllers/users');
require('../../config/passport')
const { signupValidationRules, loginValidationRules } = require('../../validators/authValidators');
const validate = require('../../validators/validate');

const passportSignIn = passport.authenticate('local', { session: false })
const passportJWT = passport.authenticate('jwt', { session: false })
const passportGoogle = passport.authenticate('googleToken', { session: false })

const debugMiddleware = async (req,res,next) => {
    console.log(req.headers);
    console.log(req.query);
    next();
}

// signup route
router.route('/signup')
    .post(signupValidationRules(), validate, UserController.signup)
;

// login route
router.route('/login')
    .post(loginValidationRules(), validate, passportSignIn, UserController.login)
;

// get the users details from the token
router.route('/current')
    .get(passportJWT, UserController.getUser)
;

// get user from handle name
router.route('/handle/:handle')
    .get(UserController.getUserByHandle)
;

// get all the users in the database
router.route('/all')
    .get(passportJWT, UserController.getAllUsersExceptSelf)
;

// Google token strategy
router.route('/google/token')
    .get(passportGoogle, UserController.googleOAuth)
;

// DEVELOPMENT ONLY
router.route('/change/password')
    .post(UserController.changePassword)
;

module.exports = router;