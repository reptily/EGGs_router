const Color = new (require('../../src/lib/Color.js'));

module.exports = class {

    constructor() {
        this.passed = 0;
        this.failed = 0;
        this.errors = [];
    }

    run() {
        let classes = Object.getOwnPropertyNames(this.__proto__);

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
    }

    assertSame(needle, tests) {
        if (typeof tests === 'object') {
            tests = JSON.stringify(tests);
        }

        if (typeof needle === 'object') {
            needle = JSON.stringify(needle);
        }

        if (needle === tests) {
            this.passed++;
        } else {
            this.failed++;
            this.errors.push({
                test: null,
                line: 0,
                error: needle + ' not same ' + tests,
            });
        }
    }
};
