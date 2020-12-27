const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/keys');
const User = require('../../models/User');

const signToken = (user) => {
    return jwt.sign({
        iss: 'Sarvagya',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, jwtSecret);
}

module.exports = {
    signup: async (req,res) => {
        try {
            const { username, email, password } = req.body;

            const foundUser = await User.findOne({ 'auth.email': email });
            if(foundUser) {
                return res.status(400).json({ errors: { email: 'Email is already in use' } })
            }
            
            const newFoundUser = await User.findOne({ 'auth.username': username });
            if(newFoundUser) {
                return res.status(400).json({ errors: { username: `Username ${username} already exists. Choose a new username` } })
            }

            const newUser = new User({
                config: {
                    method: 'local'
                },
                auth: {
                    username,
                    email,
                    local: {
                        password
                    }
                }
            });

            await newUser.save();

            // generate token
            const token = signToken(newUser);

            const userDetails = {
                config: newUser.config,
                email: newUser.auth.email,
                username: newUser.auth.username
            }

            // Respond with token and the user details
            res.status(201).json({ token, user: userDetails });

        } catch (error) {
            console.log(error);
        }
    },
    login: async (req,res) => {
        try {
            const user = req.user._doc;
            const token = signToken(user);
            const payload = {
                token,
                user: {
                    ...user,
                    auth: {
                        email: user.auth.email,
                        username: user.auth.username
                    }
                }
            }

            res.status(200).json(payload);
        } catch (error) {
            console.log(error);
        }
    }
}