// Enums

// Numeric Enums

enum Direction {
	Up = 0,
	Down,
	Left,
	Right
}

enum Direction1 {
	Up,
	Down,
	Left,
	Right
}
console.log(Direction1.Down);

// Reverse Mapping

enum Enum {
	A
}

let a = Enum.A;
let nameOfA = Enum[0];

// Ambient Enum

declare enum Enum2 {
	A = 1,
	B,
	C = 2
}
