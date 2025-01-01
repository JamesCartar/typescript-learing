interface User {
	id: number;
	name: string;
	getUser(): userInfoType;
	updateUser(user: userInfoType): void;
}

type userInfoType = {
	id: number;
	name: string;
};

class UserAccount implements User {
	name: string;
	id: number;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}

	getUser(): userInfoType {
		return { id: this.id, name: this.name };
	}

	updateUser(user: userInfoType): void {
		this.id = user.id;
		this.name = user.name;
	}
}

const user: User = new UserAccount(1, "Murphy");

type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]): number {
	return obj.length;
}

function wrapInArray(obj: string | string[]): string[] {
	if (typeof obj === "string") {
		return [obj];
	}
	return obj;
}

type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Backpack<Type> {
	add: (obj: Type) => void;
	get: () => Type;
}

declare const backpack: Backpack<string>;
backpack.add("32");
const object = backpack.get();

interface Point {
	x: number;
	y: number;
}

function logPoint(p: Point) {
	console.log(`${p.x}, ${p.y}`);
}

const point = { x: 12, y: 26 };

logPoint(point);
