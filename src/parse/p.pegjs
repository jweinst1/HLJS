//Lisp Parser for HLML

Program
  = s:Statement* {return {node:",document", args:s};}


Statement
  = "(" n:Name _ v:Value* _ ")" _ {return {node:n, args:v};}
  / "()" {return {node:"", args:[]}}


Value
  = _ s:Statement {return s;}
  / _ s:String {return s;}
  / _ n:Name {return n;}
  / _ i:Number {return i;}


Name
  = n:[a-zA-Z0-9=@$_+*/%#!?<\[\]\{\}>.&:|^~-]+ {return n.join("");}


String
  = '"' s:[^"]* '"' { return '"' + s.join("") + '"';}

Number
  = n:[0-9]+ { return n.join(""); }


_ "whitespace"
  = [ \t\n\r]*