module.exports = class {

    constructor() {
        this._egg = null;
        this._signature = null;
        this._page = null;
        this._type = null;
        this._size = null;
        this._hash = null;
        this._create_at = null;
        this._update_at = null;
    }

    get egg() {
        return this._egg;
    }

    set egg(value) {
        this._egg = value;
    }

    get signature() {
        return this._signature;
    }

    set signature(value) {
        this._signature = value;
    }

    get page() {
        return this._page;
    }

    set page(value) {
        this._page = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get hash() {
        return this._hash;
    }

    set hash(value) {
        this._hash = value;
    }

    get create_at() {
        return this._create_at;
    }

    set create_at(value) {
        this._create_at = value;
    }

    get update_at() {
        return this._update_at;
    }

    set update_at(value) {
        this._update_at = value;
    }
    
};
