//import libraries
const express = require('express');
const path = require('path');
const socketIo = require('socket.io');
const http = require('http');

//init express
const app = express();

//define server
//socket io dont work directly with express so we need to do this
let server = http.createServer(app);

//get the port 
const port = process.env.PORT || 3000;

//expose public folder
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//IO = direct communitation with the Backend
module.exports.io = socketIo(server);
require('./sockets/socket');

//start the sever
//socket io dont work directly with express so we need to do this
server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`List port:  ${ port }`);
});