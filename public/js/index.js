let socket = io();

socket.on('connect', function () {
    console.log('Connected to Server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.emit('createMessage', {
    from: 'example@email.com',
    text: 'Super Test'
});

socket.on('newMessage', (message) =>{
    console.log(message);
});