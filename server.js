const express = require('express')
const app = express()

// Listen
const PORT = process.env.PORT || 3000
var server = app.listen(PORT, () => {
    console.log(`Server started on port ${3000}`)
})

const io = require('socket.io')(server)

// Middleware
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// Routes
app.get('/', (req,res) => {
    res.send('Hello')
})

// Socket programming
io.on('connection', (socket) => {
    console.log('A user has connected');

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    })
})
