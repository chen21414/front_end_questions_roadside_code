//closures in js
//lexical scope

var username = "RoadsideCoder";

//global scope
function local() {
  //local scope
  console.log(username); //the outside can be called inside is lexical
}

local();

//

//global scope
function local() {
  //local scope
  var username = "RoadsideCoder";
}
console.log(username); //not working; username is not defined

local();

//

//lexical scope
//global scope
function subscribe() {
  var name = "roadside coder";
  //inner scope 2
  function displayName() {
    //displayName is called a closure
    //inner scope
    alert(name);
  }
  displayName();
}

subscribe();

//A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).
//In other words, a closure gives you access to an outer function's scope from an inner function.
//In JavaScript, closures are created every time a function is created, at function creation time.

function makeFunc() {
  const name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

// const myFunc = makeFunc();
// myFunc();

//can also do this
makeFunc()(); //return displayname and then calling the displayname
//makeFunc() //won't work

//
//global scope
function makeFunc() {
  const name = "Mozilla"; //outer function scope
  function displayName(num) {
    console.log(name, num); //local scope
  }
  return displayName;
}

makeFunc()(5);

//Closure Scope Chain
var username = "Piyush";
function makeFunc() {
  const name = "Mozilla"; //outer function scope
  function displayName(num) {
    console.log(name, num, username); //local scope
  }
  return displayName;
}

makeFunc()(5);

//
// global scope
const e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // log 20
//sum(a)(b)(c)(d)

//recommended to read the rest
// global scope
const e = 10;
function sum(a) {
  return function sum2(b) {
    return function sum3(c) {
      // outer functions scope
      return function sum4(d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

const sum2 = sum(1);
const sum3 = sum2(2);
const sum4 = sum3(3);
const result = sum4(4);
console.log(result); //log 20

//
function outer() {
  const x = 5;
  if (Math.random() > 0.5) {
    const y = 6;
    return () => console.log(x, y);
  }
}

outer()(); // logs 5 6

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

//Q1: what will be logged to console?
let count = 0;
(function printCount() {
  if (count === 0) {
    let count = 1; //shadowing (replacing)
    console.log(count); //1, not affecting outside
  }
  console.log(count); //0
})();

//Q2 write a function that would allow you to do this

function createBase(num) {
  return function (innerNum) {
    console.log(innerNum + num);
  };
}

var addSix = createBase(6); //the default num is 6
addSix(10); //16
addSix(21); //27

//Q3 time optimization
function find(index) {
  let a = [];
  for (let i = 0; i < 100000; i++) {
    a[i] = i * i;
  }
  console.log(a[index]);
}

console.time("6"); //time is just to measure
find(6);
console.timeEnd("6");
console.time("12");
find(12);
console.timeEnd("12");

//optimize:
function find() {
  let a = [];
  for (let i = 0; i < 100000; i++) {
    a[i] = i * i;
  }

  return function (index) {
    console.log(a[index]);
  };
}

const closure = find();
console.time("6"); //0.25ms
closure(6);
console.timeEnd("6");
console.time("12");
closure(12);
console.timeEnd("12"); //0.02587ms

//Q4 - Block scope and setTimeout **

function a() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
      console.log(i); //what is logged?
    }, i * 1000);
  }
}

a();

//how to solve this if cannot use let: closure
for (var i = 0; i < 3; i++) {
  function inner(i) {
    //i is the local variable
    setTimeout(function log() {
      console.log(i); //what is logged?
    }, i * 1000);
  }

  inner(i); //everytime the i is passed to above inner function
  //it's not going to reference that particular memory value,
  //it's created whole different memory space for this function
  //i will be local variable inside of this function
  //rather than taking from outter scope
}

//Q5 how would you use a closure to create a private counter?

function counter() {
  var _counter = 0;

  function add(increment) {
    _counter += increment;
  }

  function retrive() {
    return "Counter = " + _counter;
  }

  return {
    add,
    retrive,
  };
}

const c = counter(); //this has created a new counter
c.add(5); //add 5 to that counter
c.add(10);

console.log(c.retrive()); //15

//Q6: What is Module Pattern? **

var Module = (function () {
  function privateMethod() {
    console.log("private");
  } //private function is not return which make it inaccessible outside namespace

  return {
    publicMethod: function () {
      //a public function we return to the user
      //can call privateMethod();
      console.log("public");
    },
  };
})();

Module.publicMethod(); //public
Module.privateMethod(); //error, because no return

//Q7 make this run only once
let view;
function likeTheVideo() {
  let called = 0;

  return function () {
    if (called > 0) {
      console.log("aldy called");
    } else {
      view = "Roadside coder"; //view is declared outside but initialed inside
      console.log("subscribe to", view);
      called++;
    }
  };
}

let isSubscribed = likeTheVideo();

isSubscribed(); //subscribe to Roadside coder
isSubscribed(); //aldy called
isSubscribed();
isSubscribed();

//Q8 once, mroe generic way
function once(func, context) {
  let ran;

  return function () {
    //a closure, will return inside of hello variable, the reason how we r able to call this
    if (func) {
      //if the function has some value (yes, it has the callback)
      ran = func.apply(context || this, arguments); //this means whatever the context this function is / arguments if any
      func = null; //not calling again
    }

    return ran;
  };
}

const hello = once(() => console.log("hello"));

hello(); //hello
hello(); // nothing
hello();
hello();

//else
const hello = once((a, b) => console.log("hello")); //we have arguments ([])

hello(1, 2); //hello 1 2
hello(1, 2);
hello(1, 2);

//Q9 - Difference bw Closure and Scope
//whenever you create a function withing another function, then inner function is the closure
//this closure is usually returned so we can use outer function variable at a later time

//scope in js defines what variable you have access to: global scopr and local scope
//in contrast: closure has global, outer, local scope
