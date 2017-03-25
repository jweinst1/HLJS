#HLJS

HLJS, which stands for Hyper Lisp JavaScript, is a lisp-dialect that acts a code-as-data language to write javascript in.
It allows you to write javascript the exact same way you normally would, except in lisp format.

##Installation

To install, run the following shell command:

`$ npm install -g hljs`

To transcompile a `.hljs` file, use the following command

`$ HLJS yourfilename.hljs`

Or, you can use it inside your javascript

```javascript
var hljs = require('hljs');
hljs.Compile('(= (var x) 4) (console.log x)');
```

##Guide

Here is a quick guide to the language and how it paralells to JavaScript.

###Variables and assignments

You can declare variables like this:

```
(var x)
(var a y z e)
```
and assign them like this

```
(= a (function () (return 3)))
(= (var d) 4)
```

###Operators

HLJS has all the javascript operators, like `+`, or `-`, etc.

```
(+ 3 4 5)
(- 3 (+ 4 5) (* 3 2 1))
(% 3 4 5 6)
```

HLJS also has all the logical operators and conditionals of javascript

```
(=== 7 true)

```

