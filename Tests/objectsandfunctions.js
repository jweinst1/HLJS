/**
 * Created by Josh on 3/24/17.
 */
var test = require("./Methods");

test.StdOutTest(0, '(function ()' +
    '(return ' +
         '(function () (return 3)' +
    ')' +
    ')' +
    ')', 'function(){return function(){return 3}}');
test.StdOutTest(1, '({} (: foo (function (a b c) (return (+ a b c a b c a b c c c c)))))', '{foo:function(a,b,c){return a+b+c+a+b+c+a+b+c+c+c+c}}');
test.StdOutTest(2, '(. ([] 1 2 3) length)', '[1,2,3].length');
test.StdOutTest(3, '(= (var a) ([] 1 2 3)) (a.slice 1 2 3)', 'var a=[1,2,3]\na.slice(1,2,3)');
