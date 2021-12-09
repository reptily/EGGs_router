const Tests = require('../tests.js');
const Helper = new (require('../../../src/lib/Helper.js'));

module.exports = class extends Tests {

    testHandShake() {
        let packet = [0xfe, 0x06] // Start bit
            .concat([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x11]) // Length packet (17 + content)
            .concat([0x00, 0x00, 0x01]) // Version protocol
            .concat([0x00, 0x00]) // Number command (0 - HandShake)
            .concat([0xcd, 0x87]); // Stop bit

        this.sendPacket(packet, false);
    }

};