const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/User');
const { jwtSecret } =  require('./keys');

// jwt strategy, used to get the user from jwt
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: jwtSecret
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub).select('-auth.local.password');

        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch(error) {
        console.log(error);
        done(error, false);
    }
}))

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Find the user given the email
        const user = await User.findOne({ "auth.email": email });

        // If not, handle it
        if (!user) {
            return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);

    } catch (error) {
        done(error, false);
    }
}));