// modules
var express = require('express');
var https = require('https');
var morgan = require('morgan');
var fs = require('fs');

var options = {
  key: fs.readFileSync('/etc/ssl/private/selfsigned.key'),
  cert: fs.readFileSync('/etc/ssl/certs/selfsigned.crt')
};

// configuration files
var configServer = require('./lib/config/server');

// app parameters
var app = express();
app.set('port', configServer.httpPort);
app.use(express.static(configServer.staticFolder));
app.use(morgan('dev'));

// serve index
require('./lib/routes').serveIndex(app, configServer.staticFolder);

// HTTP server
var server = https.createServer(options, app);
server.listen(app.get('port'), function () {
  console.log('HTTPS server listening on port ' + app.get('port'));
});

// WebSocket server
var io = require('socket.io')(server);
io.on('connection', require('./lib/routes/socket'));

module.exports.app = app;