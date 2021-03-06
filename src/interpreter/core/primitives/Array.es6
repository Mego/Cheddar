import CheddarClass from '../env/class';
import CheddarVariable from '../env/var';

import NIL from '../consts/nil';

import {MALFORMED_TOKEN} from '../consts/err';


import BehaviorOperator from './op/array';
import BehaviorCast from './cast/array';

export default class CheddarArray extends CheddarClass {
    static Name = "Array";

    init(...items) {
        let CheddarEval = require('../eval/eval');
        this.value = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i] instanceof CheddarClass) {
                // Is a class
                this.value.push(items[i]);
            } else if (items[i].constructor.name === "CheddarExpressionToken") {
                // Is an expression
                let res = new CheddarEval({ _Tokens: [items[i]] }, this.scope).exec();
                if (typeof res === "string") {
                    return res;
                } else if (!res) {
                    if (i && i !== items.length - 1) {
                        this.value.push(new NIL);
                    }
                } else {
                    this.value.push(res);
                }
            } else {
                return MALFORMED_TOKEN;
            }
        }

        return true;
    }

    // TODO: replace with Cheddar generator
    // send a `yield` signal probably
    iterator() {

    }

    reverse() {
        this.value.reverse();
        return this;
    }

    get Scope() {
        return require('../../../stdlib/primitive/Array/lib');
    }

    // Accessor to redirect [n]
    accessor(target) {
        return this.Scope.get(target) || (
            Number.isInteger(+target) ?
            new CheddarVariable(this.value[target] || new NIL) :
            null
        );
    }

    // String is the lowest level class
    //  meaning operators can have directly
    //  defined behavior
    static Operator = new Map([...CheddarClass.Operator, ...BehaviorOperator]);
    static Cast = BehaviorCast;
}

CheddarArray.Scope = require('../../../stdlib/primitive/Array/static');