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

    let msgTxt = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: msgTxt.val()
    }, function (msg) {
        msgTxt.val('');
    });    
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) return alert('No geolocation!');

    locationButton.attr('disabled', 'disabled').text('Sending...');

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

        locationButton.removeAttr('disabled').text('Sending location');
    }, function (position) {
        locationButton.removeAttr('disabled').text('Sending location');
        return alert('Unable to fetch location!');
    });
});