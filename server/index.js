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
    console.log(socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log('User joined room: ' + data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});