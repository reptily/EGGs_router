const Protocol = new (require('../lib/Protocol.js'));
const Event = require('./Event.js');

module.exports = class extends Event {

    action() {
        let answer = Protocol.answer(
            Protocol.getNumberCommand('HandShake'),
            null
        );

        let client = this.getClient();
        client.isAccepted = true;
        this.setClient(client);

        this.write(answer);
    }

};
