/**
 * Created by Josh on 3/23/17.
 */


var cmp = require('../src/Main');
var vars = require('../src/Vars');

//tests the StdOut
var StdOutTest = function (n, code, expected) {
    try {
        var result = cmp.Compile(code, 0);
        if (result === expected){
            console.log("Test "+n+" PASSED");
        }
        else {
            console.log("Test "+n+" FAILED, Expected: "+expected+" but got: "+result);
        }
    } catch(err) {
        console.log("Test "+n+" FAILED, Error: " + err);
        //clears previous variables
    } finally {vars.Vars.clearVars()}
};

exports.StdOutTest = StdOutTest;