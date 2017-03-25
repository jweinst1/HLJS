/**
 * Created by Josh on 3/22/17.
 * Special class that keeps track of variable names and illegal variables
 * Uses static variables/ data
 */


export namespace Vars {

    export let usedVars = {};
    //regex to validate js variable names.
    export let varNameRegex = /^[$A-Z_][0-9A-Z_$]*$/i;

    //reserved javascript words
    export let reservedVars = {
        "for":true,
        "while":true,
        "function":true,
        "var":true,
        "in":true,
        "if":true,
        "else":true,
        "true":true,
        "false":true,
        "switch":true,
        "try":true,
        "void":true,
        "let":true,
        "delete":true,
        "return":true,
        "new":true,
        "throw":true,
        "catch":true,
        "finally":true
    };

    export let addVar = (name:string):void => {
        if(Vars.varNameRegex.test(name) && !(name in reservedVars))usedVars[name] = true;
        else throw new Error(`Invalid variable name ${name} was used.`);
    };

    export let clearVars = ():void => {
        usedVars = {};
    };

    export let hasVar = (name:string):boolean => {
        return name in usedVars;
    }
}
