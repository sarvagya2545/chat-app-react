const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
require('./config/passport')

const app = express()
// Server set up
const PORT = process.env.PORT || 5000
var server = app.listen(PORT, () => console.log(`Server started on port ${3000}`))

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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
app.get('/', (req,res) => {
    res.send('Hello')
})
app.use('/api/users', require('./routes/api/users'))

// Socket programming
const io = require('socket.io')(server)
io.on('connection', (socket) => {
    console.log('A user has connected');

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    })
})
