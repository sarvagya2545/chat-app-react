// list of object of users which are online
/**
 * [
 *      {
 *          id: (username),
 *          sockets: [ (id), (id), (id) ]
 *      }
 * ]
 */
let onlineUsers = [];

module.exports = (server) => {
    // Initialize sockets
    const socketCORSConfig = {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        }
    };
    if(process.env.NODE_ENV === 'production') {
        const io = require("socket.io")(server);
    } else {
        const io = require("socket.io")(server, socketCORSConfig);
    }
    io.on("connection", (socket) => {
        console.log("A user has connected");

        socket.on('online', ({ userId }) => {
            // check if user is already online
            const userAlreadyOnline = onlineUsers.some((onlineuser) => (onlineuser.id === userId))

            if(userAlreadyOnline) {
                // if user is already online, then that would mean that the user has logged in from a new device.
                // push it's socket id to the sockets list
                onlineUsers.forEach(onlineuser => {
                    if(onlineuser.id === userId) {
                        onlineuser.sockets = onlineuser.sockets ? [ ...onlineuser.sockets ] : []
                        onlineuser.sockets.push(socket.id)
                    }
                })
            } else {
                // if the user is not already online, then create a new onlineuser
                const onlineuser = { id: userId, sockets: [ socket.id ] }
                onlineUsers.push(onlineuser)
            }

            console.log(onlineUsers);

            // broadcast to everyone about the status of a particular user
            io.sockets.emit('userOnlineStatus', onlineUsers)
        })

        socket.on('connectToRoom', ({ room }) => {
            console.log(room.roomId, room.roomName);
            socket.join(room.roomId)
        })

        socket.on('createdChatRoom', ({ room }) => {
            // if the users in the room are online, they should get connected
            onlineUsers.forEach(onlineuser => {
                const personIsOnline = room.people.some(person => onlineuser.id === person)
                if(personIsOnline) {
                    // send to every instance of the user
                    onlineuser.sockets.forEach(socketId => {
                        io.to(socketId).emit('addToRoom', { room })
                    })
                }
            })
            // if the users are offline, they will get connected to the room automatically (when they come back to the site)
        })

        socket.on('exitRoom', ({ room, userId, userName }) => {
            console.log('user exits the room', { room, userId, userName });
            socket.to(room).emit('exitRoom', { user: { userId, userName }, room })
            socket.leave(room);
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

            // remove the socket from the online user's list
            onlineUsers.forEach(onlineuser => {
                onlineuser.sockets = onlineuser.sockets.filter(socketId => {
                    return (socketId !== socket.id)
                })
            })

            console.log(onlineUsers)

            // if an user has no sockets, remove him from current user list
            onlineUsers = onlineUsers.filter(onlineuser => {
                return (onlineuser.sockets.length !== 0);
            })

            console.log(onlineUsers);
            console.log("User has disconnected");

            // broadcast to everyone about the status of a particular user
            io.sockets.emit('userOnlineStatus', onlineUsers)
        });
    });
};
