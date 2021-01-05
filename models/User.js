const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    config: {
        method: {
            type: String,
            enum: ['local', 'google', 'facebook'],
            required: true
        }
    },
    auth: {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        local: {
            password: {
                type: String
            }
        },
    },
    rooms: {
        type: [
            {
                type: String,
                ref: 'room'
            }
        ],
        default: []
    }
})

// apply middleware before saving
userSchema.pre('save', async function(next) {
    try {
        if(this.config.method !== 'local') next();

        // hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.auth.local.password, salt);
        this.auth.local.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.isValidPassword = async function (password) {
    // this points to User model
    try {
        return await bcrypt.compare(password, this.auth.local.password);
    } catch(err) {
        throw new Error(err);
    }
}

const User = mongoose.model('user', userSchema);
module.exports = User;