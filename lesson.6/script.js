// // Classes
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
// class Point {
// 	x!: number;
// 	y!: number;
// }
// const pt = new Point();
// console.log(`${pt.x}, ${pt.y}`);
// class GoodGreeter {
// 	name: string;
// 	constructor() {
// 		this.name = "hello";
// 	}
// }
// class OKGreeter {
// 	name!: string;
// }
// class Greeter {
// 	readonly name: string = "World";
// 	constructor(otherName?: string) {
// 		if (otherName != undefined) {
// 			this.name = otherName;
// 		}
// 	}
// 	err() {
// 		this.name = "error";
// 	}
// }
// const g = new Greeter();
// g.name = "hello";
// class Point1 {
// 	x: number;
// 	y: number;
// 	constructor(x: number, y: number);
// 	constructor(xy: string);
// 	constructor(x: string | number, y: number = 0) {}
// }
// const p = new Point1(1, 2);
// p.x;
// p.y;
// class Base {
// 	k = 4;
// }
// class Derived extends Base {
// 	constructor() {
// 		console.log(this.k);
// 	}
// }
// // Methods
// class Point2 {
// 	x = 10;
// 	y = 20;
// 	scale(n: number): void {
// 		this.x *= n;
// 		this.y *= n;
// 	}
// }
// class C {
// 	_length = 0;
// 	get length() {
// 		return this._length;
// 	}
// 	set length(value) {
// 		this._length = value;
// 	}
// }
// class Thing {
// 	_size = 0;
// 	get size(): number {
// 		return this._size;
// 	}
// 	set size(value: string | number | boolean) {
// 		let num = Number(value);
// 		if (!Number.isFinite(num)) {
// 			this._size = 0;
// 			return;
// 		}
// 		this._size = num;
// 	}
// }
// class MyClass {
// 	[s: string]: boolean | ((s: string) => boolean);
// 	check(s: string) {
// 		return this[s] as boolean;
// 	}
// }
// interface Pingable {
// 	ping(): void;
// }
// class Sonar implements Pingable {
// 	ping() {
// 		console.log("ping!");
// 	}
// }
// class Ball implements Pingable {
// 	pong() {
// 		console.log("pong!");
// 	}
// }
// interface Checkable {
// 	check(name: string): boolean;
// }
// class NameChecker implements Checkable {
// 	check(s) {
// 		return s.toLowerCase() === "ok";
// 	}
// }
// interface A {
// 	x: number;
// 	y?: number;
// }
// class C1 implements A {
// 	x = 0;
// }
// const c = new C1();
// c.y = 10;
// c.x = 50;
// class Animal {
// 	move() {
// 		console.log("Moving along!");
// 	}
// }
// class Dog extends Animal {
// 	woff(times: number) {
// 		for (let i = 0; i < times; i++) {
// 			console.log("woff!");
// 		}
// 	}
// }
// const d = new Dog();
// d.move();
// d.woff(5);
// class Base1 {
// 	greet() {
// 		console.log("Hello, World!");
// 	}
// }
// class Derived1 extends Base1 {
// 	greet(name?: string) {
// 		if (name === undefined) {
// 			super.greet();
// 		} else {
// 			console.log(`Hello, ${name}`);
// 		}
// 	}
// }
// const d1 = new Derived1();
// d1.greet();
// d1.greet("Hein Htet");
// const b2: Base1 = d1;
// b2.greet();
// class Base3 {
// 	greet() {
// 		console.log("Hello, world");
// 	}
// }
// class Derived3 extends Base3 {
// 	greet(name: string) {
// 		console.log(`Hello, ${name.toUpperCase()}`);
// 	}
// }
// const b4: Base3 = new Derived3();
// b4.greet();
// Type-only Field Declarations
// interface Animal {
// 	dateOfBirth: any;
// 	helloWorld: number;
// }
// interface Dog extends Animal {
// 	breed: any;
// }
// class AnimalHouse {
// 	resident: Animal;
// 	constructor(animal: Animal) {
// 		this.resident = animal;
// 	}
// }
// class DogHouse extends AnimalHouse {
// 	declare resident: Dog;
// 	constructor(dog: Dog) {
// 		super(dog);
// 	}
// }
// const newDogHouse = new DogHouse({
// 	breed: "hello",
// 	dateOfBirth: "world",
// 	helloWorld: 123
// });
// newDogHouse.resident.breed;
// class Base5 {
// 	name = "base";
// 	constructor() {
// 		console.log("My name is " + this.name);
// 	}
// }
// class Derived extends Base5 {
// 	name = "derived";
// }
// const d = new Derived();
// d.name;
// class Greeter {
// 	public greet() {
// 		console.log("Hello World");
// 	}
// }
// const abc = new Greeter();
// abc.greet();
// class Greeter1 {
// 	protected m = "krishna";
// 	public greet() {
// 		console.log("Hello, world");
// 	}
// 	protected getName() {
// 		return "hi";
// 	}
// }
// const def = new Greeter1();
// def.greet();
// def.getName();
// def.m;
// class SpecialGreeter extends Greeter1 {
// 	public howdy() {
// 		return `hello, ${this.getName()}`;
// 	}
// 	m = "1234";
// }
// class Base {
// 	protected x: number = 3;
// }
// class Derived1 extends Base {
// 	protected x: number = 5;
// }
// class Derived2 extends Base {
// 	f1(other: Derived2) {
// 		other.x;
// 	}
// 	f2(other: Derived1) {
// 		other.x;
// 	}
// }
// class Base {
// 	private b = 123;
// }
// const abc = new Base();
// abc.b;
// abc["b"];
// class Derived extends Base {
// 	private b = 123;
// }
// class A {
// 	private x = 10;
// 	public sameAs(other: A) {
// 		return this.x === other.x;
// 	}
// }
// class Dog {
// 	#barkAmount = 0;
// 	personality = "happy";
// 	constructor() {}
// }
// // Static Members
// class MyClass {
// 	static x = 0;
// 	static printX() {
// 		console.log(MyClass.x);
// 	}
// }
// console.log(MyClass.x);
// MyClass.printX();
// class MyClass {
// 	private static x = 5;
// }
// console.log(MyClass.x);
// class Base {
// 	static getGreeting() {
// 		return "Hello, World!";
// 	}
// }
// class Derived extends Base {
// 	myGreeting = Derived.getGreeting();
// }
// Generic Classes
// class Box<Type> {
// 	contents: Type;
// 	static defaultValue: Type;
// 	constructor(value: Type) {
// 		this.contents = value;
// 	}
// }
// const b = new Box("Hello");
// b.contents;
// class MyClass {
// 	name = "MyClass";
// 	getName() {
// 		return this.name;
// 	}
// }
// const c = new MyClass();
// c.getName();
// const obj = {
// 	name: "MyObj",
// 	getName: c.getName
// };
// obj.getName();
// class MyClass {
// 	name = "Krishna";
// 	getName = () => {
// 		return this.name;
// 	};
// }
// const c = new MyClass();
// const g = c.getName;
// g();
// class MyClass {
// 	name = "Krishna";
// 	getName(this: MyClass) {
// 		return this.name;
// 	}
// }
// const c = new MyClass();
// console.log(c.getName());
// const g = c.getName;
// g();
// `this` type
// class Box {
// 	content: string = "world";
// 	sameAs(other: this) {
// 		return this.content === other.content;
// 	}
// }
// class Derived extends Box {
// 	otherContent: string = "hello";
// }
// const a = new Box();
// const b = new Derived();
// a.sameAs(b);
// class Box {
// 	content: string = "";
// 	sameAs(other: Box) {
// 		return other.content === this.content;
// 	}
// }
// class Derived extends Box {
// 	otherContent: string = "world";
// }
// const a = new Box();
// const b = new Derived();
// a.sameAs(b);
// b.sameAs(a);
// // this -based type guards
// class FileSystemObject {
// 	isFile(): this is FileRep {
// 		return this instanceof FileRep;
// 	}
// 	isDirectory(): this is Directory {
// 		return this instanceof Directory;
// 	}
// 	isNetworked(): this is Networked & this {
// 		return this.networked;
// 	}
// 	constructor(public path: string, private networked: boolean) {}
// }
// class FileRep extends FileSystemObject {
// 	constructor(path: string, public content: string) {
// 		super(path, false);
// 	}
// }
// class Directory extends FileSystemObject {
// 	children: FileSystemObject[] = [];
// }
// interface Networked {
// 	host: string;
// }
// const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");
// if(fso.isFile()) {
// 	fso.content;
// } else if(fso.isDirectory()) {
// 	fso.children;
// } else if(fso.isNetworked()) {
// 	fso.host;
// }
var Box = /** @class */ (function () {
    function Box() {
    }
    Box.prototype.hasValue = function () {
        return this.value !== undefined;
    };
    return Box;
}());
var box = new Box();
box.value = "Gameboy";
box.value;
if (box.hasValue()) {
    box.value;
}
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.createdAt = Date.now();
        this.x = x;
        this.y = y;
    }
    return Point;
}());
function moveRight(point) {
    point.x += 5;
}
var point = new Point(3, 4);
moveRight(point);
point.x;
// abstract classes and members
var Base = /** @class */ (function () {
    function Base() {
    }
    Base.prototype.printName = function () {
        console.log("Hello, " + this.getName());
    };
    return Base;
}());
var b = new Base();
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived.prototype.getName = function () {
        return "world";
    };
    return Derived;
}(Base));
var d = new Derived();
d.printName();
function greet(ctor) {
    var instance = new ctor();
    instance.printName();
}
var Empty = /** @class */ (function () {
    function Empty() {
    }
    return Empty;
}());
function fn(x) { }
fn(window);
fn({});
fn(fn);
