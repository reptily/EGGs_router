const Helper = new (require('../lib/Helper.js'));
const Packet = require('../DTO/Packet.js');

/**
 * START BIT (2) FE 06
 * Length packet (8)
 * Version protocol (3)
 * Command (2)
 * Content (*)
 * STOP BIT (2) CD 87
 **/

const startBit = [0xfe, 0x06];
const stopBit = [0xcd, 0x87];
const version = [0x00, 0x00, 0x01]; // 0.0.1

/**
 * first byte
 * 0 - 100 Client
 * 101 - 200 Server
 * 202 - 255 Errors Server
 *
 * @type {Array}
 */
const dictionariesCommand = [
    'OK', // 0
    'SendEggs', // 1
];


module.exports = class {

    isCorrectPacket(data) {
        if (data.length < 12) {
            return false;
        }

        let lengthPacket = Helper.bytes8ToInt([data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9]]);

        if (data[0] === startBit[0] &&
            data[1] === startBit[1] &&
            BigInt(data.length) === lengthPacket &&
            data[data.length - 2] === stopBit[0] &&
            data[data.length - 1] === stopBit[1]
        ) {
            return true;
        }

        return false;
    }

    getDTO(data) {
        let version = parseInt(data[10], 16) + "."
            + parseInt(data[11], 16) + "."
            + parseInt(data[12], 16);
        let command = Helper.bytes2ToInt([data[13], data[14]]);
        let content = Buffer.from(data.slice(15, -2)).toString('utf8');

        let packet = new Packet();
        packet.version = version;
        packet.command = command;
        packet.content = content ;

        return packet;
    }

    answer(command, content) {
        let data = Array.from(Buffer.from(content, 'utf8'));
        let packetLenght = 17 + data.length;

        return Buffer.from(
            startBit
            .concat(Helper.intToBytes8(packetLenght)) // Length packet (17 + content)
            .concat(version) // Version protocol
            .concat(Helper.intToBytes2(command)) // Number command
            .concat(content)
            .concat(stopBit)
        );
    }

    getNumberCommand(name) {
        dictionariesCommand.forEach((item, i) => {
            if (item === name) {
                return i;
            }
        });

        return false;
    }

};
