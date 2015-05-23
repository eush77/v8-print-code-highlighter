[![npm](https://nodei.co/npm/v8-print-code-highlighter.png)](https://nodei.co/npm/v8-print-code-highlighter/)

# v8-print-code-highlighter

[![Dependency Status][david-badge]][david]

Dual syntax highlighter for `--print-code` / `--print-opt-code` V8 dumps. Highlights source sections as JavaScript and code sections as ASM.

[david]: https://david-dm.org/eush77/v8-print-code-highlighter
[david-badge]: https://david-dm.org/eush77/v8-print-code-highlighter.png

## CLI

```
v8-print-code-highlighter [file]
```

Reads standard input by default, you can pass filename to make it read from file.

Spits out highlighted HTML. Use [bcat][bcat] or something similar to redirect the output to a browser tab.

[bcat]: http://rtomayko.github.io/bcat/

## TODO

- Add ANSI output format (for the terminal).

## Install

```
npm install -g v8-print-code-highlighter
```

## License

MIT
