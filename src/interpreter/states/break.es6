import Signal from '../signal';

export default class CheddarAssign {
    exec() {
        return new Signal(Signal.BREAK, { propogation: 1 });
    }
}