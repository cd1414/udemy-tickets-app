const { io } = require('../server');

io.on('connection', (client) => {
    console.log('user connect');


    client.emit('sendMessage', {
        user: 'Admin',
        message: 'Welcome to this app'
    });

    client.on('disconnect', () => {
        console.log('user disconnect');
    });

    //listen the frontend
    client.on('sendMessage', (data, callback) => {
        console.log(data);


        client.broadcast.emit('sendMessage', data);
        // if (message.user) {
        //     callback({
        //         resp: 'We are good!'
        //     })
        // } else {
        //     callback({
        //         resp: 'Not good!!'
        //     })
        // }
    });
});