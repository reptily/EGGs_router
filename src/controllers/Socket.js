const Color = new (require('../lib/Color.js'));
const config = require('../../config.json');
const Helper = new (require('../lib/Helper.js'));
const Protocol = new (require('../lib/Protocol.js'));

module.exports = class {

    constructor(id, client) {
        this.client = client;
        this.id = id;

        Color.p('FgGreen', 'Client connected id:' + id);

        this.Init();
    }

    Init() {
        this.client.on('data', (data) => {
            if (config.debug) {
                let hex = Helper.bytesToString(data);
                console.log(
                    Color.c('FgGreen', 'Client id:' + this.id + ' send: ') +
                    Color.c('FgYellow', hex)
                );
            }

            if (!Protocol.isCorrectPacket(data)) {
                if (config.debug) {
                    Color.p('FgRed', 'Client id:' + this.id + ' invalid a packet');
                }

                this.client.destroy();
                return;
            }

            let packet = Protocol.getDTO(data);

            if (config.debug) {
                console.log(packet);
            }

            let answer = Protocol.answer(
                Protocol.getNumberCommand('OK'),
                ''
            );

            if (config.debug) {
                let hex = Helper.bytesToString(answer);
                console.log(
                    Color.c('FgGreen', 'Send to client id:' + this.id + ' ') +
                    Color.c('FgYellow', hex)
                );
            }

            this.client.write(answer);

        });
    }

};