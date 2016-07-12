import CheddarLexer from '../tok/lex';

export default function CheddarCustomLexer(orig, ...args) {
    let parser = new CheddarLexer();
    parser.exec = function() {
        if (orig instanceof CheddarLexer) {
            orig.Code = this.Code;
            orig.Index = this.Index;
            return orig.exec(...args);
        } else {
            return new orig(this.Code, this.Index).exec(...args);
        }
    };
    return parser;
}