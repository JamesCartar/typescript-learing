var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log("Hello World");
/*
function identity<Type>(arg: Type): Type {
    return arg;
}
let myIdentity: <Type>(arg: Type) => Type = identity;

function identity<Type>(arg: Type): Type {
    return arg;
}

let myIdentity: { <Type>(arg: Type): Type} = identity;

function identity<Type>(arg: Type): Type {
    return arg;
}

interface GenericIdentityFn {
    <Type>(arg: Type): Type;
}

let myIdentity: GenericIdentityFn = identity;

function identity<Type>(arg: Type): Type {
    return arg;
}

interface GenericIdentityFn<Type> {
    (arg: Type): Type;
}

let myIdentity: GenericIdentityFn<number> = identity;

*/
var MyGenericNum = /** @class */ (function () {
    function MyGenericNum() {
    }
    return MyGenericNum;
}());
var myGenericNumber = new MyGenericNum();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
var myGenericString = new MyGenericNum();
myGenericString.zeroValue = "";
myGenericString.add = function (x, y) {
    return x + y;
};
var GenericContainer = /** @class */ (function () {
    function GenericContainer(initialValue) {
        this.value = initialValue;
    }
    GenericContainer.prototype.getValue = function () {
        return this.value;
    };
    return GenericContainer;
}());
var alice = new GenericContainer({ name: "alice", age: 20 });
alice.getValue();
function getProperty(obj, key) {
    return obj[key];
}
var obj = { a: 1, b: 2, c: 3, d: 4 };
getProperty(obj, "a");
getProperty(obj, "m");
// Using class types in generic
function create(c) {
    return new c();
}
var myClass = /** @class */ (function () {
    function myClass() {
        this.property = "hello";
    }
    return myClass;
}());
var instance = create(myClass);
console.log(instance.property);
var Bee1 = /** @class */ (function () {
    function Bee1() {
    }
    Bee1.prototype.buzz = function () {
        return "Buzz!";
    };
    return Bee1;
}());
var Lion1 = /** @class */ (function () {
    function Lion1() {
    }
    Lion1.prototype.roar = function () {
        return "Roar!";
    };
    return Lion1;
}());
var beeInstance1 = create(Bee1);
beeInstance1.buzz();
var lionInstance1 = create(Lion1);
lionInstance1.roar();
var Animal1 = /** @class */ (function () {
    function Animal1() {
        this.numLegs = 4;
    }
    return Animal1;
}());
var Bee2 = /** @class */ (function (_super) {
    __extends(Bee2, _super);
    function Bee2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bee2.prototype.buzz = function () {
        return "Buzz!";
    };
    return Bee2;
}(Animal1));
var Lion2 = /** @class */ (function (_super) {
    __extends(Lion2, _super);
    function Lion2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lion2.prototype.roar = function () {
        return "Roar!";
    };
    return Lion2;
}(Animal1));
function createInstance1(c) {
    return new c();
}
var beeInstance = createInstance1(Bee2);
console.log(beeInstance.numLegs);
console.log(beeInstance.buzz());
var lion = createInstance1(Lion2);
console.log(lion.numLegs);
console.log(lion.roar());
var BeeKeeper = /** @class */ (function () {
    function BeeKeeper() {
        this.hasMask = true;
    }
    return BeeKeeper;
}());
var ZooKeeper = /** @class */ (function () {
    function ZooKeeper() {
        this.nameTag = "Krishna";
    }
    return ZooKeeper;
}());
var Animal = /** @class */ (function () {
    function Animal() {
        this.numLegs = 4;
    }
    return Animal;
}());
var Bee = /** @class */ (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.beekeeper = new BeeKeeper();
        return _this;
    }
    return Bee;
}(Animal));
var Lion = /** @class */ (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zookeeper = new ZooKeeper();
        return _this;
    }
    return Lion;
}(Animal));
function createInstance(c) {
    return new c();
}
var myBee = createInstance(Bee);
console.log(myBee.beekeeper.hasMask);
console.log(myBee.numLegs);
var myLion = createInstance(Lion);
console.log(myLion.numLegs);
console.log(myLion.zookeeper.nameTag);
var div = create();
var p = create(new HTMLParagraphElement());
// Generic Parameter Default Rules
// 1. A type parameter is deemed optional if it has a default
function example(value) {
    return value !== null && value !== void 0 ? value : "default";
}
example();
example(42);
example();
// 2. Required type parameters must not follow optional type parameters.
function valid(first, second) {
    return [first !== null && first !== void 0 ? first : "default", second !== null && second !== void 0 ? second : 42];
}
valid();
valid(true, "hello");
// 3. Default type for the type parameter must satisfy the constraint for the type parameter, if it exists.
function constrained(element) {
    return element !== null && element !== void 0 ? element : new HTMLDivElement();
}
constrained();
constrained(new HTMLParagraphElement());
// 4. When specifying type arguments, you are only required to specify type arguments for the required type parameters. Unspecified type parameters will resolve to their default types.
function example1(first, second) {
    return [first !== null && first !== void 0 ? first : "default", second !== null && second !== void 0 ? second : 42];
}
example1();
example1();
example1(true, "hello");
// 5. If a default type is specified and inference cannot choose a candidate, the default type is inferred.
function infer(value) {
    return value !== null && value !== void 0 ? value : "default";
}
var result = infer();
var explicit = infer(42);
var stringBox = { value: "hello" };
var numberBox = { value: 42 };
var oldContainer = { items: [1, 2, 3], metadata: "info" };
var newContainer = {
    items: [1, 2, 3],
    metadata: true
};
// Index Access Types
var myArray = [
    { name: "alice", age: 20 },
    { name: "jake", age: 23 },
    { name: "ross", age: 32 }
];
var conforms = {
    del: true,
    rodney: true
};
// string unions in Types
var God = {
    firstName: "Krishna",
    lastName: "Wasudev",
    age: 0
};
var UpdatedGod = makeWatchedObject(God);
UpdatedGod.on("ageChanged", function (hello) { return console.log("Hello", hello); });
