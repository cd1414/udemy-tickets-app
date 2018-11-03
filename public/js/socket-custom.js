var socket = io();

//list info to the server
socket.on('connect', function() {
    console.log('connect to the server');
});

socket.on('disconnect', function() {
    console.log('Lost connection with the server');
});

//send info to the server
// socket.emit('sendMessage', {
//     user: 'Christian',
//     message: 'Hello World'
// }, function(resp) {
//     console.log(resp);
// });

//listen the backend
socket.on('sendMessage', function(message) {
    console.log(message);
});