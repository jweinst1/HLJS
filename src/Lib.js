"use strict";
var Lib;
(function (Lib) {
    //elem represents one lisp body (name arg1 arg2)
    Lib.callLib = function (elem) {
        var i = 0;
        if (elem.node === 'function') {
            elem.args[0].args.unshift(elem.args[0].node);
            elem.args[0].node = ',params';
            i++;
        }
        for (; i < elem.args.length; i++) {
            if (typeof elem.args[i] === 'object')
                elem.args[i] = (Lib.callLib(elem.args[i]));
        }
        if (elem.node in Lib.lib) {
            return Lib.lib[elem.node](elem);
        }
        else {
            return elem.node + "(" + elem.args.join(",") + ")";
        }
    };
    Lib.lib = {
        //handles indexing g[4] or 4[]
        ".": function (elem) {
            var index = elem.args[1];
            if (!isNaN(index) || /".*?"/.test(index)) {
                return elem.args[0] + "[" + index + "]";
            }
            else {
                return elem.args[0] + "." + index;
            }
        },
        ",document": function (elem) {
            return elem.args.join("\n");
        },
        "++": function (elem) {
            return elem.args[0] + "++";
        },
        "--": function (elem) {
            return elem.args[0] + "--";
        },
        "+": function (elem) {
            return elem.args.join("+");
        },
        "-": function (elem) {
            return elem.args.join("-");
        },
        "*": function (elem) {
            return elem.args.join("*");
        },
        "/": function (elem) {
            return elem.args.join("/");
        },
        "%": function (elem) {
            return elem.args.join("%");
        },
        //bitwise
        "^": function (elem) {
            return elem.args.join("^");
        },
        "|": function (elem) {
            return elem.args.join("|");
        },
        "&": function (elem) {
            return elem.args.join("&");
        },
        //logical
        "===": function (elem) {
            return elem.args.join("===");
        },
        "==": function (elem) {
            return elem.args.join("==");
        },
        "!==": function (elem) {
            return elem.args.join("!==");
        },
        "!=": function (elem) {
            return elem.args.join("!=");
        },
        "<": function (elem) {
            return elem.args.join("<");
        },
        ">": function (elem) {
            return elem.args.join(">");
        },
        "<=": function (elem) {
            return elem.args.join("<=");
        },
        ">=": function (elem) {
            return elem.args.join(">=");
        },
        //logical not operator
        "!": function (elem) {
            return "!(" + elem.args[0] + ")";
        },
        //and or
        "&&": function (elem) {
            return elem.args.join("&&");
        },
        "||": function (elem) {
            return elem.args.join("||");
        },
        //conditionals
        "if": function (elem) {
            return "if(" + elem.args[0] + "){" + elem.args.slice(1).join("\n") + "}";
        },
        "else": function (elem) {
            return "else{" + elem.args.join("\n") + "}";
        },
        "break": function (elem) {
            return "break";
        },
        "continue": function (elem) {
            return "continue";
        },
        "while": function (elem) {
            return "while(" + elem.args[0] + "){" + elem.args.slice(1).join("\n") + "}";
        },
        "new": function (elem) {
            return "new " + elem.args[0];
        },
        //variables and assignments
        "var": function (elem) {
            return "var " + elem.args.join(",");
        },
        "=": function (elem) {
            return elem.args[0] + "=" + elem.args[1];
        },
        "function": function (elem) {
            var params = elem.args[0].args;
            for (var j = 0; j < params.length; j++) {
                if (typeof params[j] !== 'string')
                    throw new Error("Element found inside function definition");
            }
            return "function(" + params.join(",") + "){" + elem.args.slice(1).join("\n") + "}";
        },
        "in": function (elem) {
            return elem.args[0] + " in " + elem.args[1];
        },
        //handles for loops
        "for": function (elem) {
            if (/^var \w+ in [^ ]+$/.test(elem.args[0])) {
                return "for(" + elem.args[0] + "){" + elem.args.slice(1).join("\n") + "}";
            }
            else {
                return "for(" + elem.args[0] + ";" + elem.args[1] + ";" + elem.args[2] + "){" + elem.args.slice(3).join("\n") + "}";
            }
        },
        //error handling
        "try": function (elem) {
            return "try{" + elem.args.join("\n") + "}";
        },
        "catch": function (elem) {
            return "catch(" + elem.args[0] + "){" + elem.args.slice(1).join("\n") + "}";
        },
        "finally": function (elem) {
            return "finally{" + elem.args.join("\n") + "}";
        },
        //comments
        "//": function (elem) {
            return "//" + elem.args.join(" ");
        },
        //switches
        "case": function (elem) {
            return "case " + elem.args[0] + ":" + elem.args.slice(1).join("\n");
        },
        "switch": function (elem) {
            return "switch(" + elem.args[0] + "){" + elem.args.slice(1).join("\n") + "}";
        },
        "return": function (elem) {
            return "return " + elem.args[0];
        },
        //objects
        "{}": function (elem) {
            return "{" + elem.args.join(",") + "}";
        },
        ":": function (elem) {
            return elem.args[0] + ":" + elem.args[1];
        },
        //arrays
        "[]": function (elem) {
            return "[" + elem.args.join(",") + "]";
        }
    };
})(Lib = exports.Lib || (exports.Lib = {}));
//# sourceMappingURL=Lib.js.map