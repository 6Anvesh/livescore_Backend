const app = require('./init');
const http = require('http');
const server = http.createServer(app);
const port = process.env.port || 3000;

server.listen(port);
console.log("server started at 3000 port")