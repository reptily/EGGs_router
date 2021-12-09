const net = require('net');
const Color = new (require('./lib/Color.js'));
const config = require('../config.json');
const Socket = require('./controllers/Socket.js');

let clients = [];
global.dbEGGs = [];

const server = net.createServer((client) => {
    let meId = clients.length;
    clients[meId] = [];
    clients[meId]['info'] = client;

    new Socket(meId, client);
});

server.on('error', (err) => {
    Color.p('FgRed', err);
});


server.listen(config.port, () => {
    Color.p('FgGreen', 'Server Init! \nListening port: ' + config.port);
});