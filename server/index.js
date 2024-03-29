const express = require('express');
const socket = require('socket.io');
const app = express();
const cors = require('cors');
const {
    userJoin,
    userLeave,
    getRoomUsers,
    getCurrentUser
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
        io.to(user.room).emit('new_user', {
            room: user.room,
            users: getRoomUsers(user.room),
            user: user.username
        });
    });

    socket.on("send_message", (messageInfo) => {
        socket.to(messageInfo.room).emit("receive_message", messageInfo.content)
    });

    socket.on('leave_room', (room, userName) => {
        userLeave(socket.id);
        io.to(room).emit('user_left', {
            room: room,
            users: getRoomUsers(room),
            user: userName
        });
    })

    socket.on('disconnect', () => {
        const user = getCurrentUser(socket.id)
        userLeave(socket.id);
        io.to(user.room).emit('user_left', {
            room: user.room,
            users: getRoomUsers(user.room),
            user: user.username
        });
    });
});