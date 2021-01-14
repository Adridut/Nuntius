const express = require('express');
const socket = require('socket.io');
const app = express();
const cors = require('cors');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./users');

app.use(cors());
app.use(express.json())

const server = app.listen("3001", () => {
    console.log("Server running on port 3001...")
});

io = socket(server);


io.on('connection', (socket) => {
    console.log("User connected with id: " + socket.id);

    socket.on("join_room", (room, userName) => {
        const user = userJoin(socket.id, userName, room);
        socket.join(room);
        console.log(userName + ' joined room: ' + room);
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    socket.on("send_message", (messageInfo) => {
        socket.to(messageInfo.room).emit("receive_message", messageInfo.content)
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });
});