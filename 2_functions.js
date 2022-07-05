//q1 what is function declarations?

function square(num) {
  return num * num;
}

//q2 what is function expression?
const square = function (num) {
  //anonymous function
  return num * num;
};

console.log(square(5));

//q3 what are first class functions?
//js can pass in fn just like a variable
function square(num) {
  return num * num;
}

function displaySquare(fn) {
  console.log("square is " + fn(5));
}

displaySquare(square);

//Q4 - What is IIFE?
//immediately invoked function expressions (not frquent ask)
(function square(num) {
  console.log(num * num);
})(5); //we can call it right away

//Q5 - IIFE - O/P Based Question?
(function (x) {
  return (function (y) {
    console.log(x); //just 1
  })(2);
})(1);

//Q6 Function Scope
// The following variables are defined in the global scope
var num1 = 20,
  num2 = 3,
  name = "Chamakh";

// This function is defined in the global scope
function multiply() {
  return num1 * num2;
}

multiply(); // Returns 60

// A nested function example
function getScore() {
  var num1 = 2, //these will shadow (replace) the global scope
    num2 = 3;

  function add() {
    return name + " scored " + (num1 + num2); //name from global, num1 num2 from local
  }

  return add();
}

getScore(); // Returns "Chamakh scored 5"

//Q7 - Function Scope - O/P Based Question
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}

//what output going to be

//0,1,2,3,4,5 using let (block scope)
//5,5,5,5,5 using var (not block scope)

//Q8 - Function Hoisting

//functionName()

function functionName() {
  console.log("workattach");
}

functionName(); //*still get result if put this before function (function is hoisting completely)

//console.log(x);
var x = 5;
console.log(x); //undefined if put on top

//Q9 - Function Hoisting - O/P Based Question

var x = 21;

var fun = function () {
  console.log(x);
  var x = 20;
};

fun(); //undefined, when we have a variable in scope, wont check the global

//Q10 - Params vs Arguments
function square(num) {
  //value received here is params
  console.log(num * num);
}

square(5); //value passed here called argument
//
function multiply(num1, num2) {
  console.log(num1 * num2);
}

var arr = [5, 6];

multiply(...arr);
//
function multiply(...nums) {
  console.log(nums[0] * nums[1]);
}

var arr = [5, 6];

multiply(...arr);


//Q11 - Params VS Arguments - O/P Based Question
const fn = (a, ...numbers, x, y) => {
  console.log(x,y);
}

fn(5,6,3,7)//error

//when using spread operator, should always be the last one

const fn = (a, x, y, ...numbers) => {
  console.log(x,y,numbers);
}

fn(5,6,3,7,8,9)//take 5,6,3 as a,x,y


//Q12 - what is a call back function
// A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

// Here is a quick example:

function greeting(name) {
  alert('Hello ' + name);
}

function processUserInput(callback) {
  var name = prompt('Please enter your name.');
  callback(name);
}

processUserInput(greeting);

//example
document.addEventListener("click", function(params){
  //function is a callback here
  //others like map, filter
})


//Q13 - Arrow functions - Diff
//1.syntax
const add = function (first, second) {
  return first + second
}

const add = (first, second) => {
  return first + second
}

const add = (first, second) => first + second

//2. Implicit "return" keyword
const add = (first, second) => first + second

//3. arguments
function fn() {
  console.log(arguments); //"arguments" is an auto passed arguments
}

fn(1,3,2)

const fnArr = () => {
  console.log(arguments);
}

fnArr(1,3,2)//arguments is not defined, cannot have keyword inside an arrow function


//4 - "this" keyword
let user = {
  username: 'Roadside Coder',
  rc1: () => {
    console.log('subscribe' + this.username);
  },
  rc2(){
    console.log('subscribe' + this.username);
  }
}

user.rc1()//undefined, the this is pointed to global object
user.rc2()//subscribe roadside coder, this is pointed to this object