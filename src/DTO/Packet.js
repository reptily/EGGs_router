module.exports = class {

    constructor() {
        this._version = null;
        this._command = null;
        this._content = null;
    }

    get version() {
        return this._version;
    }

    set version(value) {
        this._version = value;
    }

    get command() {
        return this._command;
    }

    set command(value) {
        this._command = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }

};