'use strict';

var patchX86 = require('./patch-x86');

var hljs = patchX86(require('highlight.js'));


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
    var asmStart = code.instructions.indexOf('\n') + 1;
    var headerLine = code.instructions.slice(0, asmStart);
    var asm = code.instructions.slice(asmStart);

    asm = hljs.highlightAuto(asm, asmLanguages);

    code.instructions = [
      headerLine,
      '<code class="', asm.language, '">',
      asm.value,
      '</code>'
    ].join('');
  }

  return section;
};
