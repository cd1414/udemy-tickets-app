var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblPlatform1 = $('#lblPlatform1');
var lblPlatform2 = $('#lblPlatform2');
var lblPlatform3 = $('#lblPlatform3');
var lblPlatform4 = $('#lblPlatform4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblPlatforms = [lblPlatform1, lblPlatform2, lblPlatform3, lblPlatform4];

//connect
socket.on('connect', function() {
    console.log('Connect to the server');
    socket.on('loadData', function(data) {
        updateHTML(data.attendingTickets);
    });
});

//disconnect
socket.on('disconnect', function() {
    console.log('Disconnect from the server');
});

//listen when attending tickets changed
socket.on('reloadData', function(data) {
    updateHTML(data.attendingTickets);

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
});

function updateHTML(attendingTickets) {
    for (var i = 0; i < attendingTickets.length; i++) {
        lblTickets[i].text('Ticket: ' + attendingTickets[i].ticket);
        lblPlatforms[i].text('Platform: ' + attendingTickets[i].platform);
    }
}