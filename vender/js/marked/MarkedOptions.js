/** @typedef {import('./Tokens.ts').Token} Token */
/** @typedef {import('./Tokens.ts').Tokens} Tokens */
/** @typedef {import('./Tokens.ts').TokensList} TokensList */
/** @typedef {import('./Parser.ts')._Parser} _Parser */
/** @typedef {import('./Lexer.ts')._Lexer} _Lexer */
/** @typedef {import('./Renderer.ts')._Renderer} _Renderer */
/** @typedef {import('./Tokenizer.ts')._Tokenizer} _Tokenizer */
/** @typedef {import('./Hooks.ts')._Hooks} _Hooks */
export {};
/** @typedef {(this: TokenizerThis, src: string, tokens: Token[] | TokensList) => Tokens.Generic | undefined} TokenizerExtensionFunction */
/** @typedef {(this: TokenizerThis, src: string) => number | void} TokenizerStartFunction */
/** @typedef {(this: RendererThis, token: Tokens.Generic) => string | false | undefined} RendererExtensionFunction */
/** @typedef {TokenizerExtension | RendererExtension | (TokenizerExtension & RendererExtension)} TokenizerAndRendererExtension */
/** @typedef {Omit<_Hooks, 'constructor' | 'options' | 'block'>} HooksApi */
/**
 * @typedef {{
 *   [K in keyof HooksApi]?: (this: _Hooks, ...args: Parameters<HooksApi[K]>) => ReturnType<HooksApi[K]> | Promise<ReturnType<HooksApi[K]>>
 * }} HooksObject
 */
/** @typedef {Omit<_Renderer, 'constructor' | 'options' | 'parser'>} RendererApi */
/**
 * @typedef {{
 *   [K in keyof RendererApi]?: (this: _Renderer, ...args: Parameters<RendererApi[K]>) => ReturnType<RendererApi[K]> | false
 * }} RendererObject
 */
/** @typedef {Omit<_Tokenizer, 'constructor' | 'options' | 'rules' | 'lexer'>} TokenizerApi */
/**
 * @typedef {{
 *   [K in keyof TokenizerApi]?: (this: _Tokenizer, ...args: Parameters<TokenizerApi[K]>) => ReturnType<TokenizerApi[K]> | false
 * }} TokenizerObject
 */
/**
 * @typedef {Object} TokenizerThis
 * @property {_Lexer} lexer
 */
/**
 * @typedef {Object} TokenizerExtension
 * @property {string} name
 * @property {'block' | 'inline'} level
 * @property {TokenizerStartFunction | undefined} [start]
 * @property {TokenizerExtensionFunction} tokenizer
 * @property {string[] | undefined} [childTokens]
 */
/**
 * @typedef {Object} RendererThis
 * @property {_Parser} parser
 */
/**
 * @typedef {Object} RendererExtension
 * @property {string} name
 * @property {RendererExtensionFunction} renderer
 */
/**
 * @typedef {Object} MarkedExtension
 * @property {boolean} [async] True will tell marked to await any walkTokens functions before parsing the tokens and returning an HTML string.
 * @property {boolean | undefined} [breaks] Enable GFM line breaks. This option requires the gfm option to be true.
 * @property {| TokenizerAndRendererExtension[]    | undefined | null} [extensions] Add tokenizers and renderers to marked
 * @property {boolean | undefined} [gfm] Enable GitHub flavored markdown.
 * @property {HooksObject | undefined | null} [hooks] Hooks are methods that hook into some part of marked.
 * preprocess is called to process markdown before sending it to marked.
 * processAllTokens is called with the TokensList before walkTokens.
 * postprocess is called to process html after marked has finished parsing.
 * provideLexer is called to provide a function to tokenize markdown.
 * provideParser is called to provide a function to parse tokens.
 * @property {boolean | undefined} [pedantic] Conform to obscure parts of markdown.pl as much as possible. Don't fix any of the original markdown bugs or poor behavior.
 * @property {RendererObject | undefined | null} [renderer] Type: object Default: new Renderer()
 *
 * An object containing functions to render tokens to HTML.
 * @property {boolean | undefined} [silent] Shows an HTML error message when rendering fails.
 * @property {TokenizerObject | undefined | null} [tokenizer] The tokenizer defines how to turn markdown text into tokens.
 * @property {((token: Token) => void | Promise<void>) | undefined | null} [walkTokens] The walkTokens function gets called with every token.
 * Child tokens are called before moving on to sibling tokens.
 * Each token is passed by reference so updates are persisted when passed to the parser.
 * The return value of the function is ignored.
 */
/**
 * @typedef {Object} MarkedOptions
 * @property {_Hooks | undefined | null} [hooks] Hooks are methods that hook into some part of marked.
 * @property {_Renderer | undefined | null} [renderer] Type: object Default: new Renderer()
 *
 * An object containing functions to render tokens to HTML.
 * @property {_Tokenizer | undefined | null} [tokenizer] The tokenizer defines how to turn markdown text into tokens.
 * @property {Object} [extensions] Custom extensions
 * @property {{      [name: string]: RendererExtensionFunction;    }} extensions.renderers
 * @property {{      [name: string]: string[];    }} extensions.childTokens
 * @property {TokenizerExtensionFunction[]} [extensions.inline]
 * @property {TokenizerExtensionFunction[]} [extensions.block]
 * @property {TokenizerStartFunction[]} [extensions.startInline]
 * @property {TokenizerStartFunction[]} [extensions.startBlock]
 * @property {null | ((token: Token) => void | Promise<void> | (void | Promise<void>)[])} [walkTokens] walkTokens function returns array of values for Promise.all
 */
