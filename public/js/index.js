let socket = io();

socket.on('connect', function () {
    console.log('Connected to Server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.on('newMessage', (message) =>{
    console.log(message);
    
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text} `);

    $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function (msg) {
        console.log('Peguei: ', msg);
    });    
});