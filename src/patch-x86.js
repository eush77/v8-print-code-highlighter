'use strict';

var flatmap = require('flatmap');


// V8 dumps are mainly written in Intel syntax, but not in all regards.
// This call adds some AT&T-ies used by V8 disassembler, namely instruction
// suffixes. This isn't a destructive thing to warrant a special flag or
// whatnot, but it blows keywords list by a factor of 5.


module.exports = function (hljs) {
  var x86asm = hljs.getLanguage('x86asm');
  var keywords = x86asm.keywords.keyword.split(' ');
  keywords = flatmap(keywords, function (keyword) {
    return ['', 'b', 'w', 'l', 'q'].map(function (suffix) {
      return keyword + suffix;
    });
  });
  x86asm.keywords.keyword = keywords.join(' ');
  return hljs;
};
