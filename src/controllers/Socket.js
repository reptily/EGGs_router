const Color = new (require('../lib/Color.js'));
const config = require('../../config.json');
const Helper = new (require('../lib/Helper.js'));
const Protocol = new (require('../lib/Protocol.js'));
const Trigger = require('./Trigger.js');

module.exports = class {

    constructor(id, client) {
        this.client = client;
        this.client.id = id;
        this.client.isAccepted = false;

        Color.p('FgGreen', 'Client connected id:' + id);

        this.Init();
    }

    Init() {
        this.client.on('data', (data) => {
            if (config.debug) {
                let hex = Helper.bytesToString(data);
                console.log(
                    Color.c('FgGreen', 'Client id:' + this.client.id + ' send: ') +
                    Color.c('FgYellow', hex)
                );
            }

            if (!Protocol.isCorrectPacket(data)) {
                if (config.debug) {
                    Color.p('FgRed', 'Client id:' + this.client.id + ' invalid a packet');
                }

                this.client.destroy();
                return;
            }

            let packet = Protocol.getDTO(data);

            if (config.debug) {
                console.log(packet);
            }

            const trigger = new Trigger(this.client, packet.content);
            this.client = trigger.Init(packet.command);

        });
    }

};