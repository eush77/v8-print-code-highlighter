'use strict';

var highlightSection = require('./src/highlight-section');

var codeDumpParser = require('v8-code-dump-parser'),
    normalizeCss = require('normalize-css/normalize'),
    trumpet = require('trumpet');

var fs = require('fs');


var writeStyles = function (out) {
  out.write(normalizeCss);

  fs.createReadStream(require.resolve('highlight.js/styles/solarized_dark.css'),
                      { encoding: 'utf8' })
    .pipe(out);
};


var writeBody = function (sections, out) {
  out.write(codeDumpParser.stringify(sections));
};


module.exports = function (sections) {
  sections.forEach(highlightSection);

  var out = trumpet();
  out.write('<style></style><pre class="hljs"></pre>');

  writeStyles(out.createWriteStream('style'));
  writeBody(sections, out.createWriteStream('pre'));

  return out;
};
