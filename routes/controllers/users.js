const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/keys');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { createAndSendMail } = require('../../config/nodemailer');
const { addSubscription, sendNotification } = require('../../config/webpush');

const signToken = (user, expiresIn) => {

    if (expiresIn) {
        return jwt.sign({
            iss: 'Sarvagya',
            sub: user._id,
            iat: new Date().getTime(),
        }, jwtSecret, { expiresIn });
    }

    return jwt.sign({
        iss: 'Sarvagya',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, jwtSecret);
}

const signTokenData = (jsonData, secret) => {
    return jwt.sign({
        iss: 'Sarvagya',
        sub: jsonData,
        iat: new Date().getTime(),
        exp: new Date().setHours(new Date().getHours() + 1)
    }, secret);
}

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret, function (err, decodedData) {
        if (err)
            return { isErr: true, err }

        return {
            isErr: false,
            ...decodedData.sub
        };
    });
}

module.exports = {
    signup: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const foundUser = await User.findOne({ 'auth.email': email });
            if (foundUser) {
                return res.status(400).json({ errors: { email: 'Email is already in use' } })
            }

            const newFoundUser = await User.findOne({ 'auth.username': username });
            if (newFoundUser) {
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
                auth: {
                    email: newUser.auth.email,
                    username: newUser.auth.username
                },
                _id: newUser._id,
                rooms: []
            }

            // Respond with token and the user details
            res.status(201).json({ token, user: userDetails });

        } catch (error) {
            console.log(error);
        }
    },
    login: async (req, res) => {
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
    googleOAuth: async (req, res) => {
        try {
            console.log('google oauth set up reached');
            console.log('req.user', req.user);
            const token = signToken(req.user);

            const payload = {
                token,
                user: {
                    ...req.user._doc,
                    auth: {
                        email: req.user.auth.email,
                        username: req.user.auth.username
                    }
                }
            }

            res.status(200).json(payload);
        } catch (err) {
            console.log('google oauth set up reached but error');
            console.log('err', err);
        }
    },
    getUser: async (req, res) => {
        try {
            // .select('-auth.local.password') excludes the password from the user data
            const user = await User.findById(req.user.id).populate({ path: 'rooms' }).select('-auth.local.password');
            if (!user) throw Error('User does not exist');
            const token = signToken(user);
            res.json({ token, user });
        } catch (error) {
            res.status(400).json({ msg: e.message })
        }
    },
    getUserByHandle: async (req, res) => {
        try {
            const user = await User.find({ 'auth.username': req.params.handle })

            if (!user) {
                return res.status(404).json({ error: 'No user found' })
            }

            return res.status(200).json({ user })
        } catch (err) {
            return res.status(500).json({ err })
        }
    },
    getAllUsersExceptSelf: async (req, res) => {
        const usersFromDB = await User.find()

        // console.log( 'Filtered Users', usersFromDB.filter(user => user._id != req.user.id))

        const users = usersFromDB.filter(user => user.auth.username !== 'not-set').filter(user => user._id != req.user.id).map(user => {
            return {
                username: user.auth.username,
                email: user.auth.email,
                id: user._id,
                pfp: user.pfpUrl
            }
        })

        res.json({ users })
    },
    updateUserName: async (req, res) => {
        try {
            const getUser = await User.findOne({ "auth.username": req.body.username })
            if (getUser) {
                return res.status(400).json({ error: 'This username is already taken' })
            }
            console.log(req.body);

            await User.findOneAndUpdate({ _id: req.user._id }, { "auth.username": req.body.username });

            res.status(200).json({ status: 'OK', username: req.body.username });

        } catch (err) {
            console.log(err);
        }
    },
    sendPasswordResetLink: async (req, res) => {
        try {
            console.log('check A');
            // create forgot password token
            const obj = { userId: req.user._id, email: req.user.auth.email };
            
            // create unique token for one time use (password will change after 1 use)
            const secret = req.user.auth.local.password + '-' + req.user._id;
            const token = signTokenData(obj, secret);
            console.log('check B');
            
            // send the link with the token to the mail of the user.
            createAndSendMail({ to: req.body.email, token, userId: obj.userId })
            console.log('check C');
            return res.status(200).json({ msg: 'Link sent to your email' })
        } catch (err) {
            console.log(err);
        }
    },
    verifyPasswordChangeLink: async (req, res) => {
        try {
            console.log('reached the controller');
            const { id } = req.params;
            const { token } = req.query;

            const foundUser = await User.findById(id)
            console.log(foundUser);

            if (!foundUser)
                return res.status(401).json({ msg: 'Not authorized.' })

            if (foundUser.config.method !== 'local')
                return res.status(401).json({ msg: 'Unauthorized' })

            const password = foundUser.auth.local.password;
            const verificationSecret = password + '-' + id;

            const data = verifyToken(token, verificationSecret);
            if (data.isErr) {
                return res.status(401).json({ msg: 'Unauthorized / Timeout' })
            }

            const newToken = signToken({ _id: id, expiresIn: 60 * 15 })

            return res.status(200).json({ newToken, email: foundUser.auth.email });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ status: 'Server error', err })
        }
    },
    changePassword: async (req, res) => {
        try {
            const { newPassword } = req.body;

            // hash the password before saving it
            const salt = await bcrypt.genSalt(10);
            const newHashedPassword = await bcrypt.hash(newPassword, salt);

            User.findByIdAndUpdate(
                req.user._id,
                { "auth.local.password": newHashedPassword },
                function (err, doc) {
                    if (err)
                        return res.status(500).json({ errType: 'server error', err });

                    return res.sendStatus(200);
                }
            );

        } catch (err) {
            console.log(err);
        }
    },
    updateProfilePic: async (req, res) => {
        try {
            const { url } = req.body;

            console.log(req.body);
            if (!url) {
                return res.status(400).json({ err: 'No profile pic url found in request' });
            }

            User.findByIdAndUpdate(
                req.user._id,
                { pfpUrl: url },
                function (err, doc) {
                    if (err)
                        return res.status(500).json({ errType: 'server error', err });

                    return res.status(200).json({ url })
                }
            );

        } catch (err) {
            return res.status(500).json({ errType: 'server error', err });
        }
    },
    removeProfilePic: async (req, res) => {
        try {
            User.findByIdAndUpdate(req.user._id, { pfpUrl: "" }, function (err, doc) {
                if (err) {
                    return res.status(500).json({ errType: 'server error', err });
                }

                return res.status(200).json({ msg: 'Deleted profile pic url' });
            })
        } catch (err) {
            return res.status(500).json({ errType: 'server error', err });
        }
    },
    subscribeToPush: async (req,res) => {
        try {
            // console.log(req.body);
            // console.log(req.user.auth.username);
            const subObj = JSON.stringify(req.body);
            const subscriptionId = addSubscription(subObj);
            await User.findByIdAndUpdate(req.user._id,
                { $addToSet: { "pushSubs": subObj } }
            )

            res.status(200).json({ subscriptionId, userId: req.user._id });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errType: 'server error', error });
        }
    }
}