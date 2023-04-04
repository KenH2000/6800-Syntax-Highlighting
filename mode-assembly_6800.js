ace.define("ace/mode/assembly_6800_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var Assembly6800HighlightRules = function() {

    this.$rules = { start: 
       [ { token: 'keyword.control.assembly',
                      regex: '\\b(?:lda|ldb|sta|stb|adda|addb|aba|adca|adcb|anda|andb|bita|bitb|clr|clra|clrb|cmpa|cmpb|cba|com|coma|comb|neg|nega|negb|daa|dec|deca|decb|eora|eorb|inc|inca|incb|ldaa|ldab|oraa|orab|psha|pshb|pula|pulb|rol|rola|rolb|ror|rora|rorb|asl|asla|aslb|asr|asra|asrb|lsr|lsra|lsrb|staa|stab|suba|subb|sba|sbca|sbcb|tab|tba|tst|tsta|tstb|cpx|dex|des|inx|ins|ldx|lds|stx|sts|txs|tsx|bra|bcc|bcs|beq|bge|bgt|bhi|ble|bls|blt|bmi|bne|bvc|bvs|bpl|bsr|jmp|jsr|nop|rti|rts|swi|wai|clc|cli|clv|sec|sei|sev|tap|tpa)\\b',
           caseInsensitive: true },
         { token: 'variable.parameter.register.assembly',
           //regex: '\\b(?:CS|DS|ES|FS|GS|SS|RAX|EAX|RBX|EBX|RCX|ECX|RDX|EDX|RCX|RIP|EIP|IP|RSP|ESP|SP|RSI|ESI|SI|RDI|EDI|DI|RFLAGS|EFLAGS|FLAGS|R8-15|(?:Y|X)MM(?:[0-9]|10|11|12|13|14|15)|(?:A|B|C|D)(?:X|H|L)|CR(?:[0-4]|DR(?:[0-7]|TR6|TR7|EFER)))\\b',
           regex: '\\b(?:d[bwdqtoy]|res[bwdqto]|equ|times|align|alignb|sectalign|section|ptr|byte|word|dword|qword|incbin|org|opt|bsz|fcb|fcc|fdb|fill|rmb|zmb)\\b',
           caseInsensitive: true },
         { token: 'constant.character.decimal.assembly',
           regex: '\\b[0-9]+\\b' },
         { token: 'constant.character.hexadecimal.assembly',
           regex: '\\b\\$[A-F0-9]+\\b',
           caseInsensitive: true },
         { token: 'constant.character.hexadecimal.assembly',
           regex: '\\b[A-F0-9]+h\\b',
           caseInsensitive: true }, 
          { token: 'support.function.directive.assembly',
           caseInsensitive: true },
         { token: 'string.assembly', regex: /'([^\\']|\\.)*'/ },
         { token: 'string.assembly', regex: /"([^\\"]|\\.)*"/ },
         { token: 'support.function.directive.assembly',
           regex: '^\\[',
           push: 
            [ { token: 'support.function.directive.assembly',
                regex: '\\]$',
                next: 'pop' },
              { defaultToken: 'support.function.directive.assembly' } ] },
/*
         { token: 
            [ 'support.function.directive.assembly',
              'support.function.directive.assembly',
              'entity.name.function.assembly' ],
           regex: '(^struc)( )([_a-zA-Z][_a-zA-Z0-9]*)' },
         { token: 'support.function.directive.assembly',
           regex: '^endstruc\\b' },
        { token: 
            [ 'support.function.directive.assembly',
              'entity.name.function.assembly',
              'support.function.directive.assembly',
              'constant.character.assembly' ],
           regex: '^(%macro )([_a-zA-Z][_a-zA-Z0-9]*)( )([0-9]+)' },
         { token: 'support.function.directive.assembly',
           regex: '^%endmacro' },
*/
         { token: 
            [ 'text',
              'support.function.directive.assembly',
              'text',
              'entity.name.function.assembly' ],
           regex: '(\\s*)(BRA|BCC|BCS|BEQ|BGE|BGT|BHI|BLE|BLS|BLT|BMI|BNE|BVC|BVS|BPL|BSR|JMP|JSR)\\b( ?)((?:[_a-zA-Z][_a-zA-Z0-9]*)?)',
           caseInsensitive: true },
          { token: 'support.function.directive.assembly',
           regex: '\\b(?:d[bwdqtoy]|res[bwdqto]|equ|byte|word|dword|qword|org|opt|bsz|fcb|fcc|fdb|fill|rmb|zmb)\\b',
           caseInsensitive: true },
         { token: 'entity.name.function.assembly', regex: '^\\s*%%[\\w.]+?:$' },
         { token: 'entity.name.function.assembly', regex: '^\\s*%\\$[\\w.]+?:$' },
         { token: 'entity.name.function.assembly', regex: '^[\\w.]+?:' },
         { token: 'entity.name.function.assembly', regex: '^[\\w.]+?\\b' },
         { token: 'comment.assembly', regex: ';.*$' },
         { token: 'comment.assembly', regex: '^\\*.*$' } ]
 
    };
    
    this.normalizeRules();
};

Assembly6800HighlightRules.metaData = { fileTypes: [ 'asm' ],
      name: 'Assembly 6800',
      scopeName: 'source.assembly' };


oop.inherits(Assembly6800HighlightRules, TextHighlightRules);

exports.Assembly6800HighlightRules = Assembly6800HighlightRules;
});

ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;
var Range = require("../../range").Range;

var FoldMode = exports.FoldMode = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1 || line[startLevel] != "#")
            return;

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) {
            line = session.getLine(row);
            var level = line.search(re);

            if (level == -1)
                continue;

            if (line[level] != "#")
                break;

            endRow = row;
        }

        if (endRow > startRow) {
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
        }
    };
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var indent = line.search(/\S/);
        var next = session.getLine(row + 1);
        var prev = session.getLine(row - 1);
        var prevIndent = prev.search(/\S/);
        var nextIndent = next.search(/\S/);

        if (indent == -1) {
            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
            return "";
        }
        if (prevIndent == -1) {
            if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") {
                session.foldWidgets[row - 1] = "";
                session.foldWidgets[row + 1] = "";
                return "start";
            }
        } else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") {
            if (session.getLine(row - 2).search(/\S/) == -1) {
                session.foldWidgets[row - 1] = "start";
                session.foldWidgets[row + 1] = "";
                return "";
            }
        }

        if (prevIndent!= -1 && prevIndent < indent)
            session.foldWidgets[row - 1] = "start";
        else
            session.foldWidgets[row - 1] = "";

        if (indent < nextIndent)
            return "start";
        else
            return "";
    };

}).call(FoldMode.prototype);

});

ace.define("ace/mode/assembly_6800",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/assembly_6800_highlight_rules","ace/mode/folding/coffee"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var Assembly6800HighlightRules = require("./assembly_6800_highlight_rules").Assembly6800HighlightRules;
var FoldMode = require("./folding/coffee").FoldMode;

var Mode = function() {
    this.HighlightRules = Assembly6800HighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = [";"];
    this.$id = "ace/mode/assembly_6800";
}).call(Mode.prototype);

exports.Mode = Mode;
});                (function() {
                    ace.require(["ace/mode/assembly_6800"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            
