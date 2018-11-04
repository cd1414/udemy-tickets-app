//open connection between backend and frontend
var socket = io();


//get url params
var searchParams = new URLSearchParams(window.location.search);
var small = $('small');

if (!searchParams.has('platform')) {
    window.location = 'index.html';
    throw new Error('Platform is required');
}

var platform = searchParams.get('platform');

$('h1').text('Platform ' + platform);

$('button').on('click', function() {
    socket.emit('attendTicket', {
        platform: platform
    }, function(resp) {
        if (resp === 'No pending tickets') {
            alert(resp);
            small.text(resp);
            return;
        }
        small.text(resp.ticket);
    });
})