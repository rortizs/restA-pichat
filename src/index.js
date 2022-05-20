import app from './app';
import './database';

//config server socket 
const server = require("http").createServer(app);

module.exports.io = require("socket.io")(server);
require("./sockets/socket");

//inicializar el servidor
server.listen(app.get('port'));

console.log('Server on port ', app.get('port'))
