let socket = io();

socket.on('connect', function () {
    console.log('Connected to Server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});

socket.on('newMessage', (message) => {
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text} `);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    let li = $('<li></li>');
    let a = $('<a target="_blank">Location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

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

var locationButton = $('#sendLocation');
locationButton.on('click', function () {
    if (!navigator.geolocation) return alert('No geolocation!');

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function (position) {
        return alert('Unable to fetch location!');
    });
});