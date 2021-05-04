const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: GoogleTokenStrategy } = require('passport-google-token');
const User = require('../models/User');
const { jwtSecret } = require('./keys');

// jwt strategy, used to get the user from jwt
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: jwtSecret
}, async (payload, done) => {
    try {
        // console.log(payload)

        // Find the user specified in token
        const user = await User.findById(payload.sub).populate({ path: 'rooms' }).select('-auth.local.password');

        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch (error) {
        console.log(error);
        done(error, false);
    }
}))

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'usernameOrEmail'
}, async (usernameOrEmail, password, done) => {
    try {
        const foundUserbyUsername = await User.findOne({ 'auth.username': usernameOrEmail }).populate({ path: 'rooms' });
        const foundUserbyEmail = await User.findOne({ 'auth.email': usernameOrEmail }).populate({ path: 'rooms' });

        // If not, handle it
        if (!foundUserbyEmail && !foundUserbyUsername) {
            return done(null, false);
        }

        // console.log(foundUserbyUsername)
        // console.log(foundUserbyEmail)

        // user is either the one by email or the one by username
        const user = foundUserbyEmail || foundUserbyUsername;

        // return error if the user is having social login
        if (user.config.method !== 'local') {
            return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // console.log(isMatch)

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

// GOOGLE LOGIN STRATEGY
passport.use('googleToken', new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // get full profile with access and refresh tokens.
        // console.log('profile', profile);
        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);

        const existingGoogleUser = await User.findOne({ "auth.google.id": profile.id }).populate({ path: 'rooms' });
        const existingLocalUser = await User.findOne({ "auth.email": profile.emails[0].value }).populate({ path: 'rooms' });

        if (existingGoogleUser) {
            return done(null, existingGoogleUser);
        }

        if (existingLocalUser) {
            existingLocalUser.auth.google = {
                id: profile.id
            }
            existingLocalUser.save();

            return done(null, existingLocalUser);
        }

        const newUser = new User({
            config: {
                method: 'google',
            },
            auth: {
                username: 'not-set',
                email: profile.emails[0].value,
                google: {
                    id: profile.id
                }
            }
        })

        // console.log('newUser', newUser); 
        newUser.save();
        done(null, newUser);
    } catch (err) {
        done(err, false, error.message);
    }
}));