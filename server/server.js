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

    //#region Messages
    socket.emit('newMessage', generateMessage('Admin', 'Welcome!'));
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User!'));

    //Messages Chat
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);

        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('');
    });

    //Location Chat
    socket.on('createLocationMessage', (location) => {
        console.log('Location: ', location);
        io.emit('newLocationMessage', generateLocationMessage('Admin', location.latitude, location.longitude));
    });
    //#endregion

    //#region GamePlayer
    //Update Players Position
    socket.on('updatePosition', (position) => {
        console.log(position);
        io.emit('moveFromServer', position)
    });

    //NewPlayer
    socket.on('newPlayer', (_player) => {
        console.log(_player);
        socket.broadcast.emit('newPlayerServer', _player)
    })
    //#endregion

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log('On port: ' + port);
});