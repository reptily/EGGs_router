const net = require('net');
const Color = new (require('../../src/lib/Color.js'));
const config = require('../../config.json');

module.exports = class {

    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.errors = [];
        this.client = null;
    }

    run() {
        let classes = Object.getOwnPropertyNames(this.__proto__);

        (async () => {
            await this._connect();

            classes.forEach((item, i) => {
                const regex = /^test([A-Z])/gmi;
                if (regex.exec(item) !== null) {
                    Color.p('FgYellow', 'Test ' + item);
                    eval('this.' + item + '()');
                }
            });

            Color.p('FgGreen', 'Passed: '+ this.passed);
            if (this.failed > 0) {
                Color.p('FgRed', 'Failed: ' + this.failed);
                console.log(this.errors);
            }

            this.client.end();
        })();
    }

    async _connect() {
        return new Promise((resolve, reject) => {
            this.client = net.createConnection({port: config.port});
            this.client.setTimeout(100);
            this.client.on("error", () => {
                Color.p('FgRed', 'Not connecting to serve :(');
                reject()
            });
            this.client.on("connect", () => {
                Color.p('FgGreen', 'Connected to server!');
                resolve();
            });
        });
    }

    sendPacket(bytes) {
        this.client.write(new Buffer.from(bytes));
    }

};
