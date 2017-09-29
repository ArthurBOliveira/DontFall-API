const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connect');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User!'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('Se liga mané!');
    });

    socket.on('createLocationMessage', (location) => {
        console.log('Location: ', location);
        io.emit('newLocationMessage', generateLocationMessage('Admin', location.latitude, location.longitude));
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log('On port: ' + port);
});