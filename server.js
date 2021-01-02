const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
require('./config/passport')

const cors = require('cors')

const app = express()
const server = require('http').createServer(app)

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
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

// Socket programming
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})
io.on('connection', (socket) => {
    console.log('A user has connected');

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    })
})

// Server set up
const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server started on port ${PORT}`))