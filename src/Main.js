/**
 * Created by Josh on 3/22/17.
 * Main file for HLML Compiler
 */

var prs = require("./parse/parser");
var lib = require("./Lib").Lib;


var Compile = function(code){
    var parsed = prs.parse(code);
    return lib.callLib(parsed);
};

exports.Compile = Compile;