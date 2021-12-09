const Helper = new (require('../../../src/lib/Helper.js'));
const Tests = require('../tests.js');

module.exports = class extends Tests {

    testIntToBytes2() {
        let bytes = Helper.intToBytes2(123);
        this.assertSame([0x00, 0x7b], bytes);
    }

    testIntToBytes4() {
        let bytes = Helper.intToBytes4(123);
        this.assertSame([0x00, 0x00, 0x00, 0x7b], bytes);
    }

    testIntToBytes8() {
        let bytes = Helper.intToBytes8(123);
        this.assertSame([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x7b], bytes);
    }

    testBytes2ToInt() {
        let number = Helper.bytes2ToInt([0x01, 0xee]);
        this.assertSame(494, number);
    }

    testBytes4ToInt() {
        let number = Helper.bytes4ToInt([0x01, 0x21, 0x66, 0xee]);
        this.assertSame(18966254, number);
    }

    testBytes8ToInt() {
        let number = Helper.bytes8ToInt([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]);
        this.assertSame(72623859790382856n, number);
    }

    testBytesToString() {
        let str = Helper.bytesToString(Buffer.from([0x00, 0xef, 0x11]));
        this.assertSame("00 EF 11", str);
    }

};