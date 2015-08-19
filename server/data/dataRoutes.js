var dataController = require('./dataController.js');

module.exports = function (server) {
  server.get('/getdata', dataController.getData);
};