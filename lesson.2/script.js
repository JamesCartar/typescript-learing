// function greeter(person: string) {
// 	return "Hello, " + person;
// }
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
