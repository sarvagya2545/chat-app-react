const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require('../controllers/users');
require('../../config/passport')
const { signupValidationRules, loginValidationRules } = require('../../validators/authValidators');
const validate = require('../../validators/validate');

const passportSignIn = passport.authenticate('local', { session: false })
const passportJWT = passport.authenticate('jwt', { session: false })

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

// DEVELOPMENT ONLY
router.route('/change/password')
    .post(UserController.changePassword)
;

module.exports = router;