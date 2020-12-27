const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require('../controllers/users');
require('../../config/passport')

const passportSignIn = passport.authenticate('local', { session: false })
const passportJWT = passport.authenticate('jwt', { session: false })

// signup route
router.route('/signup')
    .post(UserController.signup);

module.exports = router;