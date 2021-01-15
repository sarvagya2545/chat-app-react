module.exports = (server) => {
    // Initialize sockets
    const io = require("socket.io")(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        console.log("A user has connected");

        socket.on('connectToRoom', ({ room }) => {
            console.log(room.roomId, room.roomName);
            socket.join(room.roomId)
        })

        socket.on("message", ({ room, messageObject }) => {
            console.log('room ', room)
            console.log('message ', messageObject)

            io.to(room).sockets.emit('message', messageObject)
        })

        socket.on("typing", ({ user, roomId }) => {
            // console.log(user)
            // console.log(roomId)
            // io.to(roomId).sockets.emit('typing', { user, roomId })
            socket.to(roomId).emit('typing', { user, roomId })
        })

        socket.on("disconnect", () => {
            console.log("User has disconnected");
        });
    });
};
