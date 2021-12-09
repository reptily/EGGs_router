const Protocol = new (require('../lib/Protocol.js'));
const Event = require('./Event.js');
const Egg = require('../DTO/Egg');

module.exports = class extends Event {

    action(data) {
        if (this.clientIsAccepted() === false) {
            return;
        }

        let json = [];
        try {
            json = JSON.parse(data);
        } catch (err) {
            return;
        }

        // todo validation

        let EGGs = [];
        json.forEach((item) => {
            let egg = new Egg();
            egg.egg = item.egg;
            egg.type = item.type;
            egg.page = item.page;
            egg.hash = item.hash;
            egg.create_at = item.create_at;
            egg.update_at = item.update_at;

            EGGs.push(egg);
        });

        let answer = Protocol.answer(
            Protocol.getNumberCommand('ResponseSendEggs'),
            JSON.stringify({
                isSuccess: true,
                countEGGs: EGGs.length
            })
        );

        // todo dublicat
        let client = this.getClient();
        if (global.dbEGGs[client.id] === undefined) {
            global.dbEGGs[client.id] = [];
        }
        global.dbEGGs[client.id] = global.dbEGGs[client.id].concat(EGGs);

        console.log(global.dbEGGs[client.id]);

        this.write(answer);
    }

};
