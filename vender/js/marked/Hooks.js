/** @typedef {import('./MarkedOptions.ts').MarkedOptions} MarkedOptions */
/** @typedef {import('./Tokens.ts').Token} Token */
/** @typedef {import('./Tokens.ts').TokensList} TokensList */
import { _defaults } from './defaults.ts';
import { _Lexer } from './Lexer.ts';
import { _Parser } from './Parser.ts';
export class _Hooks {
    options;
    block;
    /**
       * @param {MarkedOptions} [options]
       */
    constructor(options) {
        this.options = options || _defaults;
    }
    /**
       * @static
       * @default Set<string>
       */
    static passThroughHooks = new Set([
        'preprocess',
        'postprocess',
        'processAllTokens',
    ]);
    /**
     * Process markdown before marked
       * @param {string} markdown
       * @returns {string}
       */
    preprocess(markdown) {
        return markdown;
    }
    /**
     * Process HTML after marked is finished
       * @param {string} html
       * @returns {string}
       */
    postprocess(html) {
        return html;
    }
    /**
     * Process all tokens before walk tokens
       * @param {Token[] | TokensList} tokens
       * @returns {any}
       */
    processAllTokens(tokens) {
        return tokens;
    }
    /**
     * Provide function to tokenize markdown
       * @returns {any}
       */
    provideLexer() {
        return this.block ? _Lexer.lex : _Lexer.lexInline;
    }
    /**
     * Provide function to parse tokens
       * @returns {any}
       */
    provideParser() {
        return this.block ? _Parser.parse : _Parser.parseInline;
    }
}
