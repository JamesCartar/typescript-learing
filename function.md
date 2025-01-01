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
