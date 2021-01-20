require('dotenv').config()
const express = require('express')
const app = express()

// Server set up
const PORT = process.env.PORT || 5000
var server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

const mongoose = require('mongoose')
const passport = require('passport')
require('./config/passport')

const cors = require('cors')

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

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

// Socket programming
require('./config/socketconfig')(server);