////////////////////////////////////////////////////////////
// set up basic express server
////////////////////////////////////////////////////////////

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var server = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

server.use(morgan('short'));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(express.static('client'));

server.listen(port, ipaddress, function() {
  console.log('Node server started on %s:%d', ipaddress, port);
});

////////////////////////////////////////////////////////////
// data router
////////////////////////////////////////////////////////////

var dataRouter = express.Router();
server.use('/api/data', dataRouter);
require('./data/dataRoutes.js')(dataRouter);

////////////////////////////////////////////////////////////
// set up dgram socket
////////////////////////////////////////////////////////////

var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

socket.bind({
  address: ipaddress,
  port: port,
  exclusive: true
});

socket.on('listening', function () {
  console.log('here');
});

////////////////////////////////////////////////////////////
// send something
////////////////////////////////////////////////////////////

var message = new Buffer("This is my first buffer");
  
socket.send(message, 0, message.length, port, "localhost", function(err) {
  console.log('message sent');
});

socket.on('message', function(msg, rinfo) {
  console.log(msg.toString());
});
