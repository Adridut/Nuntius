const express = require('express');
const socket = require('socket.io');
const app = express();
const cors = require('cors');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    setReady,
} = require('./users');
const {
    startGame,
    changeGameMode,
} = require('./games');

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

    socket.on("set_ready", () => {
        const user = getCurrentUser(socket.id);
        setReady(user);
        console.log(user.username+" is ready "+ user.ready)
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });    });

    socket.on("start_game", (room, mode) => {
        const game = startGame(room, mode);
        console.log("Game started with mode: " +game.mode);
        io.to(room).emit("send_game_mode", game.mode);
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