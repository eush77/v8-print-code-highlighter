'use strict';

var hljs = require('highlight.js');


var asmLanguages = ['armasm', 'avrasm', 'x86asm'];


module.exports = function (section) {
  if (section.source) {
    section.source = [
      '<code class="javascript">',
      hljs.highlight('javascript', section.source).value,
      '</code>'
    ].join('');
  }

  var code;
  if (code = section.code || section.optimizedCode) {
    var asm = hljs.highlightAuto(code.instructions, asmLanguages);
    code.instructions = [
      '<code class="', asm.language, '">',
      asm.value,
      '</code>'
    ].join('');
  }

  return section;
};
