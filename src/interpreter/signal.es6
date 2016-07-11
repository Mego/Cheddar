// Sends a propogating signal throughout the program
export default class Signal {
    constructor(type, data) {
        this.Type = type;
        this.Data = data;
    }
}

Signal.BREAK = Symbol("SIGBREAK");