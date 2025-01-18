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

class MyGenericNum<NumType> {
	zeroValue: NumType;
	add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new MyGenericNum<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => {
	return x + y;
};

let myGenericString = new MyGenericNum<string>();
myGenericString.zeroValue = "";
myGenericString.add = function (x, y) {
	return x + y;
};

interface Person {
	name: string;
	age: number;
}

class GenericContainer<MyType> {
	value: MyType;
	constructor(initialValue: MyType) {
		this.value = initialValue;
	}
	getValue(): MyType {
		return this.value;
	}
}

let alice = new GenericContainer<Person>({ name: "alice", age: 20 });
alice.getValue();

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
	return obj[key];
}
const obj = { a: 1, b: 2, c: 3, d: 4 };
getProperty(obj, "a");
getProperty(obj, "m");

// Using class types in generic

function create<Type>(c: { new (): Type }): Type {
	return new c();
}

class myClass {
	property: string = "hello";
}

let instance = create(myClass);
console.log(instance.property);

class Bee1 {
	buzz(): string {
		return "Buzz!";
	}
}

class Lion1 {
	roar(): string {
		return "Roar!";
	}
}

const beeInstance1 = create(Bee1);
beeInstance1.buzz();
const lionInstance1 = create(Lion1);
lionInstance1.roar();

class Animal1 {
	numLegs: number = 4;
}

class Bee2 extends Animal1 {
	buzz(): string {
		return "Buzz!";
	}
}

class Lion2 extends Animal1 {
	roar(): string {
		return "Roar!";
	}
}

function createInstance1<A extends Animal1>(c: new () => A): A {
	return new c();
}

let beeInstance = createInstance1(Bee2);
console.log(beeInstance.numLegs);
console.log(beeInstance.buzz());

let lion = createInstance1(Lion2);
console.log(lion.numLegs);
console.log(lion.roar());

class BeeKeeper {
	hasMask: boolean = true;
}

class ZooKeeper {
	nameTag: string = "Krishna";
}

class Animal {
	numLegs: number = 4;
}

class Bee extends Animal {
	beekeeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
	zookeeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: { new (): A }): A {
	return new c();
}

let myBee = createInstance(Bee);
console.log(myBee.beekeeper.hasMask);
console.log(myBee.numLegs);

let myLion = createInstance(Lion);
console.log(myLion.numLegs);
console.log(myLion.zookeeper.nameTag);

type Container<T, U> = {
	element: T;
	children: U;
};
declare function create1(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create1<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create1<T extends HTMLElement, U extends HTMLElement>(
	element: T,
	children: U[]
): Container<T, U[]>;

declare function create<
	T extends HTMLElement = HTMLDivElement,
	U extends HTMLElement[] = T[]
>(element?: T, children?: U): Container<T, U>;
const div = create();
const p = create(new HTMLParagraphElement());

// Generic Parameter Default Rules

// 1. A type parameter is deemed optional if it has a default
function example<T = string>(value?: T): T {
	return value ?? ("default" as T);
}
example();
example<number>(42);
example<number>();

// 2. Required type parameters must not follow optional type parameters.
function valid<T = string, U = number>(first?: T, second?: U): [T, U] {
	return [first ?? ("default" as T), second ?? (42 as U)];
}

valid();
valid<boolean, string>(true, "hello");

// 3. Default type for the type parameter must satisfy the constraint for the type parameter, if it exists.
function constrained<T extends HTMLElement = HTMLDivElement>(element?: T): T {
	return element ?? (new HTMLDivElement() as unknown as T);
}
constrained();
constrained(new HTMLParagraphElement());

// 4. When specifying type arguments, you are only required to specify type arguments for the required type parameters. Unspecified type parameters will resolve to their default types.
function example1<T = string, U = number>(first?: T, second?: U): [T, U] {
	return [first ?? ("default" as T), second ?? (42 as U)];
}
example1();
example1<boolean>();
example1<boolean, string>(true, "hello");

// 5. If a default type is specified and inference cannot choose a candidate, the default type is inferred.
function infer<T = string>(value?: T): T {
	return value ?? ("default" as T);
}

const result = infer();
const explicit = infer<number>(42);

// 6. A class or interface declaration that merges with an existing class or interface declaration may introduce a default for an existing type parameter
interface Box<T> {
	value: T;
}

interface Box<T = string> {}

const stringBox: Box = { value: "hello" };
const numberBox: Box<number> = { value: 42 };

// 7. A class or interface declaration that merges with an existing class or interface declaraion may introduce a new type parameter as long as it specifies a default.
interface Container1<T> {
	items: T[];
}

interface Container1<T, U = string> {
	metadata: U;
}

const oldContainer: Container1<number> = { items: [1, 2, 3], metadata: "info" };
const newContainer: Container1<number, boolean> = {
	items: [1, 2, 3],
	metadata: true
};

// Index Access Types

let myArray = [
	{ name: "alice", age: 20 },
	{ name: "jake", age: 23 },
	{ name: "ross", age: 32 }
];

type Person2 = (typeof myArray)[number];
type age = (typeof myArray)[number]["age"]; // or
type key = "age";
type age2 = Person2[key];

// Conditional Type Constraints

// type MessageOf<T extends { message: unknown }> = T["message"];
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
	message: string;
}

interface Dog {
	woff(): void;
}

type EmailMessageContents = MessageOf<Email>;
type DogContents = MessageOf<Dog>;

type Flatten<T> = T extends any[] ? T[number] : T;

type myString = Flatten<string[]>;
type myNumber = Flatten<number>;

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
	? Return
	: never;

type Horse = string;

type OnlyBooleanAndHorses = {
	[key: string]: boolean | Horse;
};

const conforms: OnlyBooleanAndHorses = {
	del: true,
	rodney: true
};

type OptionsFlag<Type> = {
	readonly [Property in keyof Type]?: boolean;
};

type Features = {
	darkMode: () => void;
	newUserProfile: () => void;
};

type FeatureOptions = OptionsFlag<Features>;

type CreateMutable<Type> = {
	-readonly [Property in keyof Type]: Type[Property];
};

type Concrete<Type> = {
	[Property in keyof Type]-?: Type[Property];
};

type MutableFeature = CreateMutable<FeatureOptions>;
type User = Concrete<MutableFeature>;

// Template Literal Types

type World = "world";

type Greeting = `hello ${World}`;

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;

// string unions in Types

const God = {
	firstName: "Krishna",
	lastName: "Wasudev",
	age: 0
};

// type PropEventSource<Type> = {
// 	on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
// }
type PropEventSource<Type> = {
	on<Key extends string & keyof Type>(
		eventName: `${Key}Changed`,
		callback: (newValue: Type[Key]) => void
	): void;
};

declare function makeWatchedObject<Type>(
	obj: Type
): Type & PropEventSource<Type>;

const UpdatedGod = makeWatchedObject(God);

UpdatedGod.on("ageChanged", (hello) => console.log("Hello", hello));

// Intrinsic String manipulation types

// uppercase
type Greeting1 = "hello world";
type ShoutyGreeting = Uppercase<Greeting1>;

type ASCIICacheKeyUP<Str extends string> = `ID-${Uppercase<Str>}`;
type ASCIICacheKeyLO<Str extends string> = `id-${Lowercase<Str>}`;
type Main_ID = ASCIICacheKeyUP<"my_app">;
type main_id = ASCIICacheKeyLO<"MY_APP">;

type CapitalizeGreeting = Capitalize<main_id>;
type UnCapitalizeGreeting = Uncapitalize<Main_ID>;
