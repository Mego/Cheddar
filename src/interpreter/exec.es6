import links from './links';
import NIL from './core/consts/nil';

export default class CheddarExec {
    constructor(exec_stack, scope) {
        this.Code = exec_stack._Tokens;
        this._csi = 0;
        this.Scope = scope;

        this.errored = false;
        this.lrep = new NIL;
    }

    step() {
        let item = this.Code[this._csi++];
        let sproc = links[item.constructor.name];

        let proc = new sproc(item, this.Scope);
        let resp = proc.exec();

        if (typeof resp === "string") {
            this.errored = true;
            this.lrep = resp;
        } else if (typeof resp === "undefined") {
            this.lrep = new NIL;
        } else {
            this.lrep = resp;
        }
    }

    exec(PRINT) {
        if (PRINT) {
            global.CHEDDAR_OPTS = { PRINT };
        }

        while (this.Code[this._csi] && !this.errored)
            this.step();
        return this.lrep;
    }
}