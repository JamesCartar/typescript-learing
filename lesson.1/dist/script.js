"use strict";
class UserAccount {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    getUser() {
        return { id: this.id, name: this.name };
    }
    updateUser(user) {
        this.id = user.id;
        this.name = user.name;
    }
}
const user = new UserAccount(1, "Murphy");
function getLength(obj) {
    return obj.length;
}
function wrapInArray(obj) {
    if (typeof obj === "string") {
        return [obj];
    }
    return obj;
}
backpack.add("32");
const object = backpack.get();
function logPoint(p) {
    console.log(`${p.x}, ${p.y}`);
}
const point = { x: 12, y: 26 };
logPoint(point);
