const Tests = require('../tests.js');
const Helper = new (require('../../../src/lib/Helper.js'));

module.exports = class extends Tests {

    testCorrectPacket() {
        let EGGs = [
            {
                "egg": "firstEgg",
                "signature": "AABBCCDDEEFF",
                "type": "html",
                "size": 128,
                "create_at": 1639060457,
                "update_at": 1639060666,
                "page": "/",
                "hash": "00112233445566778899aabbccddeeff",
            },
            {
                "egg": "firstEgg",
                "signature": "AABBCCDDEEFF",
                "type": "html",
                "size": 128,
                "create_at": 1639060457,
                "update_at": 1639060666,
                "page": "/about",
                "hash": "0aabbccddeef0112233445566778899f",
            },
        ];

        let content = Array.from(Buffer.from(JSON.stringify(EGGs), 'utf8'));        
        let packetLenght = content.length + 17;

        let packet = [0xfe, 0x06] // Start bit
            .concat(Helper.intToBytes8(packetLenght)) // Length packet (17 + content)
            .concat([0x00, 0x00, 0x01]) // Version protocol
            .concat([0x00, 0x01]) // Number command
            .concat(content)
            .concat([0xcd, 0x87]); // Stop bit

        this.sendPacket(packet);
    }
};