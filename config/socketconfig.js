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

        socket.on("disconnect", () => {
            console.log("User has disconnected");
        });
    });
};
