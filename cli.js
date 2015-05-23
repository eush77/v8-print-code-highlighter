#!/usr/bin/env node
'use strict';

var highlightSection = require('./src/highlight-section');

var codeDumpParser = require('v8-code-dump-parser'),
    helpVersion = require('help-version')(usage()),
    concat = require('parse-concat-stream');

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

    process.stdout.write(codeDumpParser.stringify(sections));
  }));
}(process.argv.slice(2)));
