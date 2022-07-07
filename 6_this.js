//explain this keyword
//this is a reference to an object, like fruits in bucket

this.a = 5; //in global there is an a
console.log(this);

//
this.a = 5;
function getParam() {
  console.log(this.a); //still targeting the window object
}

getParam();

//
this.a = 5;
const getParam = () => {
  console.log(this.a); //still targeting the window object, but normally it takes from outer normal function
};

getParam();

//
let user = {
  name: "Mike",
  age: 34,
  getDetails() {
    console.log(this.name);
  },
};

user.getDetails(); //Mike, targeting to its parent object

//what if
let user = {
  name: "Mike",
  age: 34,
  childObj: {
    newName: "Roadside Coder",
    getDetails() {
      console.log(this.newName, "and", this.name);
    },
  },
};

user.childObj.getDetails(); //Roadside Coder and undefined, pointing to childObj not parent object

//
let user = {
  name: "Mike",
  age: 34,
  getDetails: () => {
    console.log(this.name);
  },
};

user.getDetails(); //get nothing, it's pointing to window

//only way to make it happens
let user = {
  name: "Mike",
  age: 34,
  getDetails() {
    const nestedArrow = () => console.log(this.name); //the value of this will be user now, it takes the value from its parent function (normal)
    nestedArrow();
  },
};

user.getDetails();

//in constructor
class user {
  constructor(n) {
    this.name = n;
  }

  getName() {
    console.log(this.name); //point to everything in the constructor
  }
}

const User = new user("Mike");

User.getName(); // Mike

//9:21
//https://www.youtube.com/watch?v=rv7Q11KWmKU

//Q1 - What is the output?
const user = {
  firstName: "Mike",
  getName() {
    const firstName = "Mike Chen";
    return this.firstName; //its pointing to outer object user, not this function
  },
};

console.log(user.getName()); //Mike

//Q2 - What is the result of accessing its ref? why?

function makeUser() {
  return {
    name: "John",
    ref: this,
  };
}

let user = makeUser(); //because we are calling makeUser over here, the parent is the window object

console.log(user.ref.name); //result? nothing, ref is pointing to window

//how to fix this
function makeUser() {
  return {
    name: "John",
    ref() {
      return this; //pointing to this object
    },
  };
}

let user = makeUser();
console.log(user.ref().name);

//Q3
const user = {
  name: "Mike Chen!",
  logMessage() {
    console.log(this.name); //what is logged?
  },
};
setTimeout(user.logMessage, 1000); // undefine
//settimeout is using user.logMessage as a callback rather than a method
//this complete function right here will be copied inside this set timeout
//it will no longer has access to the user object

//fix
//avoid callback and wrap as a functioin
setTimeout(function () {
  user.logMessage;
}, 1000);

//Q4
const user = {
  name: "Mike",
  greet() {
    return `Hello, ${this.name}!`;
  },
  farewell: () => {
    return `Goodbye, ${this.name}!`;
  },
};
console.log(user.greet()); //? ok
console.log(user.farewell()); //? undefined, because of arrow

//Q5 - create an object calculator
let calculator = {
  read() {
    this.a = +prompt("a = ", 0); //+ is to convert it into number
    this.b = +prompt("b = ", 0);
  },

  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  },
};

calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());

//Q6

var length = 4;
function callback() {
  console.log(this.length); //?
}

const object = {
  length: 5,
  method(fn) {
    fn(); //targeting global object, since its calling here
  },
};

object.method(callback); //4

//modified question *** very tricky
var length = 4;
function callback() {
  console.log(this.length); //?
}

const object = {
  length: 5,
  method() {
    // arguments = [callback, 2, 3], callback's parent object is the array here, length of this array is 3
    arguments[0](); //first element is the callback, output? array itself is an object
  },
};

object.method(callback, 2, 3); //printing 3

//Q7 - implement calc
//refer to class 24 video
const calc = {
  total: 0,
  add(a) {
    this.total += a;
    return this;
  },
  multiply(a) {
    this.total *= a;
    return this;
  },
  substract(a) {
    this.total -= a;
    return this;
  },
};

const result = calc.add(10).multiply(5).substract(30).add(10);
console.log(result.total);
