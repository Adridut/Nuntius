const express = require('express');
const socket = require('socket.io');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())

const server = app.listen("3001", () => {
    console.log("Server running on port 3001...")
});

io = socket(server);

io.on('connection', (socket) => {
    console.log("User connected with id: " + socket.id);

    socket.on("join_room", (room) => {
        socket.join(room);
        console.log('User joined room: ' + room);
    });

    socket.on("send_message", (messageInfo) => {
        socket.to(messageInfo.room).emit("receive_message", messageInfo.content)
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});