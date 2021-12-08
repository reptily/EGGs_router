const Color = new (require('../../../src/lib/Color.js'));
const Tests = require('../tests.js');

module.exports = class extends Tests {

    testFunctionC() {
        let str = Color.c('FgGreen', 'Hello EGGs!');
        this.assertSame('\x1b[32mHello EGGs!\x1b[0m', str);
    }

};