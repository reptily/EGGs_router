const config = require('../../config.json');
const Helper = new (require('../lib/Helper.js'));
const Color = new (require('../lib/Color.js'));

module.exports = class {

    constructor(client) {
        this.client = client;
    }

    getClient() {
        return this.client;
    }

    setClient(client) {
        this.client = client;
    }

    clientIsAccepted() {
        return this.client.isAccepted;
    }

    write(packet) {

        if (config.debug) {
            let hex = Helper.bytesToString(packet);
            console.log(
                Color.c('FgGreen', 'Send to client id:' + this.client.id + ' ') +
                Color.c('FgYellow', hex)
            );
        }

        this.client.write(packet);
    }

};
