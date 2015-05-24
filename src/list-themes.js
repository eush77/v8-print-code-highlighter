'use strict';

var fs = require('fs'),
    path = require('path');


module.exports = function () {
  var stylesDir = path.dirname(require.resolve('highlight.js/styles/default.css'));
  return fs.readdirSync(stylesDir)
    .map(function (filename) {
      var obj = path.parse(filename);
      return obj.ext == '.css' && obj.name;
    })
    .filter(Boolean);
};
