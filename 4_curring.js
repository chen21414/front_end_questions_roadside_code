//example f(a,b) into f(a)(b)

function f(a, b) {
  console.log(a, b);
}

//in curring
function f(a) {
  return function (b) {
    return `${a} ${b}`;
  };
}

console.log(f(5)(6)); //5, 6

//why should we use curring?
// ✅ It makes a function pure which makes it expose to less errors and side effects.

// ✅ It helps in avoiding the same variable again and again.

// ✅ It is a checking method that checks if you have all the things before you proceed.

// ✅ It divides one function into multiple functions so that one handles one set of responsibility.

//Q1 - sum(2)(6)(1)
function sum(a, b, c) {
  return a + b + c;
}

console.log(sum(2, 6, 1)); //9

function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(sum(2)(6)(1)); //9

//Q2
//evaluate('sum')(4)(2) => 6
//evaluate('multiply')(4)(2) => 8
//evaluate('divide')(4)(2) => 2
//evaluate('substract')(4)(2) => 2

function evaluate(operation) {
  return function (a) {
    return function (b) {
      if (operation === "sum") return a + b;
      else if (operation === "multiply") return a * b;
      else if (operation === "divide") return a / b;
      else if (operation === "substract") return a - b;
      else return "Invalid Operation";
    };
  };
}

console.log(evaluate("sum")(4)(2));
console.log(evaluate("multiply")(4)(2));

const mul = evaluate("multiply");
console.log(mul(3)(5));

//Q3 - Infinite Curring -> sum(1)(2)(3)...(n)

sum(1)(2); //3
sum(1)(2)(4)(5); //12

//answer is in class 24 video

//Q3 - Infinite Curring

function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a; //if no b
  };
}

console.log(add(5)(2)(4)(5)());

//Q4 - Curring vs partial application

//partial application
function sum(a) {
  return function (b, c) {
    return a + b + c;
  };
}

const x = sum(10);

console.log(x(5, 6));
console.log(x(3, 2));

//or

console.log(sum(20)(1, 4));

//curring
function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

//Q5 - Manipulating DOM
function updateElementText(id) {
  return function (context) {
    document.querySelector("#" + id).textContent = context;
  };
}

const updateHeader = updateElementText("heading");

updateHeader("Hello");

//Q6 - converts f(a,b,c) into f(a)(b)(c) ***

function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      //when 1,2,3 length = 3 length
      return func(...args);
    } else {
      //when 1 < 3, goes into here
      return function (...next) {
        //it's expecting to run the function again
        console.log("next", next); //[2]
        console.log("args", args); //[1]
        return curriedFunc(...args, ...next);
      };
    }
  };
}

const sum = (a, b, c) => a + b + c;
const totalSum = curry(sum);
console.log(totalSum(1)(2)(3));

//explanation 24:00
//https://www.youtube.com/watch?v=k5TC9i5HonI
