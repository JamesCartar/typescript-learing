**Need to learn more about:** 1. Variance Annotations

**Building Types**

There are two syntaxes for building types: **Interfaces** and **Types**.

-   **Prefer `interface`:** It's generally more flexible and extensible.
-   **Use `type` when:** You need specific features like union, intersection, or conditional types.

**TypeScript Configuration Options**

TypeScript provides several configuration options to help you catch errors early and enforce stricter type checking. Here are three important options:

-   **`noEmitOnError`:**

    -   When set to `true`, TypeScript will not emit any output files if there are any type errors in the project.
    -   This ensures that you don't accidentally deploy code with type errors.
    -   Example configuration in `tsconfig.json`:
        ```json
        {
        	"compilerOptions": {
        		"noEmitOnError": true
        	}
        }
        ```

-   **`noImplicitAny`:**

    -   When set to `true`, TypeScript will raise an error whenever it infers the `any` type for a variable.
    -   This helps catch potential bugs by ensuring that all variables have an explicit type.
    -   Example configuration in `tsconfig.json`:
        ```json
        {
        	"compilerOptions": {
        		"noImplicitAny": true
        	}
        }
        ```

-   **`strictNullChecks`:**

    -   When set to `true`, TypeScript will not allow `null` or `undefined` to be assigned to a variable unless it is explicitly allowed by the type.
    -   This helps prevent runtime errors related to `null` or `undefined` values.
    -   Example configuration in `tsconfig.json`:
        ```json
        {
        	"compilerOptions": {
        		"strictNullChecks": true
        	}
        }
        ```

-   **`strictPropertyInitialization`:**

    -   The strictPropertyInitialization setting controls whether class fields need to be initialized in the constructor.
    -   Example configuration in `tsconfig.json`:
        ```json
        {
        	"compilerOptions": {
        		"strictPropertyInitialization": true
        	}
        }
        ```

**Combining Types**

TypeScript allows you to create complex types by combining simpler ones:

-   **Unions:**

    -   Represent a value that can be one of many types.
    -   Example: `type WindowStates = "open" | "closed" | "minimized";`

-   **Generics:**

    -   Provide variables to types, making them more reusable.
    -   Example: `type StringArray = Array<string>;`

    -   Declare your own generic types:

        ```typescript
        interface Backpack<Type> {
        	add: (obj: Type) => void;
        	get: () => Type;
        }

        declare const backpack: Backpack<string>;

        const object = backpack.get(); // object is of type string

        backpack.add(23); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
        ```

**Structural Type System**

-   TypeScript employs a **structural type system** (duck typing).
-   If an object has the same properties and methods as a required type, it's considered compatible, regardless of its explicit declaration.

**Note:**

> The structural typing system in TypeScript allows for flexible and more intuitive type compatibility, especially when working with dynamic data or third-party libraries without formal type declarations.

This approach offers a lightweight way to ensure type safety while maintaining flexibility.
**Differences Between Interface and Type**

While both `interface` and `type` can be used to define the shape of an object in TypeScript, there are some key differences between them:

| Feature               | `interface`                                                     | `type`                                                             |
| --------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| Declaration Merging   | Yes, interfaces can be merged.                                  | No, types cannot be merged.                                        |
| Extending             | Can extend other interfaces or types.                           | Can extend other types or interfaces using intersections.          |
| Use Cases             | Best for defining the shape of objects and classes.             | Best for complex type definitions like unions, intersections, etc. |
| Syntax                | Uses `interface` keyword.                                       | Uses `type` keyword.                                               |
| Computed Properties   | Not supported.                                                  | Supported.                                                         |
| React Props and State | Commonly used for defining props and state in React components. | Can also be used, but interfaces are more common in this context.  |

**Extending Type**

-   **Interface: (using - extends)**

    ```typescript
    interface User {
    	name: string;
    	age: number;
    }

    interface Admin extends User {
    	role: string;
    }
    ```

-   **Type: (using - intersection)**

        ```typescript
        type User = {
        	name: string;
        	age: number;
        };

        type Admin = User & {
        	role: string;
        };
        ```

    **Adding New Property**

-   **Interface:**

    ```typescript
    interface User {
    	name: string;
    	age: number;
    }

    interface User {
    	email: string;
    }

    const user: User = {
    	name: "Alice",
    	age: 30,
    	email: "alice@example.com"
    };
    ```

-   **Type:**

    ```typescript
    type Window = {
    	title: string;
    };

    type Window = {
    	ts: TypeScriptAPI;
    };

    // Error: Duplicate identifier 'Window'.
    ```

In summary, an interface can add new properties, whereas a type cannot. Interfaces are extendable and can be merged, allowing for the addition of new properties, while types are fixed once defined.

**Type Assertions**

Sometimes you will have information about the type of a value that TypeScript can't know about.

-   **Example**
    ```typescript
    const myCanvas = document.getElementById(
    	"main_canvas"
    ) as HTMLCanvasElement;
    ```

TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions like:

-   **Example**

    ```typescript
    const x = "hello" as number;

    // Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
    ```

Sometimes this rule can be too conservative and will disallow more complex coercions that might be valid. If this happens, you can use two assertions, first to any (or unknown, which we’ll introduce later), then to the desired type:

-   **Example**
    ```typescript
    const x = "hello" as unknown as number;
    ```

**Literal Type**

In TypeScript, you can specify exact values for types, not just general types like `string` or `number`.

-   **Example:**

    ```typescript
    let direction: "north" | "south" | "east" | "west";

    direction = "north"; // valid

    direction = "up"; // error
    ```

This is similar to how `const` in JavaScript ensures a variable holds a specific value, while `let` and `var` allow changes.

**Literal Interface**

-   **Example:**

    ```typescript
    declare function handleRequest(url: string, method: "GET" | "POST"): void;

    const req = { url: "https://example.com", method: "GET" };

    handleRequest(req.url, req.method);

    // Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
    ```

    In the above example, `req.method` is inferred to be `string` which could reassign a new string like `"GUESS"`, not `"GET"`. TypeScript considers this code to have an error.

There are two ways to work around this.

-   Change the inference by adding a type assertion in either location:

    ```typescript
    // change 1
    const req = { url: "https://example.com", method: "GET" as "GET" };

    // change 2
    handleRequest(req.url, req.method as "GET");
    ```

-   Use `as const` to convert the entire object to be type literals:

    ```typescript
    const req = { url: "https://example.com", method: "GET" } as const;

    handleRequest(req.url, req.method);
    ```

    The `as const` suffix acts like `const` but for the type system, ensuring that all properties are assigned the literal type instead of a more general version like `string` or `number`.

**Non-null Assertion Operator (Postfix !)**

-   Use `!` when you know that the value can't be null or undefined.

    ```typescript
    function liveDangerously(x?: number | null) {
    	// No error
    	console.log(x!.toFixed());
    }
    ```

**Less Common Primitives**

-   **bigint**

    ```typescript
    // Creating a bigint via the BigInt function
    const oneHundred: bigint = BigInt(100);

    // Creating a BigInt via the literal syntax
    const anotherHundred: bigint = 100n;
    ```

-   **symbol**

        There is a primitive in JavaScript used to create a globally unique reference via the function Symbol():

        ```typescript
        const firstName = Symbol("name");
        const secondName = Symbol("name");

        if (firstName === secondName) {
        	// This comparison appears to be unintentional because the types 'typeof firstName' and 'typeof secondName' have no overlap.
        }
        ```

**Control flow analysis**

`padLeft` returns from within its first `if` blocks. Typescript was able to analyze this code and the rest of the body (`return padding + input`) is unreachable in the case where padding is `number`. As a result, it was able to remove `number` from the type of the `padding` for the rest of the function. This alalysis of code based on reachability is called _control flow analysis_.

```typescript
function padLeft(padding: number | string, input: string) {
	if (typeof padding === "number") {
		return " ".repeat(padding) + input;
	}
	return padding + input;
}
```

**Type Predicates**

To defined a user-defined type guard, we simply need to define a function whose return type is a `type predicate`.

```typescript
function isFish(pet: Bird | Fish): pet is Fish {
	return (pet as Fish).swim !== undefined;
}
```

**Discriminated Unions**

Since `Shape` is a union, TypeScript is telling us that `shape` might be a `Square`, and `Square`s don't have `radius` defined on them! When every type in a union contains a common property with literal types, TypeScript considers that to be a _discriminated union_, and can narrow out the members of the union.

```typescript
interface circle {
	kind: "circle";
	radius: number;
}

interface square {
	kind: "square";
	sideLength: number;
}

type Shape = circle | square;

function getArea(shape: Shape) {
	if (shape.kind === "circle") {
		return Math.PI * shape.radius ** 2;
	}
}
```

**Exhaustiveness Checking**

The `never` type is assignable to every type: however, no type is assignable to `never`(except `never` itself).

```typescript
interface Triangle {
	kind: "triangle";
	sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
	switch (shape.kind) {
		case "circle":
			return Math.PI * shape.radius ** 2;
		case "square":
			return shape.sideLength ** 2;
		default:
			const _exhaustiveCheck: never = shape;
			// Type 'Triangle' is not assignable to type 'never'.
			return _exhaustiveCheck;
	}
}
```

**Function Type Expression**

The simplest way to describe a function is with a _function type expression_.

```typescript
type GreetFunction = (a: string) => void;

function greeter(fn: GreetFunction) {
	// ....
}
```

**Call Signatures**

In JavaScript, functions can have properties in addition to being callable. If we want to describe something callable with properties, we can write a `call signature` in an object type.

```typescript
type DescribaleFunction = {
	description: string;
	(someArg: number): boolean;
};
```

**Construct Signatures**

JavaScript function can also be invoked with `new` operator. You can write construct signature by adding `new` keyword in front of a call signature.
Some objects, like JavaScript's `Date` object, can be called with our without `new`. You can combine call and construct signatures in the same type arbitrarily.

```typescript
type SomeFunction = {
	new (s: string): void;
};
type CallOrConstruct = {
	(n?: number): string;
	new (s: string): Date;
};
```

**Generic Function**

It's common to write a function where the type of the input relate to type of the output, or where the types of two inputs are related in some way.

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
	return arr[0];
}

function map<Input, Output>(
	arr: Input[],
	func: (arg: Input) => Output
): Output[] {
	return arr.map(func);
}

const parsed = map(["1", "2", "3", "4"], (n) => parseInt(n));

function longest<Type extends { length: number }>(a: Type, b: Type): Type {
	if (a.length >= b.length) {
		return a;
	} else {
		return b;
	}
}

const longerArray = longest([1, 2, 3, 4], [1, 2]);
const longerString = longest("abcdef", "abc");
const longerNumber = longest(1234, 25);
// Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
```

**Function Overloads**

Some javascript function can be called in a variety of argument counts and types. Function overloads allow us to define multiple ways to call a function with different argument combinations while ensuring type safety.

-   **Two type of signature**

    1.  Overload Signature, and
    2.  Implementation Signature

        ```typescript
        function makeDate(timestamp: number): Date; // overload signature
        function makeDate(m: number, d: number, y: number): Date; // overload signature
        function makeDate(mOrTimeStamp: number, d?: number, y?: number): Date {
        	// implementation signature
        	if (d !== undefined && y !== undefined) {
        		return new Date(y, m, d);
        	} else {
        		return new Date(mOrTimeStamp);
        	}
        }

        makeDate(123456);
        makeDate(5, 5, 5);
        makeDate(2, 3); // No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
        ```

**Declaring `this` in Function**

-   **Simple Example**

    ```typescript
    const user = {
    	id: 123,
    	admin: false,
    	becomeAdmin() {
    		this.admin = true;
    	}
    };
    ```

-   **Complex Example**

    ```typescript
    interface User {
    	id: number;
    	admin: boolean;
    }

    interface DB {
    	filterUsers(filter: (this: User) => boolean): User[];
    }
    declare const getDB: () => DB;

    const db = getDB();

    db.filterUsers(function (this: User) {
    	return this.admin;
    });
    ```

**Other types to know about**

1. `void`

    void represent the return value of function which don't return a value. Sometime, function with `void` return type can also return `undefined`.

    ```typescript
    function noop(): void {
    	// do nothing
    }
    ```

2. `object`

    The special type `object` refers to any value that isn't a primitive which includes `array`, `object`, `function` and excludes `null` and `undefined`.

    ```typescript
    const user: object = {
    	id: 123,
    	name: "testing"
    };

    function handleObject(obj: object): void {
    	console.log(obj);
    }

    handleObject([1, 2, 3]);
    handleObject({ a: 1, b: "2" });
    handleObject(null); // Error
    ```

3. `unknown`

    unknown type represents any value which is similar to `any` but is safer because it's not legal to do anything with the `unknown` value. We cannot perform operations on `unknown` without narrowing its type first, ensuring runtime safety.

    ```typescript
    function f1(a: any) {
    	a.b();
    }

    function f2(a: unknown) {
    	a.b();
    } // Error: a is of type `unknown`

    function foo(arg: unknown): void {
    	if (typeof arg === "string") {
    		arg.toString();
    	}
    	arg.toString(); // Error: arg is of type `unknown`
    }
    ```

4. `never`

    Some function `never` return a value. The `never` type represents values which are never observed. In a _return_ type, this means that the function throws **an exception** or **terminates execution of the program**. `never` also appears when TypeScript determines there's nothing left in a `union`.

    ```typescript
    function throwException(): never {
    	throw new Error("Something went wrong");
    }

    function fn(x: string | number) {
    	if(typeof x === "string") {
    		// do something
    	} else if (typeof x === "number") {
    		// do something else
    	} else {
    		x: // has type `never`!
    	}
    }
    ```

5. `Function`

    The global type `Function` describes properties like `bind`, `call`, `apply` and others present on all function values in JavaScript. I also has the special property that values of type `Function` can always be called and these calls return `any`.

    ```typescript
    function doSomething(f: Function) {
    	return f(1, 2, 3);
    }
    ```

**Rest Parameters And Arguments**

1. **Rest Parameters**

    Rest Parameter collect multiple arguments into an array.

    ```typescript
    function sum(...numbers: number[]): number {
    	return sum.reduce((a, b) => a + b, 0);
    }

    function concat(...strings: Array<string>): string {
    	return strings.join(" ");
    }

    function makeTuple(num: number, ...rest: [boolean, number]) {
    	return [num, ...rest];
    }
    ```

2. Rest Arguments

    Rest arguments(`Spread Syntax`) expands an array of individual arguments. When using spread, the argument must either be a `tuple` (with specific types and length) or be passed to a `rest parameter`.

    ```typescript
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    arr1.push(...arr2);

    const args = [8, 5];
    const angle = Math.atan2(...args);
    // A spread argument must either have a tuple type or be passed to a rest parameter.
    // Two ways to fixes this:
    // 1. const args = [8, 5] as const;
    // 2. const args: [number, number] = [8, 5];
    ```

**Parameter Destructuring**

Use parameter destructuring to conveniently unpack objects provided as an argument into one or more local variables in the function body.

```typescript
function sum({ a, b, c }: { a: number; b: number; c: number }) {
	console.log(a + b + c);
}
// Using name type
type ABC = { a: number; b: number; c: number };

function sum({ a, b, c }: ABC) {
	console.log(a + b + c);
}
```

**Assignability of Functions**

-   **Return type `void`**

    Contextual typing with a return type of `void` does not force functions to _not_ return something. Which means a contextual function with with a `void` type (type voidFunc = () => void), when implemented, can return _any_ other value, but it will be ignored.

    ```typescript
    // Valid implementation
    type voidFunc = () => void;

    const f1: voidFunc = () => {
    	return true;
    }

    const f2: voidFunc = () => true;

    const f3: voidFunc = function() {
    	return true;
    }

    // In-valid implementation
    function f1(): void {
    	return true;
    	// @ts-expect-error
    }

    function f2 = function(): void {
    	// @ts-expect-error
    	return true;
    }
    ```

**List of Function Signatures**

1. **Call Signature:** Defines the arguments and return type of a function.

2. Construct Signature: Defines the signature for a constructor function (used with new).

3. **Overload Signature:** Defines multiple possible signatures for a function.

4. **Implementation Signature:** The actual implementation of a function that adheres to one of the overload or call signatures.

5. **Function Signature:** A general term for a function's signature (could be a call or method signature).

6. **Method Signature:** A call signature for methods within an object or class.

**Objects (readonly properties)**

Properties can also be marked as `readonly` for TypeScript. While it won't change any behavior at runtime, a property marked as `readonly` can't be written to during type-checking. Using mapping modifiers you can remove `reaonly` attributes.

```typescript
interface Person {
	name: string;
	age: string;
}

interface ReadonlyPerson {
	readonly name: string;
	readonly age: number;
}

let writablePerson: Person = {
	name: "Person McPersonface",
	age: 42
};

let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // 42
writablePerson.age++;
console.log(readonlyPerson.age); // 43
```

**Index Signature**

Sometimes you don't know all the names of the type's properties ahead of time, but you do know the shap of the values. In those cases, you can use an index signature to describe the types of possible values.

```typescript
interface StringArray {
	[index: number]: string;
}

const myArray: StringArray = ["a", "b", "c"];
```

It is also possible to support multiple types of indexers. But when using both `number` and `string` indexers, the type returned from a numeric indexer must be a subtype of the type returned from the string indexer.

```typescript
interface Animal {
	name: string;
}
interface Dog extends Animal {
	breed: string;
}
interface NotOkay {
	// ok
	[x: string]: Animal;
	[x: number]: Dog;
	// ok
	[x: string]: Dog;
	[x: number]: Dog;
	// not ok
	[x: string]: Dog;
	[x: number]: Animal;
}
```

We can also have readonly index signatures to prevent assignment to their indices.

```typescript
interface ReadonlyStringArray {
	readonly [index: number]: string;
}

declare const getReadOnlyStringArray: () => ReadonlyStringArray;

let myArray: ReadonlyStringArray = getReadOnlyStringArray();

myArray[2] = "Mallory";
//Index signature in type 'ReadonlyStringArray' only permits reading.
```

**Excess Property Checking**

Where and how an object is assigned a type can make a difference in the type system. One of the case is in `excess property checking`, which validates the object more throughly when it is created and assigned to an object type during creation.

```typescript
interface SqureOptions {
	color?: string;
	width?: number;
}

function createSquare(config: SquareOptions): { color: string; width: number} {
	return {
		color: config.color || "red";
		width: config.width ? config.width * config.width : 20;
	}
}

let mySquare = createSquare({ colour: "red", width: 100});
// Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?

/*	To fixes that:

	1. let mySquare = createSquare({colour: "red", width: 100} as SquareConfig);

	2. put [propName: string]: unknown; in SquareOptions

	3. let options = { colour: "red", width: 200 };
	   let mySquare = createSquare(options);
	   (note: options has to have properties in common with type 'SquareConfig'.)
*/
```

**Extending Types**

```typescript
interface Colorful {
	color: string;
}

interface Circle {
	radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

let cc: ColorfulCircle = {
	color: "red",
	radius: 42
};
```

**Intersection Types**

Interfaces allowed us to build up new types from other types by extending them. TypeScript provides another construct called `intersection` types that is mainly used to combine existing object types.

```typescript
interface Colorful {
	color: string;
}
interface Circle {
	radius: number;
}
type ColorfulCircle = Colorful & Circle;

function draw(circle: Colorful & Circle) {
	console.log(`Color was ${circle.color}.`);
	console.log(`Radius was ${circle.radius}.`);
}
// okay
draw({ color: "red", radius: 42 });
// not okay
draw({ colour: "red", radius: 42 });
// Object literal may only specify known properties, but 'raidus' does not exist in type 'Colorful & Circle'. Did you mean to write 'radius'?
```

**Interface Extension Vs. Intersection**

We just looked at two ways to combine types which are similar, but are actually subtly different. The principle difference between the two is how conflicts are handled, and that difference is typically one of the main reasons why you'd pick one over the other between an interface and a type alias of an intersection type.

```typescript
interface Person {
	name: string;
}
interface Person {
	name: string;
} // throw an error

interface Person1 {
	name: string;
}

interface Person2 {
	name: number;
}

type Staff = Person1 & Person2;

declare const staffer: Staff;

staffer.name; // name: never
```

**Generic Object Types**

We can make a `generic` Box type which declares a type parameter.

```typescript
interface Box<Type> {
	contents: Type;
}

function setContents<Type>(box: Box<Type>, newContents: Type) {
	box.contents = newContents;
}
```

Type aliases can also be generic.

```typescript
type Box<Type> = {
	contents: Type;
};

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;

type OneOrManyOrNullString = OneOrManyOrNull<string>;
```

**Array**

Whenever we write out types like number[] or string[], that's really just a shorthand for Array<number> and Array<string>.

```typescript
function doSomething(value: Array<string>) {
	// do something
}

let myArray: string[] = ["hello", "world"];

// either of these work!
doSomething(myArray);
doSomething(new Array("Hello", "World"));

// Array generic type sample

interface Array<Type> {
	/**
	 * Gets or sets the length of the array.
	 */
	length: number;

	/**
	 * Removes the last element from an array and returns it.
	 */
	pop(): Type | undefined;

	/**
	 * Appends new elements to an array, and returns the new length of the array.
	 */
	push(...items: Type[]): number;
}
```

**Readonly Array**

The ReadonlyArray is a special type that describes arrays that shouldn't be changed.

```typescript
function doStuff(values: ReadonlyArray<string>) {
	// We can read from 'values'..
	const copy = values.slice();
	console.log(`The frist values is ${values[0]}`);

	// ...but we can't mutate 'values'.
	values.push("hello!");
	// Property 'push' does not exist on type 'readonly string[]'
}

const roArray1: ReadonlyArray<string> = ["red", "green", "blue"] as const;

let x: readonly string[] = [];
let y: string[] = [];

x = y;
y = x;
// The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.
```

**Tuple Types**

A tuple types is another sort of `Array` type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.

```typescript
type StringNumberPair = [string, number?];

function doSomething(stringHash: [string, number]) {
	const [inputString, hash] = startingHash;
}

interface StringNumber {
	length: number;
	0: string;
	1: number;

	// Other 'Array<string | number>' members...
	slice(start?: number, end?: number): Array<string | number>;
}

type StringNumberBoolean = [string, number, ...boolean[]];
type StringBooleanNumber = [string, ...boolean[], number]; // rest element must the last in tuple type
type BooleanStringNumber = [...boolean[], string, number]; // rest element must the last in tuple type

function readButtonInput(...args: [string, number, ...string[]]) {
	const [name, version, input] = args;
}
```

**Readonly Tuple Types**

Tuple types have `readonly` variants, and can be specified by sticking a `readonly` modifier in front onf them - just like with array shorthand syntax.

Tuples tend to be created and left un-modified in most code, so annotation types as `readonly` tuples when possible is a good default. Any array literals with `const` assertion will be infered with `readonly` tuple types.

```typescript
function doSomething(pair: readonly [number, string]) {
	// do something
}

let point = [3, 4] as const;

function distanceFromOrigin([x, y]: [number, number]) {
	return Math.sqrt(x ** 2 + y ** 2);
}

distanceFromOrigin(point);
// Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'.
// The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to the mutable type '[number, number]'.
```

**Generic Types**

The type of generic functions is just like those of non-generic functions, with the type parameters listed
first similar to function declaration.

```typescript
function identity<Type>(arg: Type): Type {
	return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;
```

We can also write the generic type as the call signature of an object literal type.

```typescript
function identity<Type>(arg: Type): Type {
	return arg;
}

let myIdentity: { <Type>(arg: Type): Type } = identity;
```

Which leads us to writing our first generic interface.

```typescript
function identity<Type>(arg: Type): Type {
	return arg;
}

// A Generic Function Inside a Non-Generic Interface
interface GenericIdentityFn {
	<Type>(arg: Type): Type;
}

let myIdentity: GenericIdentityFn = identity;
```

If we want the other member of the interface to be able to use our `Type`, you can move the generic parameter to be a parameter of the whole interface.

```typescript
function identity<Type>(arg: Type): Type {
	return arg;
}

// A Non-Generic Function Inside a Generic Interface
interface GenericIdentityFn<Type> {
	(arg: Type): Type;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

**Generic Classes**

A generic class has a similar interface to a generic interface. Generic class can you a custom type or interface as the type parameter. Generic parameter apply to only the instance side of a class not the static side because static members are share across all instances of class, while generics are instance-specific.

```typescript
class GenericNumber<NumType> {
	zeroValue: NumType;
	add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
	return x + y;
};

// using custom type or interface as the type parameter

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

let alice = new GenericContainer<Person>({ name: "Alice", age: 20 });
console.log(alice.getValue());

class GenericClass<Type> {
	static staticProperty: Type; // ❌ Error: Generic type 'Type' cannot be used in a static context
}
```

**Using Type Parameters in Generic Constraints**

You can declare a type parameter that is constraint by another type parameter.

```typescript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
	return obj[key];
}

const obj = { a: 1, b: 2, c: 3, d: 4 };

getProperty(obj, "a");
getProperty(obj, "m"); // ❌ Error: Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```

**Using Class Types in Generics**

A class type in generic refers to the constructor function of a class (new (): Type). This pattern is commonly used for dynamic factories(functions that create objects dynamically), dependency injection, and implementing mixins.

```typescript
function create<Type>(c: { new (): Type }): Type {
	return new c();
}

// more advance example using the prototype property to infer and constrain relationships between the constructor function and the instance side of the class type:

class BeeKeeper {
	hasMask: boolean = true;
}

class ZooKeeper {
	nameTag: string = "Mikle";
}

class Animal {
	numLegs: number = 4;
}

class Bee extends Animal {
	numLegs: number = 8;
	beekeeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
	zookeeper: ZooKeeper = new ZooKeeper();
}

function createInstance<Type>(c: { new (): Type }): Type {
	return new c();
}

createInstance(Bee).beekeeper.hasMask;
createInstance(Lion).zookeeper.nameTag;
```

**Generic Parameter Defaults**

By declaring a default for a generic type parameter, you make it optional to specify the corresponding type argument.

```typescript
declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(
	element: T,
	children: U
): Container<T, U[]>;

// with generic parameter defaults
declare function create<
	T extends HTMLElement = HTMLDivElement,
	U extends HTMLElement = T[]
>(element?: T, children?: U): Container<T, U>;

const div = create();
const p = create(new HTMLParagraphElement());
```

**Generic Parameter Defaults**

By declaring a default for a generic type parameter, you make it optional to specify the corresponding type argument.

```typescript
declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(
	element: T,
	children: U
): Container<T, U[]>;

// with generic parameter defaults
declare function create<
	T extends HTMLElement = HTMLDivElement,
	U extends HTMLElement = T[]
>(element?: T, children?: U): Container<T, U>;

const div = create();
const p = create(new HTMLParagraphElement());
```

A generic parameter default follows the following rules:

1. A type parameter is deemed optional if it has a default.
2. Required type parameters must not follow optional type parameters.
3. Default types for a type parameter must satisfy the constraint for the type parameter, if it exists.
4. When specifying type arguments, you are only required to specify type arguments for the required type parameters. Unspecified type parameters will resolve to their default types.
5. If a default type is specified and inference cannot choose a candidate, the default type is inferred.
6. A class or interface declaration that merges with an existing class or interface declaration may introduce a default for an existing type parameter.
7. A class or interface declaration that merges with an existing class or interface declaration may introduce a new type parameter as long as it specifies a default.

**Keyof Type Operator**

The `keyof` operator takes an object type and produces a string or numeric literal union of its keys. If the type has a `string` or `number` index signature, `keyof` will return thoes types instead. `keyof` types become especially useful when combined with mapped types.

```typescript
type Point = { x: number; y: number };
type P = keyof Point;

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number
//			because JavaScript object keys are always coerced to a string, so obj[0] is always the same as obj["0"]
```

**Typeof Type Operator**

TypeScript adds a `typeof` operator you can use in a type context to refer to the type of a variable or property. For example, let's look at the predefined type `ReturnType<T>` which takes a function type and produce its return type.

```typescript
let s = "hello";
let n: typeof s;

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

// If we try to use ReturnType on a function name, we see an instructive error:
function f(x) {
	return { x: 2, y: 3 };
}
type P = ReturnType<f>;
// 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
type P = ReturnType<typeof f>; // correct
```

**Index Access Types**

We can use an `index access type` to look up a specific property on another type. The indexing type is itself a type, so we can use `keyof`, unions and other types entirely. Another example of indexing an arbitrary type is using `number` to get the type of an array's element.

```typescript
type Person = {
	name: string;
	age: number;
	alive: boolean;
};
type Age = Person["age"];

type I1 = Person["age" | "name"];
type I2 = Person[keyof Person];

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];

const myArray = [
	{ name: "alice", age: 25 },
	{ name: "jake", age: 35 }
];
type Person = (typeof myArray)[number];
type Age = (typeof myArray)[number]["age"]; // or
type Age = Person["age"];
```

**Conditional Types**

Conditional types help describe the relation between types of inputs and outputs.

```typescript
interface Animal {
	live(): void;
}

interface Dog {
	woff(): void;
}

type Example1 = Dog extends Animal ? string : number;
type Example2 = RegExp extends Animal ? number : string;

interface IdLabel {
	id: number;
}
interface NameLabel {
	name: string;
}
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(idOrName: string | number): NameLabel | IdLabel;
function createLabel(idOrName: string | number): NameLabel | IdLabel {
	throw "unimplemented";
}

// with conditional logic
type NameOrId<T extends string | number> = T extends string
	? NameLabel
	: IdLabel;

function createLabel<T extends string | number>(idOrName: T): NameOrId<T> {
	throw "unimplemented";
}

let a = createLabel("typescript");
let b = createLabel(123);
let c = createLabel(Math.random() ? "hello" : 123);
```

**Conditional Type Constraints**

Often, the check in the conditional type will provide us with some new information.

```typescript
type MessageOf<T> = T["message"]; // Error: Type '"message"' cannot be used to index type 'T'.

type MessageOf<T extends { message: unknown }> = T["message"];

interface Email {
	message: string;
}

type EmailMessageContents = MessageOf<Email>;

interface Dog {
	bark(): void;
}

type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

type Flatten<T> = T extends any[] ? T[number] : T;

type Str = Flatten<string[]>;
type Num = Flatten<number>;
```

**Infering Within Conditional Types**

Conditional types provide us with a way to infer from types we compare against in the true branch using the `infer` keyword. When inferring from a type with multiple call signature(such as the type of an overloaded function), inferences are made from the last signature.

```typescript
type Flatten<T> = T extends any[T] ? T[number] : T;
type Flatten<T> = T extends Array<infer Item> ? Item : T;

// extract the return type out from the function type
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
	? Return
	: never;

type Num = GetReturnType<() => number>;
type Str = GetReturnType<(x: string) => string>;
type Bool = GetReturnType<(a: boolean, b: boolean) => boolean[]>;

declare function StringOrNum(x: string): string;
declare function StringOrNum(x: number): number;
declare function StringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof StringOrNum>;
```

**Distributed Conditional Types**

When conditional types act on a generic type, they become distributive when given a `union` type. To avoid that behaviour we can surround each side of the `extends` keyword with square brackets.

```typescript
type ToArray<Type> = Type extends any ? Type[] : never;

type StrrArrOrNumArr = ToArray<string | number>;

type toArray<Type> = [Type] extends [any] ? Type[] : never;

type StrOrNumArr = ToArray<string | number>;
```

**Mapped Types**

A mapped type is a generic type which uses a union of `PropertyKey`s (frequently created via a keyof) to iterate through keys to create a type. There are two modifiers which can be applied during mapping `readonly` and `?`. You can add or remove these modifiers by prefixing them with `+` or `-`. If you don't add a prefix, then `+` is assumed.

```typescript
type OptionFlag<Type> = {
	readonly [Property in keyof Type]?: boolean;
};

type Features = {
	darkMode: () => void;
	newUseProfile: () => void;
};

type FeatureOptions = OptionFlag<Features>;

type CreateMutable<Type> = {
	-readonly [Property in keyof Type]: Type[Property];
};
type UnlockedFeatureOptions = CreateMutable<FeatureOptions>;

type Concrete<Type> = {
	[Property in keyof Type]-?: Type[Property];
};
type ConcreteFeatureOptions = Concrete<UnlockedFeatureOptions>;
```

**Key Mapping via `as`**

In typescript 4.1 and onwards, you can re-map keys in map types with an `as` clause in a mapped type. You can filter out keys by producing `never` via a conditional type. You can mapped over arbitrary unions, not just unions of `string` | `number` | `boolean`, but unions of any type.

```typescript
type MappedTypesWithNewProperties<Type> = {
	[Properties in keyof Type as NewProperties] = Type[Properties];
}

type Getter<Type> = {
	[Property in keyof Type as `get${<Capitalize<string & Property>>}`]: () => Type[Property];
}
interface Person {
	name: string;
	age: number;
	location: string;
}
type LazyPerson = Getter<Person>;

type RemoveKind<Type> = {
	[Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
}
interface Circle = {
	kind: "circle",
	radius: number
}
type KindlessCircle = RemoveKind<Circle>;

type EventConfig<Events extends { kind: string }> = {
	[ E in Event as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
type Config = EventConfig<SquareEvent | CircleEvent>;

type ExtractPII<Type> = {
	[ Property in keyof Type] = Type[Property] extends { pii: true } ? true : false;
}
type DBFields = {
	id: { format: "incrementing" },
	name: { type: string, pii: true}
}
type ObjectNeedingGDPRDeletion = ExtractPII<DBFields>;
```

**Template Literal Types**

When a union is used in the interpolated position, the type is the set of every possible string literal that could be represented by each union member. For each interpolated position in the template literal, the unions are cross multiplied.

```typescript
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocalIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocalIDs}`;
```

**String Union in Types**

```typescript
const passedObject = {
	firstName: "Saoirse",
	lastName: "Ronan",
	age: 26
};

type PropEventSource<Type> = {
	on(
		eventName: `${string & keyof Type}Changed`,
		callback: (newValue: any) => void
	): void;
};

type PropEventSource<Type> = {
	on<Key extends string & keyof Type>(
		eventName: `${Key}Changed`,
		callback: (newValue: Type[Key]) => void
	): void;
};

declare function makeWatchedObject<Type>(
	obj: Type
): Type & PropEventSource<Type>;

const person = makeWatchedObject(passedObject);

person.on("firstNameChanged", () => console.log("Hello World"));
person.on("ageChanged", (age) => console.log(age));
```

**Intrinsic String Manipulation Types**

These types came build-in to the compiler for performance and can't be found in the `.d.ts` fiels included with TypeScript.

```typescript
type greeting = "hello world";

type upperCaseGreeting = Uppercase<greeting>;
type lowerCaseGreeting = Lowercase<upperCaseGreeting>;
type capitalizeGreeting = Capitalize<lowerCaseGreeting>;
type unCapitalizeGreeting = Uncapitalize<upperCaseGreeting>;
```

**Classes**

```typescript
class Point {
	readonly x: number;
	y: number;

	constructor(ab: number | string);
	constructor(a: number, b: number = 0) {
		this.x = a;
		this.y = b;
	}

	scale(n: number): void {
		this.x *= n; // error: Cannot assign to 'x' because it is a read-only property.
		this.y *= n;
	}
}

const pt = new Point();
pt.x = 0;
pt.y = 0;

class Base {
	[s: string]: number | ((s: string) => number);
	k = 4;
}

class Derived extends Base {
	constructor() {
		super();
		console.log(this.k);
	}
}
```

**Class Heritage**

```typescript
interface Pingable {
	ping(): void;
}

class Sonar implements Pingable {
	pong() {
		console.log("pong!"); // error: Class 'Sonar' incorrectly implements interface 'Pingable'.
		// Property 'ping' is missing in type 'Sonar' but required in type 'Pingable'.
	}
}
// extends clause
class Animal {
	move() {
		console.log("Moving, along!");
	}
}

class Dog extends Animal {
	woff(n: number) {
		for (let i = 0; i < n; i++) {
			console.log("woff!");
		}
	}
}
const d = new Dog();
d.move();
d.woff(5);
// overriding methods
class Base {
	greet() {
		console.log("Hello, world");
	}
}
class Derived extends Base {
	// have to make name optional, to follow Base class contract
	greet(name?: string) {
		if (name === undefined) {
			super.greet();
		} else {
			console.log(`Hello, ${name.toUpperCase()}`);
		}
	}
}
const d = new Derived();
d.greet(); // Hello, world!
d.greet("Krishna"); // Hello, KRISHNA

const b: Base = d; // ok: It's very common(and always legal) to refer to a derived class instance through a base class reference
b.greet();
```

**Type-Only Field Declaration**

When `target >= es2022` or `useDefineForClassFields` is set to true:

```typescript
interface Animal {
	dateOfBirth: any;
}

interface Dog {
	breed: any;
}

class AnimalHouse {
	resident: Animal;
	constructor(animal: Animal) {
		this.resident = animal;
	}
}

class DogHouse extends AnimalHouse {
	declare resident: Dog;
	constructor(dog: Dog) {
		super(dog);
	}
}

const newDog = new Dog();
const newDogHouse = new DogHouse(newDog);
newDogHouse.resident.breed;
newDogHouse.resident.dateOfBirth;
```

**Member Visibility Modifiers**

-   public
-   protected
-   private
-   hard private(`#`)

**public**

Public is default visibility modifier.

```typescript
class Greeter {
	public greet() {
		console.log("hello, world!");
	}
}

const greeting = new Greeter();
greeting.greet();
```

**protected**

protected members are only visible to subclasses of the class they are declared in.

```typescript
class Greeter {
	protected getName() {
		return "hi!";
	}
}
class SpecialGreeter extends Greeter {
	howdy() {
		return `Howdy, ${this.getName()}`;
	}
}
const g = new SpecialGreet();
g.howdy();
g.getName(); // error: Property 'getName' is protected and only accessible within class 'Greeter' and its subclasses.

// Exposure of protected member in subclasses
class SpecialGreeter extends Greeter {
	getName() {
		return `hi`;
	}
}

// Cross-hierarchy protected access (TypeScript doesn't allow)

class Base {
	protected x = 3;
}
class Derived1 extends Base {
	protected x = 5;
}
class Derived2 extends Base {
	f1(other: Derived2) {
		other.x;
	}
	f2(other: Derived1) {
		other.x; // error: Property 'x' is protected and only accessible within class 'Derived1' and its subclasses.
	}
}
```

**private**

`private` is like `protected`, but does not allow access to the member even from subclasses. `private` also allows access using bracket notation during type checking;

```typescript
class Base {
	private x = 5;
}
const d = new Base();
d.x; // error: Can't access from outside the class
d["x"]; // no error

class Derived extends Base {
	showX() {
		console.log(this.x); // error: Property 'x' is private and only accessible within class 'Base'.
	}
}

// Cross-instance private access (TypeScript allow)

class A {
	private: x = 3;
	public sameAs(other: A) {
		// no error
		return (this.x = other.x);
	}
}
```

**hard private**

Unlike TypeScript's `private`, JavaScript's private field(`#`) remain private after compilation and do not provide escape hatches like `bracket notation` access.

```typescript
class Dog {
	#barkAmount = 3;
	personality = "happy";
	constructor() {}
}
```

**Static Members**

`static` members aren't associated with a particular instance of the class. `static` members can also use the same `public`, `protected` and `private` visibility modifiers. `static` members are also inherited. Since, Classes are themselves functions that can be invoked with `new`, Function properties like `name`, `length` and `call` are not valid to define as `static` members.

```typescript
class MyClass {
	private static y = 5;
	static x = 3;
	static printX() {
		console.log(MyClass.y);
		console.log(MyClass.x);
	}
}
MyClass.x;
MyClass.y; // error: Property 'x' is private and only accessible within class 'MyClass'.
MyClass.printX();

class Base {
	public static getGreeting() {
		return "Hello, World!";
	}
}
class Derived extends Base {
	myGreeting = Derived.getGreeting();
}
```

**Static Block in Classes**

Static block allows you to write a sequence of statements with their own scope that can access private fields within the containing class.

```typescript
class Foo {
	static #count = 0;
	get count() {
		return this.#count;
	}

	static {
		try {
			const instances = loadLastInstances();
			Foo.#count += instances.length;
		} catch {}
	}
}
```

**Generic Classes**

Classes, much like interfaces, can be generic. They can also use generic constraints. Static member cannot reference class type parameter.

```typescript
class Box<Type> {
	contents: Type;
	static defaultValue: Type; // error: Static members cannot reference class type parameters.
	constructor(value: Type) {
		this.contents = value;
	}
}
```

**this at Runtime in Classes (arrow function)**

If you have a function that will often be called in a way that loses its `this` context, you can use an array function property instead of a method definition.

```typescript
class MyClass {
	name = "Krishna";
	getName = () => {
		return this.name;
	};
}
```

This has some trade-offs:

1. The `this` value is guaranteed to be correct at runtime, even for code not checked with TypeScript.
2. This will use more memory, because each class instance will have its own copy of each function defined this way
3. You can't use super.getName() in a derived class, because there is no entry in the prototype chain to fetch the base class method from.

**this parameter**

In a method or function definition, the initial parameter named `this` has special meaning in TypeScript.

```typescript
class MyClass {
	name = "Krishna";
	getName(this: MyClass) {
		return this.name;
	}
}

const c = new MyClass();
const g = c.getName;
g(); // error: The 'this' context of type 'void' is not assignable to method's 'this' of type 'MyClass'.
```

This method makes the opposite trade-offs of the arrow function approach:

1. JavaScript callers might still use the class method incorrectly without realizing it
2. Only one function per class definition gets allocated, rather than one per class instance
3. Base method definition can still be called via `super`.

**this Types**

In classes, a special type called `this` refers dynamically to the type of the current class. If the sameAs method were defined as sameAs(other: Box), it would accept any instance of Box or its derived classes. If the sameAs metod were defined as sameAs(other: this), it only accept parameter that are instances of the same class or its derived version.

```typescript
class Box {
	contents: string = "";
	set(value: string) {
		this.contents = value;
		return this;
	}
}
class ClearableBox extends Box {
	clear() {
		this.contents = "";
	}
}

const a = new ClearableBox();
const b = a.set("hello");
// const b: ClearableBox

// using this in a parameter type annotation
class Box {
	content: string = "";
	sameAs(other: this) {
		return other.content === this.content;
	}
}
```

**this -based type guards**

You can use `this is Type` in the return position for methods in classes and interfaces. When mixed with a type narrowing (e.g. `if` statements) the type of the target object would be narrowed to the specified `Type`.

```typescript
class Box<T> {
	value?: T;

	hasValue(): this is { value: T } {
		return this.value !=== undefined;
	}
}

const box = new Box<string>();
box.value = "Gameboy";
box.value;
  // (property) Box<string>.value?: string
if(box.hasValue()) {
	box.value;
       // (property) value: string
}
```

**Parameter Properties**

TypeScript offers special syntax for turning a constructor parameter into a class property with the same name and value.

```typescript
class Params {
	constructor(
		public readonly x: number,
		protected y: number,
		private z: number
	);
}

const a = new Params(1, 2, 3);
console.log(a.x); // (property) Params.x: number
console.log(a.z); // error: Property 'z' is private and only accessible within class 'Params'.
```

**Class Expressions**

Class expressions are very similar to class declarations. The only difference is that class expressions don't need a name, though we can refer to them via whatever identifier they ended up bound to.

```typescript
const someClass = class<Type> {
	content: Type;
	constructor(value: Type) {
		this.content = value;
	}
};
const m = new someClass("Hello, world"); // const m: someClass<string>
```

**Constructor Signatures**

JavaScript classes are instantiated with the `new` operator. Given the type of a class itself, the `InstanceType` utility type models this operation.

```typescript
class Point {
	createdAt: number;
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.createdAt = new Date.now();
		this.x = x;
		this.y = y;
	}
}

type PointInstance = InstanceType<typeof Point>;

function moveRight(point: PointInstance) {
	point.x += 5;
}
const p = new Point(3, 4);
moveRight(point);
point.x; // => 8
```

**abstract Classes and Members**

Classes, methods, and fields in TypeScript may be abstract. The role of abstract classes is to serve as a base class for subclasses which do implement all the abstract members. If we forget to implement the base class’s abstract members in our subclasses, we’ll get an error.

```typescript
abstract class Base {
	abstract getName(): string;

	printName() {
		console.log("Hello, " + this.getName());
	}
}
const b = new Base(); // error: Cannot create an instance of an abstract class.

class Derived extends Base {
	getName() {
		return "world";
	}
}
const d = new Derived();
d.printName();
```

**Abstract Construct Signatures**

Sometimes you want to accept some class constructor function that produces an instance of a class which derives from some abstract class.

```typescript
function greet(ctor: typeof Base) {
	const instance = new ctor(); // error: Cannot create an instance of an abstract class.
	instance.printName();
}

// Ok
function greet(ctor: new () => Base);
```

**Relationships Between Classes**

In most cases, classes in TypeScript are compared structurally, the same as other types. Empty classes have no members. In a structural type system, a type with no members is generally a supertype of anything else.

```typescript
class Point1 {
	x = 0;
	y = 0;
}
class Point2 {
	x = 0;
	y = 0;
}
const p: Point1 = new Point2();

class Empty {}
function fn(x: Empty) {
	// can't do anything with 'x', so I won't
}
// All Ok
fn(window);
fn({});
fn(fn);
```

**Modules**

In TypeScript, just as in ECMAScript 2015, any file containing a top-level `import` or `export` is considered a module. Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope(and therefore to modules as well). modules are executed within their own scope, not in the global scope.

The JavaScript specification declares that any JavaScript files without an `import` declaration, `export`, or top-level `await` should be considered a script and not a module.

Inside a script file variables and types are declared to be in the shared global scope, and it's assumed that you'll either use the `outFile` compiler option to join multiple files into one output file, or use multiple `<script>` tags in your HTML to load these files(in the correct order!).

If you have a file that doesn't currently have any `import` s or `export` s, but you want to be treated as a module, add the line: `export {};`. This will change the file to be a module exporting nothing. This syntax works regardless of your module target.

**Utilities Types**

1.  `Awaited<Type>`

    This type is meant to model operations like `await` in async function, or the `.then()` method on `Promise`s.

    ```typescript
    type A = Awaited<Promise<string>>;
    type B = Awaited<Promise<Promise<number>>>;
    type C = Awaited<boolean | Promise<number>>;
    ```

2.  `Partial<Type>`

    Constructor a type with all properties of `Type` set to optional.

    ```typescript
    interface Todo {
    	title: string;
    	description: string;
    }
    function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    	return { ...todo, ...fieldsToUpdate };
    }
    ```

3.  `Required<Type>`

    Construct a type consisting of all the properties of `Type` set to required.

    ```typescript
    interface Prop {
    	a?: number;
    	b?: string;
    }
    const obj: Prop = { a: 5 };
    const obj2: Required<Prop> = { a: 5 };
    ```

4.  `Readonly<Type>`

    Construct a type with all properties of `Type` set to readonly. This utility is useful for representing assignment expressions that will fail at runtime.

    ```typescript
    interface Todo {
    	title: string;
    }
    const todo: Readonly<Todo> = {
    	title: "Delete inactive users";
    }
    todo.title = "Hello, world!"; // error: annot assign to 'title' because it is a read-only property.
    ```

5.  `Record<Keys, Type>`

    Construct an object type whose property keys are `Keys` and whose property values are `Type`.

    ```typescript
    type CatName = "miffy" | "boris" | "mordred";
    type CatInfo = {
    	age: number;
    	breed: string;
    };
    const cats: Record<CatName, CatInfo> = {
    	miffy: { age: 3, breed: "Persian" },
    	boris: { age: 4, breed: "Maine Coon" },
    	mordred: { age: 5, breed: "British Shorthair" }
    };
    cats.miffy;
    // const cats: Record<CatName, CatInfo>
    ```

6.  `Pick<Type, Keys>`

    Construct a type by picking a set of properties `Keys` (string literals or union of string literals) from `Type`.

    ```typescript
    interface Todo {
    	title: string;
    	description: string;
    	completed: boolean;
    }
    type TodoPreview = Pick<Todo, "title" | "completed">;
    const todo: TodoPreview = {
    	title: "Delete inactive users",
    	completed: true;
    }
    ```

7.  `Omit<Type, Keys>`

    Construct a type by picking all properites from `Type` and then removing `Keys` (string literal or union of string literals).

    ```typescript
    interface Todo {
    	title: string;
    	description: string;
    	completed: boolean;
    	createdAt: number;
    }
    type TodoPreview = Omit<Todo, "completed" | "createdAt">;
    const todo: TodoPreview = {
    	title: "Delete all users",
    	description: "To delete all users"
    };
    ```

8.  `Exclude<UnionType, ExcludedMembers>`

    Construct a type by excluding from `UnionType` all union members that are assignable to `ExcludedMembers`.

    ```typescript
    type T0 = Exclude<"a" | "b" | "c", "a" | "b">;
    type T1 = Exclude<"a" | "b" | (() => void), Function>;
    type Shape =
    	| { kind: "circle"; radius: number }
    	| { kind: "square"; x: number; y: number }
    	| { kind: "traingle"; x: number };
    type T2 = Exclude<Shape, { kind: "circle" }>;
    ```

9.  `Extract<Type, Union>`

    Construct a type by extracting from `Type` all union members that are assignable to `Union` member.

    ```typescript
    type T0 = Extract<"a" | "b" | "c", "a", "f">;
    type T1 = Extract<"a" | "b" | (() => void), Function>;
    type T2 = Extract<Shape, { kind: "circle" }>;
    ```

10. `NonNullable<Type>`

    Construct a type by excluding `null` and `undefined` from `Type`.

    ```typescript
    type T0 = NonNullable<string | number | undefined>;
    type T1 = NonNullable<string[] | undefined | null>;
    ```

11. `Parameters<Type>`

    Construct a tuple type from the types used in the parameter of a function type `Type`.

    ```typescript
    declare function f1(arg: { a: number; b: number }): void;
    type T0 = Parameters<() => void>;
    type T1 = Parameters<(s: string) => void>;
    type T2 = Parameters<<T>(s: T) => T>;
    type T3 = Parameters<typeof f1>;
    type T4 = Parameters<any>;
    type T5 = Parameters<never>;
    type T6 = Parameters<string>; // error: Type 'string' does not satisfy the constraint '(...args: any) => any'.
    type T7 = Parameters<Function>; // error:Type 'Function' does not satisfy the constraint '(...args: any) => any'.
    ```

12. `ConstructorParameters<Type>`

    Construct a tuple or array type from the types of a constructor function type.

    ```typescript
    type T0 = ConstructorParameters<ErrorConstructor>;
    type T1 = ConstructorParameters<FunctionConstructor>;
    type T2 = ConstructorParameters<RegExpConstructor>;
    class C {
    	constructor(a: number, b: number) {}
    }
    type T3 = ConstructorParameters<typeof C>;
    type T4 = constructorParameters<any>;
    type T5 = constructorParameters<Function>; // error: Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
    ```

13. `ReturnType<Type>`

    Construct a type consisting of the return type of function `Type`.

    ```typescript
    declare function f1(): { a: number; b: number };
    type T0 = ReturnType<() => string>;
    type T1 = ReturnType<(s: string) => void>;
    type T2 = ReturnType<<T>(s: T) => T>;
    type T3 = ReturnType<<T extends U, U extends number[]>() => T>;
    type T4 = ReturnType<typeof f1>;
    type T5 = ReturnType<any>;
    type T6 = ReturnType<never>;
    type T7 = ReturnType<string>; // error: Type 'string' does not satisfy the constraint '(...args: any) => any'.
    type T8 = ReturnType<Function>; // error: Type 'Function' does not satisfy the constraint '(...args: any) => any'.
    ```

14. `InstanceType<Type>`

    Construct a type consisting of the instance type of a constructor function in `Type`.

    ```typescript
    class C {
    	x: number = 0;
    	y: number = 0;
    }
    type T0 = InstanceType<typeof C>;
    type T1 = InstanceType<any>;
    type T2 = InstanceType<never>;
    type T3 = InstanceType<string>; // error: Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'.
    type T4 = InstanceType<Function>; // error: Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
    ```

15. `NoInfer<Type>`

    Block inference to the contained type. With `NoInfer<C>`, TypeScript prevents `defaultColor` from contrubuting to the inference of `C`.

    ```typescript
    function createStreetLigh<C extends string>(
    	colors: C[],
    	defaultColor: NoInfer<C>
    ) {
    	// do something here
    }
    createStreetLigh(["red", "green", "blue"], "red"); // Ok
    createStreetLight(["red", "green", "blue"], "grey"); // error: Argument of type '"gray"' is not assignable to parameter of type '"red" | "yellow" | "green"'.
    ```

16. `ThisParameterType<Type>`

    Extract the type of the `this` parameter from a function or `unknown` if the function type has no `this` parameter.

    ```typescript
    function toHex(this: Number) {
    	return this.toString(16);
    }
    function numberToString(n: ThisParameterType<typeof toHex>) {
    	return toHex.apply(n);
    }
    ```

17. `OmitThisParameter<Type>`

    Remove the `this` parameter form `Type`. If `Type` has not explicitly declared `this` parameter, the result is simply `Type`.

    ```typescript
    function toHex(this: Number) {
    	return this.toString(16);
    }
    const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
    console.log(fiveToHex());
    ```

18. `ThisType<Type>`

        This utility does not return a transformed type. Instead it serves as a marker for a contextual `this` type. Note that the `noImplicitThis` flag must be enable to use this utility.

        ```typescript
        type ObjectDescriptor<D, M> = {
        	data?: D;
        	method?: M & ThisType<D & M>;
        };

        function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
        	let data: object = desc.data || {};
        	let method: object = desc.method || {};
        	return { ...data, ...method } as D & M;
        }

        let obj = makeObject({
        	data: { x: 0, y: 0 },
        	method: {
        		moveBy(dx: number, dy: number) {
        			this.x += dx;
        			this.y += dy;
        		}
        	}
        });

        obj.x = 10;
        obj.y = 20;
        obj.moveBy(5, 5);
        ```

**Numeric Enums**

    Enums without initializers either need to be first, have to come after numeric enum initialized with numeric constant or other constant enum members.

```typescript
enum Direction {
	Up = 1,
	Down,
	Left,
	Right
}
// isn't allowed
enum E {
	A = getSomeValue(),
	B // error: Enum member must have initializer.
}
```

**String Enums**

In a string `enum` each much has to be constant-initialized with a string literal, or with another string `enum` member.

```typescript
enum Direction {
	Up = "UP",
	Down = "DOWN",
	Left = "LEFT",
	Right = "RIGHT"
}
```

**Heterogeneous Enums**

Enums can be mixed with string and numberic number.

```typescript
enum BooleanLikeHeterogeneousEnum {
	No = 0,
	Yes = "YES"
}
```

**Costant Members**

Constant members are easy to compute at compile time and implict or explicitly defined with simple math or other constants.

```typescript
enum FileAccess {
	None,
	Read = 1 << 1,
	Write = 1 << 2,
	ReadWrite = Read | Write
}
```

**Computed Members**

Computed members are values that cannot be evaluated in the compile time.

```typescript
enum FileAccess {
	G = "123".length
}
```

**Union Enums and Enum Member Types**

A literal enum member is a constant enum member with no initialized value, or with values that are initialized to:

-   any string literal(e.g. "foo", "bar", "baz"),
-   any numeric literal(e.g. 1, 100),
-   a unary minus applied to any numeric literal(e.g. -1, -100).

When all members in an enum have literal enum values,

1.  enum members also become types as well.

    ```typescript
    enum ShapeKind {
    	Cirlce,
    	Square
    }
    interface Circle {
    	kind: ShapeKind.Circle;
    	radius: number;
    }
    interface Square {
    	kind: ShapeKind.Square;
    	sideLength: number;
    }
    let c: Cirlc {
    	kind: ShapeKind.Square, // erro: Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
    	radius: 100,
    }
    ```

2.  enum types themselves effectively become a union of each enum member.

        ```typescript
        enum E {
        	Foo,
        	Bar
        }
        function f(x: E) {
        	if (x !== E.Foo || x !== E.Bar) {
        		// error: This comparison appears to be unintentional because the types 'E.Foo' and 'E.Bar' have no overlap.
        	}
        }
        ```

    In the above example, we first check whether `x` was not `E.Foo`. If that succeeds, then our `||` will short-circuit, and the body of the `if` will run. However, if the check did not succeed, then `x` can only be `E.Foo`, so it doesn't make sense to see whether it's not equal to `E.Bar`.

**Enum at runtime**

Enums are real objects that exist at runtime.

```typescript
enum E {
	X,
	Y,
	Z
}
function f(obj: { X: number }) {
	return obj.X;
}
f(E); // Work since E has a property name X and it's a number
```

**Enum at compile time**

Even though Enums are real objects that exist at runtime, the `keyof` keyword works differently. Use `keyof typeof` to get a `Type` that represents all Enum keys as strings.

```typescript
enum LogLevel {
	ERROR,
	WARN,
	INFO,
	DEBUG
}
/**
 * This is equivalent to:
 * type LogLevelString = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelString = keyof typeof LogLevel;

function printImportant(key: LogLevelString, message: string) {
	const num = LogLevel[key];
	if (num <= LogLevel.WARN) {
		console.log("Log level key is ", key);
		console.log("Log level value is ", num);
		console.log("message is ", message);
	}
}
printImportant("ERROR", "This is a message");
```

**Reverse Mapping**

In addition to creating an object with property names for member, numeric enum members also get a reverse mapping from enum values to enum names. String enum members do not get a reverse mapping generated at all.

```typescript
enum Enum {
	A
}
let a = Enum.A;
let nameOfA = Enum[a]; // or Enum[0]
```

**const enums**

`const enum`s are an optimization feature in TypeScript. They replace `enum` references with literal values at compile time. This result in smaller, faster code but limits the flexibility of enums(e.g. no computed member, only constant members).

```typescript
const enum Direction {
	Up,
	Down,
	Left,
	Right
}
let direction = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
// in generated code will become
("use strict");
let directions = [
	0, // Direction.Up
	1, // Direction.Down
	2, // Direction.Left
	3 // Direction.Right
];
```

**Ambient Enum**

Ambient enums are used to describe the shape of already existing enum type.

```typescript
declare enum Enum {
	A = 1,
	B,
	C = 2
}
```

**Object vs Enums**

In modern TypeScript, you may not need an Enum when an object with `as const` could suffice.

```typescript
const enum EDirection {
	Up,
	Down,
	Left,
	Right
}
const ODirection = {
	Up: 0,
	Down: 1,
	Left: 2,
	Right: 3
};

// using the enum as a parameter
function walk(dir: EDirection) {}

// it's require an extra line to pull out the values
type Direction = (typeof ODirection)[keyof typeof ODirection];
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Left);
```
