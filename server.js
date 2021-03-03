require('dotenv').config()
const express = require('express')
const app = express()

// Server set up
const PORT = process.env.PORT || 5000
var server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
require('./config/passport')
const { redirectToHttps } = require('./middleware/middleware');

const cors = require('cors')

if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`)
        else
        next()
    })
}

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
if(process.env.NODE_ENV !== 'production')
    app.use(cors())

// Mongoose connect
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false, 
        useCreateIndex: true 
    })
    .then(() => console.log(`MongoDB connection established`))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/rooms', require('./routes/api/rooms'))
app.use('/api/messages', require('./routes/api/messages'))

// Serve static assets under production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// Socket programming
require('./config/socketconfig')(server);