export default class CheddarTokens {
    constructor(tokens) {
        if (tokens === null) {
            this.length = -1;
        } else if (Number.isInteger(tokens.length) && tokens.splice) {
            this.length = tokens.length;
            for (let i = 0; i < tokens.length; i++) this[i] = tokens[i];
        } else {
            throw new TypeError("VSLTokens: provided instantiation token is invalid");
        }
    }

    UpdateTokens(tokens) {
        if (tokens === null) {
            this.length = -1;
        } else if (Number.isInteger(tokens.length) && tokens.splice) {
            this.length = tokens.length;
            for (let i = 0; i < tokens.length; i++) this[i] = tokens[i];
        } else {
            throw new TypeError("VSLTokens: provided update token is invalid");
        }
    }

    // Does nothing ATM
    splice(...args) { return Array.prototype.splice.call(this, ...args); }

    //* [Symbol.iterator]() {
    //    for (let i = 0; i < this.length; i++) {
    //        yield this[i];
    //    }
    //    return this;
    //}
}