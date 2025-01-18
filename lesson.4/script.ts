interface SomeType {
	readonly prop: string;
}

function doSomething(obj: SomeType) {
	// We can read from 'obj.prop'
	console.log(`prop has the value ${obj.prop}`);

	// But we can't re-assign it.
	obj.prop = "hello";
}

interface Home {
	readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
	// We can read and update properties from 'home.resident'
	console.log(`Happy birthday ${home.resident.name}!`);
	home.resident.age++;
}

function evict(home: Home) {
	home.resident = {
		// ....
	};
}

interface Person {
	name: string;
	age: number;
}

interface ReadonlyPerson {
	readonly name: string;
	readonly age: number;
}

let writablePerson: Person = {
	name: "Person McPersonface",
	age: 42
};

let readOnlyPerson: ReadonlyPerson = writablePerson;

console.log(readOnlyPerson.age);
writablePerson.age++;
console.log(readOnlyPerson.age);

interface StringArray {
	[index: number]: string;
}

declare const getStringArray: () => String;

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];

interface Animal {
	name: string;
}

interface Dog extends Animal {
	breed: string;
}

interface NotOkay {
	[x: string]: Animal;
	[y: number]: Dog;
}

interface NumberDictionary {
	[index: string]: number;

	length: number;
	name: string;
}

interface NumberOrStringDictionary {
	[index: string]: number | string;
	length: number;
	name: string;
}

interface ReadonlyStringArray {
	readonly [index: number]: string;
}

declare const getReadOnlyStringArray: () => ReadonlyStringArray;

let myArray1: ReadonlyStringArray = getReadOnlyStringArray();

myArray1[2] = "Mallory";

// Excess Property Checks

interface SquareConfig {
	color?: string;
	width?: number;
	// [propName: string]: unknown;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
	return {
		color: config.color || "red",
		area: config.width ? config.width * config.width : 20
	};
}

let mySquare = createSquare({ colour: "red", width: 100 });
let mySquare1 = createSquare({ colour: "red", width: 100 } as SquareConfig);
let squareOptions = { colour: "red", width: 200 };
let mySquare2 = createSquare(squareOptions);

// Extending Types

interface BasicAddress {
	name?: string;
	street: string;
	city: string;
	country: string;
	postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
	unit: string;
}

interface Colorful {
	color: string;
}

interface Circle {
	radius: number;
}

interface ColorFulCircle extends Colorful, Circle {}

const cc: ColorFulCircle = {
	color: "red",
	radius: 42
};

// Interface Extension vs. Intersection

interface Person {
	name: string;
}

interface Person {
	name: number;
}

interface Person1 {
	name: string;
}

interface Person2 {
	name: number;
}

type Staff = Person1 & Person2;

declare const staffer: Staff;

staffer.name;

// Generic Objects Types

interface Box<Type> {
	contents: Type;
}

function setContents<Type>(box: Box<Type>, newContents: Type) {
	box.contents = newContents;
}

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
type OneOrManyOrNullString = OneOrManyOrNull<string>;

// Array type

function doSomething1(value: Array<string>) {
	// do something
}

let myArray11: string[] = ["hello", "world"];

doSomething1(myArray11);
doSomething1(new Array("Hello", "World"));

// Array generic type sample

interface Array<Type> {
	/**
	 * Gets or sets the length of the array
	 */
	length: number;

	/**
	 * Removes the last element from an array and returns it.
	 */
	pop(): Type | undefined;

	/**
	 * Appends new elements to an array, and returns the new length of the array.
	 */
	push(...items: Types[]): number;
}

function doStuff(values: ReadonlyArray<string>) {
	// We can read from 'values'...
	const copy = values.slice();
	console.log(`The first value is ${values[0]}`);

	// ...but we can't mutate 'values'.
	values.push("hello!");
}
const roArrayOne: ReadonlyArray<string> = ["red", "green", "blue"];
// or
const roArray1: ReadonlyArray<string> = ["red", "green", "blue"] as const;
