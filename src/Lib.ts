/**
 * Created by Josh on 3/22/17.
 * File that contains the library where lisp tags are looked up,
 * and a function is retrieved to transcompile them
 */
import{Vars} from "./Vars";
import {LispElement} from "./Elem";

export namespace Lib {

    //elem represents one lisp body (name arg1 arg2)
    export let callLib = (elem:LispElement) => {
        var i = 0;
        if(elem.node === 'function'){
            elem.args[0].args.unshift(elem.args[0].node);
            elem.args[0].node = ',params';
            i++;
        }
        for(;i<elem.args.length;i++){
            if(typeof elem.args[i] === 'object') elem.args[i] = (callLib(elem.args[i]));
        }
        if(elem.node in lib){
            return lib[elem.node](elem);
        }
        else {
            return `${elem.node}(${elem.args.join(",")})`;
        }
    };

    export let lib = {
        //handles indexing g[4] or 4[]
        ".":(elem:LispElement) => {
            let index = elem.args[1];
            if(!isNaN(index) || /".*?"/.test(index)){
                return `${elem.args[0]}[${index}]`;
            }
            else {
                return `${elem.args[0]}.${index}`;
            }
        },
        ",document":(elem:LispElement) => {
            return elem.args.join("\n");
        },
        "++":(elem:LispElement) => {
            return `${elem.args[0]}++`;
        },
        "--":(elem:LispElement) => {
            return `${elem.args[0]}--`;
        },
        "+":(elem:LispElement) => {
            return elem.args.join("+");
        },
        "-":(elem:LispElement) => {
            return elem.args.join("-");
        },
        "*":(elem:LispElement) => {
            return elem.args.join("*");
        },
        "/":(elem:LispElement) => {
            return elem.args.join("/");
        },
        "%":(elem:LispElement) => {
            return elem.args.join("%");
        },
        //bitwise
        "^":(elem:LispElement) => {
            return elem.args.join("^");
        },
        "|":(elem:LispElement) => {
            return elem.args.join("|");
        },
        "&":(elem:LispElement) => {
            return elem.args.join("&");
        },
        //logical
        "===":(elem:LispElement) => {
            return elem.args.join("===");
        },
        "==":(elem:LispElement) => {
            return elem.args.join("==");
        },
        "!==":(elem:LispElement) => {
            return elem.args.join("!==");
        },
        "!=":(elem:LispElement) => {
            return elem.args.join("!=");
        },
        "<":(elem:LispElement) => {
            return elem.args.join("<");
        },
        ">":(elem:LispElement) => {
            return elem.args.join(">");
        },
        "<=":(elem:LispElement) => {
            return elem.args.join("<=");
        },
        ">=":(elem:LispElement) => {
            return elem.args.join(">=");
        },
        //logical not operator
        "!":(elem:LispElement) => {
            return `!(${elem.args[0]})`;
        },
        //and or
        "&&":(elem:LispElement) => {
            return elem.args.join("&&");
        },
        "||":(elem:LispElement) => {
            return elem.args.join("||");
        },
        //conditionals
        "if":(elem:LispElement) => {
            return `if(${elem.args[0]}){${elem.args.slice(1).join("\n")}}`;
        },
        "else":(elem:LispElement) => {
            return `else{${elem.args.join("\n")}}`;
        },
        "break":(elem:LispElement) => {
            return `break`;
        },
        "continue":(elem:LispElement) => {
            return `continue`;
        },
        "while":(elem:LispElement) => {
            return `while(${elem.args[0]}){${elem.args.slice(1).join("\n")}}`;
        },
        "new":(elem:LispElement) => {
            return `new ${elem.args[0]}`;
        },
        //variables and assignments
        "var":(elem:LispElement) => {
            return `var ${elem.args.join(",")}`;
        },
        "=":(elem:LispElement) => {
            return `${elem.args[0]}=${elem.args[1]}`;
        },
        "function":(elem:LispElement) => {
            let params = elem.args[0].args;
            for(let j=0;j<params.length;j++){
                if(typeof params[j] !== 'string') throw new Error(`Element found inside function definition`);
            }
            return `function(${params.join(",")}){${elem.args.slice(1).join("\n")}}`;
        },
        "in":(elem:LispElement) => {
            return `${elem.args[0]} in ${elem.args[1]}`;
        },
        //handles for loops
        "for":(elem:LispElement) => {
            if(/^var \w+ in [^ ]+$/.test(elem.args[0])){
                return `for(${elem.args[0]}){${elem.args.slice(1).join("\n")}}`;
            }
            else {
               return `for(${elem.args[0]};${elem.args[1]};${elem.args[2]}){${elem.args.slice(3).join("\n")}}`
            }
        },
        //error handling
        "try":(elem:LispElement) => {
            return `try{${elem.args.join("\n")}}`;
        },
        "catch":(elem:LispElement) => {
            return `catch(${elem.args[0]}){${elem.args.slice(1).join("\n")}}`;
        },
        "finally":(elem:LispElement) => {
            return `finally{${elem.args.join("\n")}}`;
        },
        //comments
        "//":(elem:LispElement) => {
            return `//${elem.args.join(" ")}`;
        },
        //switches
        "case":(elem:LispElement) => {
            return `case ${elem.args[0]}:${elem.args.slice(1).join("\n")}`;
        },
        "switch":(elem:LispElement) => {
            return `switch(${elem.args[0]}){${elem.args.slice(1).join("\n")}}`;
        },
        "return":(elem:LispElement) => {
            return `return ${elem.args[0]}`;
        },
        //objects
        "{}":(elem:LispElement) => {
            return `{${elem.args.join(",")}}`;
        },
        ":":(elem:LispElement) => {
            return `${elem.args[0]}:${elem.args[1]}`;
        },
        //arrays
        "[]":(elem:LispElement) => {
            return `[${elem.args.join(",")}]`;
        }
    };
}
