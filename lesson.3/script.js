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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
var hein = 1;
var htet = 2;
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
function f(x) {
    if (x === void 0) { x = 10; }
    console.log(x.toFixed(2));
}
function myForEach(arr, callback) {
    for (var i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}
function makeDate(mOrTimestamp, d, y) {
    if (d != undefined && y != undefined) {
        return new Date(y, mOrTimestamp, d);
    }
    else {
        return new Date(mOrTimestamp);
    }
}
var d1 = makeDate(123456);
var d2 = makeDate(5, 6, 2004);
function len(x) {
    return x.length;
}
len("");
len([1, 2, 3]);
// len(Math.random() < 0.5 ? "hello" : [0]);
function len1(x) {
    return x.length;
}
// Declaring this in function
var user = {
    id: 123,
    admin: false,
    becomeAdmin: function () {
        this.admin = true;
    }
};
var db = getDB();
var filteredUsers = db.filterUsers(function () {
    return this.id > 10;
});
function multiply(n) {
    var m = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        m[_i - 1] = arguments[_i];
    }
    return m.map(function (x) { return n * x; });
}
var a1 = multiply(10, 1, 2, 3, 4, 5);
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (a, b) { return a + b; }, 0);
}
function concat() {
    var strings = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        strings[_i] = arguments[_i];
    }
    return strings.join(", ");
}
function makeTuple(first) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return __spreadArray([first], rest, true);
}
console.log(sum(1, 2, 3, 4, 5));
console.log(concat("a", "b", "c"));
console.log(makeTuple("abc", 12, true));
// Rest Arguments
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
arr1.push.apply(arr1, arr2);
var args = [8, 5];
var angle = Math.atan2.apply(Math, args);
var f1 = function () {
    return true;
};
var f2 = function () { return true; };
var f3 = function () {
    return true;
};
var v1 = f1();
var v2 = f2();
var v3 = f3();
