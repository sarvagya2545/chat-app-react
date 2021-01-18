const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/keys');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const signToken = (user) => {
    return jwt.sign({
        iss: 'Sarvagya',
        sub: user._id,
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

            // hash the password before saving it
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                config: {
                    method: 'local'
                },
                auth: {
                    username,
                    email,
                    local: {
                        password: hashedPassword
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
    },
    getUser: async (req,res) => {
        try {
            // .select('-auth.local.password') excludes the password from the user data
            const user = await User.findById(req.user.id).select('-auth.local.password');
            if (!user) throw Error('User does not exist');
            const token = signToken(user);
            res.json({ token, user });
        } catch (error) {
            res.status(400).json({ msg: e.message })
        }
    },
    getUserByHandle: async (req,res) => {
        try {
            const user = await User.find({ 'auth.username': req.params.handle })

            if(!user) {
                return res.status(404).json({ error: 'No user found' })
            }

            return res.status(200).json({ user })
        } catch(err) {
            return res.status(500).json({ err })
        }
    },
    getAllUsersExceptSelf: async (req,res) => {
        const usersFromDB = await User.find()

        console.log( 'Filtered Users', usersFromDB.filter(user => user._id != req.user.id))

        const users = usersFromDB.filter(user => user._id != req.user.id).map(user => {
            return {
                username: user.auth.username,
                email: user.auth.email,
                id: user._id
            }
        })

        res.json({ users })
    },  
    changePassword: async (req,res) => {
        
        const { newPassword, userName } = req.body;
        
        const user = await User.findOne({ 'auth.username': userName })
        user.auth.local.password = newPassword;

        await user.save()
    }
}