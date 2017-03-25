var test = require("./Methods");

test.StdOutTest(0, "(+ 2 2)", "2+2");
test.StdOutTest(1, "(if (< 3 5)\n(+ 3 4 5) (- 3 4 5 6))", "if(3<5){3+4+5\n3-4-5-6}");
test.StdOutTest(2, "(else (if (< 3 5)\n(+ 3 4 5) (- 3 4 5 6)))", "else{if(3<5){3+4+5\n3-4-5-6}}");
test.StdOutTest(3, "(console.log 2 2)", "console.log(2, 2)");
test.StdOutTest(4, "(new (Array 4 5 6))", "new Array(4, 5, 6)");
test.StdOutTest(5, "(= " +
    "(var f) " +
    "(function (a b c) " +
    "(console.log a b)))", "var f=function(a,b,c){console.log(a, b)}");
test.StdOutTest(6, "(for (var (in f h)) (Math.random 3 4 5))", "for(var f in h){Math.random(3, 4, 5)}");