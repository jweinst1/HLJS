/**
 * Created by Josh on 3/22/17.
 * Special class that keeps track of variable names and illegal variables
 * Uses static variables/ data
 */
"use strict";
var Vars;
(function (Vars) {
    Vars.usedVars = {};
    //regex to validate js variable names.
    Vars.varNameRegex = /^[$A-Z_][0-9A-Z_$]*$/i;
    //reserved javascript words
    Vars.reservedVars = {
        "for": true,
        "while": true,
        "function": true,
        "var": true,
        "in": true,
        "if": true,
        "else": true,
        "true": true,
        "false": true,
        "switch": true,
        "try": true,
        "void": true,
        "let": true,
        "delete": true,
        "return": true,
        "new": true,
        "throw": true,
        "catch": true,
        "finally": true
    };
    Vars.addVar = function (name) {
        if (Vars.varNameRegex.test(name) && !(name in Vars.reservedVars))
            Vars.usedVars[name] = true;
        else
            throw new Error("Invalid variable name " + name + " was used.");
    };
    Vars.clearVars = function () {
        Vars.usedVars = {};
    };
    Vars.hasVar = function (name) {
        return name in Vars.usedVars;
    };
})(Vars = exports.Vars || (exports.Vars = {}));
//# sourceMappingURL=Vars.js.map