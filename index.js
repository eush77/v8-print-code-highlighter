'use strict';

var highlightSection = require('./src/highlight-section');

var codeDumpParser = require('v8-code-dump-parser'),
    normalizeCss = require('normalize-css/normalize'),
    trumpet = require('trumpet');

var fs = require('fs'),
    path = require('path');


var writeStyles = function (theme, out) {
  out.write(normalizeCss);
  out.write('pre { margin: 0; }');

  var themeFile = require.resolve(path.join('highlight.js/styles', theme + '.css'));
  fs.createReadStream(themeFile, { encoding: 'utf8' })
    .pipe(out);
};


var writeBody = function (sections, out) {
  out.write(codeDumpParser.stringify(sections));
};


module.exports = function (sections, opts) {
  opts.theme = opts.theme || 'default';
  sections.forEach(highlightSection);

  var out = trumpet();
  out.write('<style></style><pre class="hljs"></pre>');

  writeStyles(opts.theme, out.createWriteStream('style'));
  writeBody(sections, out.createWriteStream('pre'));

  return out;
};
