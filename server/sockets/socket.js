const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    //listen newTicket event
    client.on('nextTicket', function(data, callback) {
        let newTicket = ticketControl.nextTicket();
        console.log(newTicket);
        callback(newTicket);
    });

    //load data
    client.emit('loadData', {
        lastTicket: ticketControl.getLastTicket(),
        attendingTickets: ticketControl.getAttendingTickets()
    });

    //
    client.on('attendTicket', (data, callback) => {
        if (!data.platform) {
            return callback({
                err: true,
                message: 'Platform is required'
            })
        }

        let attendTicket = ticketControl.assignTicket(data.platform);

        callback(attendTicket);

        //update last attending in all the screens
        client.broadcast.emit('reloadData', {
            attendingTickets: ticketControl.getAttendingTickets()
        });
    });

    // client.emit('sendMessage', {
    //     user: 'Admin',
    //     message: 'Welcome to this app'
    // });

    // client.on('disconnect', () => {
    //     console.log('user disconnect');
    // });

    // //listen the frontend
    // client.on('sendMessage', (data, callback) => {
    //     console.log(data);
    //     client.broadcast.emit('sendMessage', data);
    // });
});