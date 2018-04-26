var args = require('minimist')(process.argv.slice(2));
var app = require('./app');
var debug = require('debug')('payment:server');
var http = require('http');
var fs = require('fs');
var log = require('captains-log')();
app.set('port', port);

if (typeof args.port === "undefined") {
  port = 3000;
} else {
  port = args.port;
}
var port = normalizePort(port);

if (typeof args.secure !== "undefined") {

    var https = require('https');
    var fs = require('fs');
    var privateKey = fs.readFileSync('', 'utf8');
    var certificate = fs.readFileSync('', 'utf8');
    var httpsServer = https.createServer(credentials, app);
    var logMessage = "You are running a HTTPS server. To run a non secure server (HTTPS), use node bin/www.js --secure";
    httpsServer.listen(port, '0.0.0.0');

  } else {
    var server = http.createServer(app);
    var logMessage = "You are running a HTTP server. To run a secure server (HTTPS), use node bin/www.js --secure";
    server.listen(port, '0.0.0.0');
  }


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }
    return false;
}

/**
 *  Gather app meta-info and log startup message (the chameleon).
 */

fs.readFile('./application/public/texts/startup.txt', function(err, file) {

  var lines = file.toString().split('\n');
  for (var i = 0; i < lines.length; i++) {

    log.info(lines[i]);
  }

  log.info("Citara labs' General purpose payment gateway is running at port " + port);
  log.info(logMessage);
  log.info("To shut down, press <CTRL> + C at any time.");
  console.log('');
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}