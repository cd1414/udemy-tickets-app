//new connection 
var socket = io();

var lblNewTicket = $('#lblNewTicket');

//connect
socket.on('connect', () => {
    console.log('User connected');
});

//disconnect
socket.on('disconnect', function() {
    console.log('User disconnected');
});

//load last ticket register
socket.on('loadData', (data) => {
    lblNewTicket.text(data.lastTicket);
})

//create a new ticket
$('button').on('click', () => {
    socket.emit('nextTicket', null, function(nextTicket) {
        lblNewTicket.text(nextTicket);
    })
});