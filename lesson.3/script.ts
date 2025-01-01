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
