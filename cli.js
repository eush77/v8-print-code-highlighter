#!/usr/bin/env node
'use strict';

var highlight = require('./'),
    listThemes = require('./src/list-themes.js');

var codeDumpParser = require('v8-code-dump-parser'),
    helpVersion = require('help-version')(usage()),
    concat = require('parse-concat-stream'),
    minimist = require('minimist'),
    camelCaseKeys = require('camelcase-keys');

var fs = require('fs');


function usage() {
  return '' +
    'Usage:  v8-print-code-highlighter [[--theme | -t] theme] [file]\n' +
    '        v8-print-code-highlighter --list-themes\n';
}


var options = camelCaseKeys(minimist(process.argv.slice(2), {
  boolean: ['list-themes'],
  alias: {
    't': 'theme'
  },
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

  if (options.listThemes) {
    return console.log(JSON.stringify(listThemes(), null, 2));
  }

  var input = options._.length ? fs.createReadStream(options._[0]) : process.stdin;

  input.pipe(concat({ parse: codeDumpParser }, function (err, sections) {
    if (err) throw err;
    highlight(sections, {
      theme: options.theme
    }).pipe(process.stdout);
  }));
}());
