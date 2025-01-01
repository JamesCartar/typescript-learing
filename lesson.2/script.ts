// function greeter(person: string) {
// 	return "Hello, " + person;
// }

// let user = "Jane User";

// document.body.textContent = greeter(user);

// interface Person {
// 	firstName: string;
// 	lastName: string;
// }

// function greet(person: Person) {
// 	return "Hello, " + person.firstName + " " + person.lastName;
// }

// let user1 = { firstName: "Hein", lastName: "Htet" };

// document.body.textContent = greet(user1);

// class Student {
// 	fullName: string;
// 	constructor(public firstName, public middleInitial, public lastName) {
// 		this.fullName = firstName + " " + middleInitial + " " + lastName;
// 	}
// }

// interface Person {
// 	firstName: string;
// 	lastName: string;
// }

// function greeter(person: Person): string {
// 	return "Hello, " + person.firstName + " " + person.lastName;
// }

// let user = new Student("Hein", "Arjun", "Htet");

// document.body.textContent = greeter(user);

// function greeter(person: string, date: Date) {
// 	return "Hello, " + person + "! Today is " + date.toDateString();
// }

// document.body.textContent = greeter("Hein Htet", new Date());

// type users = number[];
// type users2 = Array<number>;

// function greet(name: string): string {
// 	return "Hello, " + name.toUpperCase() + "!!";
// }

// async function getFavoriteNumber(): Promise<number> {
// 	return 26;
// }

// const names: string[] = ["Alice", "Bob", "Eve"];

// names.forEach(function (s) {
// 	console.log(s.toUpperCase());
// });

// names.forEach((s) => {
// 	console.log(s.toUpperCase());
// });

// function printName(obj: { first: string; last?: string }) {
// 	if (obj.last) {
// 		console.log(obj.last.toUpperCase());
// 	}
// }

// printName({ first: "Bob" });
// printName({ first: "Alice", last: "Alisson" });

// function printId(id: number | string) {
// 	if (typeof id === "string") {
// 		console.log(id.toUpperCase());
// 	} else {
// 		console.log(id.toString());
// 	}
// }

// printId(101);
// printId("202");

// function welcomePeople(x: string[] | string) {
// 	if (Array.isArray(x)) {
// 		console.log("hello, " + x.join(" & "));
// 	} else {
// 		console.log("Welcome lone traveler " + x);
// 	}
// }

// type Point = {
// 	x: number;
// 	y: number;
// };

// function printCoord(pt: Point) {
// 	console.log("The coordinate's x value is " + pt.x);
// 	console.log("The coordinate's y value is " + pt.y);
// }

// interface Animal {
// 	name: string;
// }

// interface Bear extends Animal {
// 	honey: boolean;
// }

// const bear = getBear();
// bear.name;
// bear.honey;

// type Animal = {
// 	name: string;
// };

// type Bear = Animal & {
// 	honey: boolean;
// };

// const bear = getBear();
// bear.name;
// bear.honey;

// interface Window {
// 	title: string;
// }

// interface Window {
// 	ts: TypeScriptAPI;
// }

// const src = 'const a = "Hello, World";';

// window.ts.transpileModule(src, {});

// type Window = {
// 	title: string;
// };

// type Window = {
// 	ts: TypeScriptAPI;
// }

// const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
// const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");

// const x = "hello" as unknown as number;
// console.log(typeof x);

// let changingString = "Hello World";
// changingString = "Krishna";

// const constantString = "Hello World";
// constantString;

// let x: "hello" = "hello";
// x = "hello";
// x = "howdy";

// declare function handleRequest(url: string, method: "GET" | "POST"): void;

// // const req = { url: "https://example.com", method: "GET" as "GET" };
// // const req = { url: "https://example.com", method: "GET" };
// const req = { url: "https://example.com", method: "GET" } as const;

// // handleRequest(req.url, req.method as "GET");
// handleRequest(req.url, req.method);

// function padLeft(padding: number | string, input: string) {
// 	// nothing implemented yet
// }

// function padLeft(padding: number | string, input: string) {
// 	return " ".repeat(padding) + input;
// }

// function padLeft(padding: number | string, input: string) {
// 	if (typeof padding === "number") {
// 		return " ".repeat(padding) + input;
// 	} else {
// 		return padding + " " + input;
// 	}
// }

// console.log(padLeft(5, "Hein Htet"));
// console.log(padLeft("Hello", "Hein Htet"));

// function printAll(str: string | string[] | null) {
// 	if (str && typeof str === "object") {
// 		for (const s of str) {
// 			console.log(s);
// 		}
// 	} else if (typeof str === "string") {
// 		console.log(str);
// 	} else {
// 		// do something else
// 	}
// }

// function muitiplyAll(
// 	values: number[] | undefined,
// 	factor: number
// ): number[] | undefined {
// 	if (!values) {
// 		return values;
// 	} else {
// 		return values.map((x) => x * factor);
// 	}
// }

// function example(x: string | number, y: string | boolean) {
// 	if (x === y) {
// 		x.toUpperCase();
// 		y.toUpperCase();
// 	} else {
// 		console.log(x);
// 		console.log(y);
// 	}
// }

// function printAll(str: string | string[] | undefined) {
// 	if (str != null) {
// 		if (typeof str == "object") {
// 			for (const s of str) {
// 				console.log(s);
// 			}
// 		} else if (typeof str == "string") {
// 			return str;
// 		}
// 	}
// }

// interface Container {
// 	value: number | null | undefined;
// }

// function multiplyValue(container: Container, factor: number) {
// 	if (container.value != null) {
// 		console.log(container.value);
// 		container.value *= factor;
// 	}
// }

// type Fish = { swim: () => void };
// type Bird = { fly: () => void };

// function move(animal: Fish | Bird) {
// 	if ("swim" in animal) {
// 		return animal.swim();
// 	}
// 	animal.fly();
// }

// type Fish = {
// 	swim: () => void;
// };
// type Bird = {
// 	fly: () => void;
// };
// type Human = {
// 	swim?: () => void;
// 	fly?: () => void;
// };

// function move(animal: Fish | Bird | Human) {
// 	if ("swim" in animal) {
// 		animal.swim();
// 	} else {
// 		animal;
// 	}
// }

// function logValue(x: Date | string) {
// 	if (x instanceof Date) {
// 		console.log(x.toUTCString());
// 	} else {
// 		console.log(x.concat("hhh"));
// 	}
// }

// let x = Math.random() < 0.5 ? 10 : "string";

// x = 2;

// x;

// x = "hello";

// x;

// x = true;

// function example() {
// 	let x: string | number | Boolean;

// 	x = Math.random() < 0.5;

// 	if (Math.random() < 0.5) {
// 		x = "hello";
// 		console.log(x);
// 	} else {
// 		x = 100;
// 		console.log(x);
// 	}

// 	return x;
// }

// type Fish = {
// 	swim: () => void;
// };
// type Bird = {
// 	fly: () => void;
// };

// function isFish(pet: Fish | Bird): pet is Fish {
// 	return (pet as Fish).swim != undefined;
// }

// declare function getSomePet(): Fish | Bird;

// function foo(animal: Bird | Fish) {
// 	if (isFish(animal)) {
// 		animal.swim();
// 	} else {
// 		animal.fly();
// 	}
// }

// const zoo: (Fish | Bird)[] = [getSomePet(), getSomePet(), getSomePet()];
// const underWater1: Fish[] = zoo.filter(isFish);
// // or, equvalently
// const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
// const underWater3: Fish[] = zoo.filter((pet: Fish | Bird): pet is Fish => {
// 	// if(pet.name === 'sharkey') return false;
// 	return isFish(pet);
// });

// interface Shape {
// 	kind: "circle" | "square";
// 	radius?: number;
// 	sideLength?: number;
// }

// // function handleShape(shape: Shape) {
// // 	if(shape.kind === 'rect') {

// // 	}
// // }

// function getArea(shape: Shape) {
// 	if (shape.kind === "circle") {
// 		return Math.PI * shape.radius! ** 2;
// 	}
// }

interface Circle {
	kind: "circle";
	radius: number;
}

interface Square {
	kind: "square";
	sideLength: number;
}

// function getArea(shape: Shape) {
// 	if (shape.kind === "circle") {
// 		return Math.PI * shape.radius ** 2;
// 	}
// }

// function getArea(shape: Shape) {
// 	switch (shape.kind) {
// 		case "circle":
// 			return Math.PI * shape.radius ** 2;
// 		case "square":
// 			return shape.sideLength ** 2;
// 	}
// }

// interface Triangle {
// 	kind: "triangle";
// 	sideLength: number;
// }

// type Shape = Circle | Square | Triangle;

// function getArea(shape: Shape) {
// 	switch (shape.kind) {
// 		case "circle":
// 			return Math.PI * shape.radius ** 2;
// 		case "square":
// 			return shape.sideLength * 2;
// 		default:
// 			const _exhaustiveCheck: never = shape;
// 			return _exhaustiveCheck;
// 	}
// }
