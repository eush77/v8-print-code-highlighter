#!/usr/bin/env node
'use strict';

var highlight = require('./');

var codeDumpParser = require('v8-code-dump-parser'),
    helpVersion = require('help-version')(usage()),
    concat = require('parse-concat-stream'),
    minimist = require('minimist'),
    camelCaseKeys = require('camelcase-keys');

var fs = require('fs');


function usage() {
  return 'Usage:  v8-print-code-highlighter [file]';
}


var options = camelCaseKeys(minimist(process.argv.slice(2), {
  unknown: function (option) {
    if (option[0] == '-') {
      console.error('Unknown option: ' + option);
      console.error();
      helpVersion.help(1);
    }
  }
}));


(function main() {
  if (options._.length > 1) {
    helpVersion.help(1);
  }

  var input = options._.length ? fs.createReadStream(options._[0]) : process.stdin;

  input.pipe(concat({ parse: codeDumpParser }, function (err, sections) {
    if (err) throw err;
    highlight(sections).pipe(process.stdout);
  }));
}());
