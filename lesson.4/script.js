function doSomething(obj) {
    // We can read from 'obj.prop'
    console.log("prop has the value ".concat(obj.prop));
    // But we can't re-assign it.
    obj.prop = "hello";
}
function visitForBirthday(home) {
    // We can read and update properties from 'home.resident'
    console.log("Happy birthday ".concat(home.resident.name, "!"));
    home.resident.age++;
}
function evict(home) {
    home.resident = {
    // ....
    };
}
var writablePerson = {
    name: "Person McPersonface",
    age: 42
};
var readOnlyPerson = writablePerson;
console.log(readOnlyPerson.age);
writablePerson.age++;
console.log(readOnlyPerson.age);
var myArray = getStringArray();
var secondItem = myArray[1];
var myArray1 = getReadOnlyStringArray();
myArray1[2] = "Mallory";
function createSquare(config) {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20
    };
}
var mySquare = createSquare({ colour: "red", width: 100 });
var mySquare1 = createSquare({ colour: "red", width: 100 });
var squareOptions = { colour: "red", width: 200 };
var mySquare2 = createSquare(squareOptions);
var cc = {
    color: "red",
    radius: 42
};
staffer.name;
function setContents(box, newContents) {
    box.contents = newContents;
}
// Array type
function doSomething1(value) {
    // do something
}
var myArray11 = ["hello", "world"];
doSomething1(myArray11);
doSomething1(new Array("Hello", "World"));
