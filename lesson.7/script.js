// // Utilities Type
// // Awaited<Type>
// type A = Awaited<Promise<string>>;
// type B = Awaited<Promise<Promise<number>>>;
// type C = Awaited<boolean | Promise<number>>;
// // Partial<Type>
// interface Todo {
// 	title: string;
// 	description: string;
// }
// function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
// 	return { ...todo, ...fieldsToUpdate };
// }
// const todo1 = {
// 	title: "organize task",
// 	description: "clear clutter"
// };
// const todo2 = updateTodo(todo1, {
// 	description: "throw out trash"
// });
// // Required<Type>
// interface Props {
// 	a?: number;
// 	b?: string;
// }
// const obj: Props = { a: 5 };
// const obj2: Required<Props> = { a: 5, b: "hello" };
// // Readonly<Type>
// interface Todo1 {
// 	title: string;
// }
// const todo: Readonly<Todo1> = {
// 	title: "Delete inactive users"
// };
// todo.title = "Hello World";
// // Record<Keys, Type>
// type CatName = "miffy" | "boris" | "mordred";
// interface CatInfo {
// 	age: number;
// 	breed: string;
// }
// const cats: Record<CatName, CatInfo> = {
// 	boris: { age: 3, breed: "Persian" },
// 	miffy: { age: 4, breed: "Maine Coon" },
// 	mordred: { age: 5, breed: "British Shorthair" }
// };
// cats.boris;
// // Pick<Type, Keys>
// interface Todo2 {
// 	title: string;
// 	description: string;
// 	completed: boolean;
// }
// type TodoPreview = Pick<Todo2, "title" | "completed">;
// const todo3: TodoPreview = {
// 	title: "",
// 	completed: true
// };
// //Exclude<UnionType, ExcludedMembers>
// type T0 = Exclude<"a" | "b" | "c", "a">;
// type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
// type T2 = Exclude<"a" | "b" | (() => void), Function>;
// type Shape =
// 	| { kind: "circle"; radius: number }
// 	| { kind: "square"; x: number; y: number }
// 	| { kind: "triangle"; x: number };
// type T3 = Exclude<Shape, { kind: "circle" }>;
// // Extract<Type, Union>;
// type T00 = Extract<"a" | "b" | "c", "a" | "f">;
// type T11 = Extract<"a" | "b" | (() => void), Function>;
// type T22 = Extract<Shape, { kind: "circle" }>;
// // NonNullable<Type>
// type T000 = NonNullable<string | number | undefined>;
// type T001 = NonNullable<string[] | undefined | null>;
// // Parameters<Type>
// declare function f1(arg: { a: number; b: number }): void;
// type T0000 = Parameters<() => string>;
// type T0001 = Parameters<(s: string) => string>;
// type T0002 = Parameters<<T>(s: T) => T>;
// type T0003 = Parameters<typeof f1>;
// type T0004 = Parameters<any>;
// type T0005 = Parameters<never>;
// type T0006 = Parameters<string>;
// type T0007 = Parameters<Function>;
// ConstructorParameters<Type>
// type T0 = ConstructorParameters<ErrorConstructor>;
// type T1 = ConstructorParameters<FunctionConstructor>;
// type T2 = ConstructorParameters<RegExpConstructor>;
// class C {
// 	constructor(a: number, b: string) {}
// }
// type T3 = ConstructorParameters<typeof C>;
// type T4 = ConstructorParameters<any>;
// type T5 = ConstructorParameters<Function>;
// InstanceType<Type>
// class C {
// 	x: number = 0;
// 	y: number = 0;
// }
// type T0 = InstanceType<typeof C>;
// type T1 = InstanceType<any>;
// // NoInfer<Type>
// function createStreetLight<C extends string>(
// 	colors: C[],
// 	defaultColor: NoInfer<C>
// ) {}
// createStreetLight(["red", "yellow", "green"], "red");
// createStreetLight(["red", "yellow", "green"], "gray");
// ThisParameterType<Type>
function toHex() {
    return this.toString(16);
}
function numberToString(n) {
    return toHex.apply(n);
}
// OmitThisParameter<Type>
var fiveToHex = toHex.bind(5);
fiveToHex();
