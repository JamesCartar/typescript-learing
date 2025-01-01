var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function greeter(fn) {
    fn("Hello, World");
}
function printToConsole(s) {
    console.log(s);
}
greeter(printToConsole);
function doSomething(fn) {
    console.log(fn.description + "returned " + fn(6));
}
function myFunc(someArg) {
    return someArg > 3;
}
myFunc.description = "default description";
doSomething(myFunc);
function fn(ctor) {
    console.log(ctor(10));
    console.log(new ctor("10"));
}
// function firstElement(arr: any[]) {
// 	return arr[0];
// }
function firstElement(arr) {
    return arr[0];
}
var s = firstElement(["a", "b", "c", "d"]);
var n = firstElement([1, 2, 3, 4]);
var d = firstElement([]);
function map(arr, func) {
    return arr.map(func);
}
console.log(map(["1", "2", "3", "4"], function (n) { return parseInt(n); }));
function longest(a, b) {
    if (a.length > b.length) {
        return a;
    }
    else {
        return b;
    }
}
console.log(longest(["1", "2", "3"], ["1", "2"]));
console.log(longest("hein", "htets"));
// console.log(longest(10, 20004));
function minimumLength(obj, minimum) {
    if (obj.length > minimum) {
        return obj;
    }
    else {
        return __assign(__assign({}, obj), { length: minimum });
    }
}
function combine(arr1, arr2) {
    return arr1.concat(arr2);
}
console.log(combine([1, 2, 3, 4], [5, 6, 7, 8]));
console.log(combine(["1", "2", "3"], [5, 6, 7, 8]));
function firstElement1(arr) {
    return arr[0];
}
function firstElement2(arr) {
    return arr[0];
}
var a = firstElement1([1, 2, 3, 4, 5]);
var b = firstElement2([1, 2, 3, 4, 5]);
function filter1(arr, func) {
    return arr.filter(func);
}
function filter2(arr, func) {
    return arr.filter(func);
}
