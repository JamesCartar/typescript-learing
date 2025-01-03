function greeter(fn: GreetFunction) {
	fn("Hello, World");
}

function printToConsole(s: string) {
	console.log(s);
}

greeter(printToConsole);

type GreetFunction = (a: string) => void;

type DescribableFunction = {
	description: string;
	(someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
	console.log(fn.description + "returned " + fn(6));
}

function myFunc(someArg: number) {
	return someArg > 3;
}

myFunc.description = "default description";

doSomething(myFunc);

// declare const SomeObject: {
// 	hello: string;
// };

type SomeObject = {
	hello: string;
};

type SomeConstructor = {
	new (s: string): SomeObject;
};

// function fn(ctor: SomeConstructor) {
// 	return new ctor("hello");
// }

interface CallOrConstruct {
	(n?: number): string;
	new (s: string): Date;
}

function fn(ctor: CallOrConstruct) {
	console.log(ctor(10));
	console.log(new ctor("10"));
}

// function firstElement(arr: any[]) {
// 	return arr[0];
// }

function firstElement<Type>(arr: Type[]): Type | undefined {
	return arr[0];
}

const s = firstElement(["a", "b", "c", "d"]);
const n = firstElement([1, 2, 3, 4]);
const d = firstElement([]);

function map<Input, Output>(
	arr: Input[],
	func: (arg: Input) => Output
): Output[] {
	return arr.map(func);
}

console.log(map(["1", "2", "3", "4"], (n) => parseInt(n)));

function longest<Type extends { length: number }>(a: Type, b: Type) {
	if (a.length > b.length) {
		return a;
	} else {
		return b;
	}
}

console.log(longest(["1", "2", "3"], ["1", "2"]));
console.log(longest("hein", "htets"));
// console.log(longest(10, 20004));

function minimumLength<Type extends { length: number }>(
	obj: Type,
	minimum: number
): Type {
	if (obj.length > minimum) {
		return obj;
	} else {
		return { ...obj, length: minimum };
	}
}

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
	return arr1.concat(arr2);
}
const hein = 1;
const htet = 2;

console.log(combine([1, 2, 3, 4], [5, 6, 7, 8]));
console.log(combine<number | string>(["1", "2", "3"], [5, 6, 7, 8]));

function firstElement1<Type>(arr: Type[]) {
	return arr[0];
}
function firstElement2<Type extends any[]>(arr: Type) {
	return arr[0];
}

const a = firstElement1([1, 2, 3, 4, 5]);
const b = firstElement2([1, 2, 3, 4, 5]);

function filter1<Type>(arr: Type[], func: (num: Type) => boolean) {
	return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
	arr: Type[],
	func: Func
) {
	return arr.filter(func);
}

function f(x: number = 10) {
	console.log(x.toFixed(2));
}

function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
	for (let i = 0; i < arr.length; i++) {
		callback(arr[i], i);
	}
}

// Function Overload

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
	if (d != undefined && y != undefined) {
		return new Date(y, mOrTimestamp, d);
	} else {
		return new Date(mOrTimestamp);
	}
}

const d1 = makeDate(123456);
const d2 = makeDate(5, 6, 2004);
// const d3 = makeDate(1, 3);

function len(x: string): number;
function len(x: any[]): number;
function len(x: string | any[]) {
	return x.length;
}

len("");
len([1, 2, 3]);
// len(Math.random() < 0.5 ? "hello" : [0]);

function len1(x: string | any[]): number {
	return x.length;
}

// Declaring this in function

const user = {
	id: 123,
	admin: false,
	becomeAdmin: function () {
		this.admin = true;
	}
};

interface User {
	id: number;
}
interface DB {
	filterUsers(filter: (this: User) => boolean): User[];
}
declare const getDB: () => DB;

const db = getDB();
const filteredUsers = db.filterUsers(function (this: User) {
	return this.id > 10;
});

function multiply(n: number, ...m: number[]) {
	return m.map((x) => n * x);
}

const a1 = multiply(10, 1, 2, 3, 4, 5);

function sum(...numbers: Array<number>) {
	return numbers.reduce((a, b) => a + b, 0);
}

function concat(...strings: string[]) {
	return strings.join(", ");
}

function makeTuple(first: string, ...rest: [number, boolean]) {
	return [first, ...rest];
}

console.log(sum(1, 2, 3, 4, 5));
console.log(concat("a", "b", "c"));
console.log(makeTuple("abc", 12, true));

// Rest Arguments

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

arr1.push(...arr2);

const args: [number, number] = [8, 5];
const angle = Math.atan2(...args);

type voidFunc = () => void;

const f1: voidFunc = () => {
	return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
	return true;
};

const v1 = f1();
const v2 = f2();
const v3 = f3();
