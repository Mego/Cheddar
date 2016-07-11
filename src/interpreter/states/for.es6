import NIL from '../core/consts/nil';
import CheddarExec from '../exec';
import CheddarEval from '../core/eval/eval';
import CheddarBool from '../core/primitives/Bool';
import CheddarScope from '../core/env/scope';
import CheddarAssign from './assign';
import Signal from '../signal';

export default class CheddarFor {
    constructor(toks, scope) {
        this.toks = toks;
        this.scope = scope;
    }

    exec() {
        // Create `for`'s scope
        let SCOPE = new CheddarScope(this.scope);

        let pool0,
            poola, poolb, poolc, // Token caching
            res, bool, // Storage
            ralloc, // Pending result
            lres, // Last result
            trs; // Temp

        this.toks.shift(); // Dispose `for` guarantee token
        // Execute the initial setup
        pool0 = this.toks.shift();

        if (pool0.constructor.name === "StatementAssign") {
            trs = new CheddarAssign(pool0, SCOPE).exec();
        } else {
            trs = new CheddarEval(pool0, SCOPE).exec();
        }

        // Cache tokens to avoid new lookup
        poola = this.toks.shift();
        poolb = this.toks.shift();
        poolc = this.toks.shift();

        while (true) {
            res = new CheddarEval(poola, SCOPE);
            res = res.exec();

            bool = new CheddarBool(SCOPE);

            if (bool.init(res) && bool.value === true) {
                console.log(poolc._Tokens[0]);
                ralloc = new CheddarExec(
                    poolc._Tokens[0],
                    SCOPE
                );

                ralloc = ralloc.exec();

                if (ralloc instanceof Signal) {
                    if (ralloc.type === Signal.BREAK)
                        break;
                } else {
                    lres = ralloc;
                }

                if (typeof ralloc === "string")
                    break;

                trs = new CheddarEval(poolb, SCOPE);
                trs.exec();

            } else {
                break;
            }
        }

        return lres || new NIL;
    }
}