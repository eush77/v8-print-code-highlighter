#!/usr/bin/env node
'use strict';

var highlightSection = require('./src/highlight-section');

var codeDumpParser = require('v8-code-dump-parser'),
    helpVersion = require('help-version')(usage()),
    concat = require('parse-concat-stream'),
    normalizeCss = require('normalize-css/normalize');

var fs = require('fs');


function usage() {
  return 'Usage:  v8-print-code-highlighter [file]';
}


(function main(argv) {
  if (argv.length > 1) {
    helpVersion.help(1);
  }

  var input = argv.length ? fs.createReadStream(argv[0]) : process.stdin;

  input.pipe(concat({ parse: codeDumpParser }, function (err, sections) {
    if (err) throw err;

    sections.forEach(highlightSection);

    process.stdout.write([
      '<style>',
      normalizeCss,
      fs.readFileSync(require.resolve('highlight.js/styles/solarized_dark.css'),
                      { encoding: 'utf8' }),
      '</style>',
      '<pre class="hljs">',
      codeDumpParser.stringify(sections),
      '</pre>'
    ].join(''));
  }));
}(process.argv.slice(2)));
