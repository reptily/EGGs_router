const net = require('net');
const Color = new (require('../../src/lib/Color.js'));
const config = require('../../config.json');

module.exports = class {

    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.errors = [];
        this.client = null;
        this.response = null;
        
        this._isIfAnswer = false;
    }

    run() {
        let classes = Object.getOwnPropertyNames(this.__proto__);

        (async () => {
            await this._connect();
            
            for (const item of classes) {
                const regex = /^test([A-Z])/gmi;
                if (regex.exec(item) !== null) {
                    Color.p('FgYellow', 'Test ' + item);
                    eval('this.' + item + '()');
                    this.response = await this._getResponse();
                }
            }

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
            this.client.on("data", (data) => {
                this.response = data;
                this._isIfAnswer = true;
            });
        });
    }
    
    async _getResponse() {
        return new Promise((resolve, reject) => {
            let timer = setInterval(() => {
                if (this._isIfAnswer !== false) {
                    clearTimeout(timer);
                    resolve(this.response);
                }
            }, 100);
            
            setTimeout(() => reject(null), 30000);
        });
    }

    sendPacket(bytes, sendHandShake = true) {
        this._isIfAnswer = false;
        this.response = null;
        
        if (sendHandShake) {
            let packet = [0xfe, 0x06] // Start bit
            .concat([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x11]) // Length packet (17 + content)
            .concat([0x00, 0x00, 0x01]) // Version protocol
            .concat([0x00, 0x00]) // Number command (0 - HandShake)
            .concat([0xcd, 0x87]); // Stop bit
            
            this.client.write(new Buffer.from(packet));
        }
        
        this.client.write(new Buffer.from(bytes));
    }

};
