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
