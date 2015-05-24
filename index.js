'use strict';

var highlightSection = require('./src/highlight-section');

var codeDumpParser = require('v8-code-dump-parser'),
    normalizeCss = require('normalize-css/normalize');

var fs = require('fs');


module.exports = function (sections) {
  sections.forEach(highlightSection);

  return [
    '<style>',
    normalizeCss,
    fs.readFileSync(require.resolve('highlight.js/styles/solarized_dark.css'),
                    { encoding: 'utf8' }),
    '</style>',
    '<pre class="hljs">',
    codeDumpParser.stringify(sections),
    '</pre>'
  ].join('');
};
