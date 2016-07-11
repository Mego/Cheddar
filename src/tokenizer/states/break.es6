import CheddarLexer from '../tok/lex';
import { EXIT_NOTFOUND } from '../consts/err';

export default class StatementBreak extends CheddarLexer {
    exec() {
        this.open(false);
        this.jumpWhite();

        if (this.jumpLiteral("break") === false) {
            return EXIT_NOTFOUND;
        } else {
            this.Tokens = 'break';
            return this.close();
        }
    }
}