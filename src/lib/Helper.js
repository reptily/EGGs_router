module.exports = class {

    intToBytes2(num) {
        return [
            (num >> 8) & 255,
            num & 255,
        ];
    }

    intToBytes4(num) {
        return [
            (num >> 24) & 255,
            (num >> 16) & 255,
            (num >> 8) & 255,
            num & 255,
        ];
    }

    intToBytes8(num) {
        return [
            0,
            0,
            0,
            0,
            (num >> 24) & 255,
            (num >> 16) & 255,
            (num >> 8) & 255,
            num & 255,
        ];
    }

    bytes2ToInt(bytes) {
        return (bytes[0] & 0xFF) << 8 |
            bytes[1] & 255;
    }

    bytes4ToInt(bytes) {
        return (bytes[0] & 0xFF) << 24 |
            (bytes[1] & 0xFF) << 16 |
            (bytes[2] & 0xFF) << 8 |
            bytes[3] & 255;
    }

    bytes8ToInt(bytes) {
        return BigInt('0x' + bytes.map(byte => byte.toString(16).padStart(2, '0')).join(''))
    }

    bytesToString(bytes) {
        return bytes.toString('hex').match(/.{2}/g).join(" ").toUpperCase();
    }

};