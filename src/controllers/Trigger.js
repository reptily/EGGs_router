const Protocol = new (require('../lib/Protocol.js'));
const Color = new (require('../lib/Color.js'));
const fs = require('fs');

module.exports = class {

    constructor(client, data) {
        this.client = client;
        this.data = data;
    }

    Init(commandId) {
        let nameCommand = Protocol.getNameCommand(commandId);

        if (nameCommand !== null) {
            this.client = this.startEvent(nameCommand);
        }

        return this.client;
    }

    startEvent(command) {
        if (fs.existsSync('events/' + command + '.js')) {
            const Event = require('../events/' + command + '.js');
            const event = new Event(this.client);
            event.action(this.data);
            this.client = event.getClient();
        } else {
            Color.p('FgRed', 'Event file: events/' + command + '.js not found');
        }

        return this.client;
    }

};
