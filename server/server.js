const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {
    isRealString
} = require('./utils/validation');
const {
    Players
} = require('./utils/players');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let players = new Players();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.on('join', (params, callback) => {
        console.log(params);
        if (!isRealString(params.name) || !isRealString(params.room)) return callback('');

        socket.join(params.room);
        players.removePlayer(socket.id);
        players.addPlayer(socket.id, params.name, params.room);

        // io.to(params.room).emit('currentPlayers', players.getUserList(params.room));
        // socket.to(params.room).emit('currentPlayers', players.getPlayerList(params.room));
        socket.broadcast.to(params.room).emit('newPlayerServer', params);

        callback(players.getPlayerList(params.name, params.room));
    });

    //Update Players Position
    socket.on('updatePosition', (position) => {
        // console.log(position);
        io.to(position.room).emit('moveFromServer', position)
    });

    //Player Actions
    socket.on('playerAction', (action) => {
        //{'name' : 'Player', 'action' : 'Fire'}
        io.to(action.room).emit('playerActionServer', action);
    });
    //#endregion

    socket.on('disconnect', () => {
        var player = players.removePlayer(socket.id);

        if (player) {
            io.to(player.room).emit('removePlayer', player.name);
        }
    });
});

server.listen(port, () => {
    console.log('On port: ' + port);
});