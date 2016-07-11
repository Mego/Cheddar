import CheddarLexer from '../tok/lex';
import CheddarTokenize from '../tok';
import CheddarCustomParser from '../parsers/custom';
import StatementBreak from '../states/break';
import * as CheddarError from '../consts/err';

export default class CheddarCodeblock extends CheddarLexer {
    exec() {
        if (!this.lookAhead("{"))
            return CheddarError.EXIT_NOTFOUND;

        this.jumpLiteral("{");

        let RUN = this.initParser(CheddarCustomParser(CheddarTokenize, '}', [StatementBreak]));
        let RES = RUN.exec();

        this.Index = RES.Index || RUN.Index;
        if (RUN.Errored || !(RES instanceof CheddarLexer))
            return this.error(RES);

        this.Index = RES.Index;
        this.Tokens = RES;

        this.jumpWhite();
        if (this.jumpLiteral("}") === false) {
            return this.error(CheddarError.UNEXPECTED_TOKEN);
        }

        return this.close();
    }
}