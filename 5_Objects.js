//object in js

const user = {
  name: "Roadside Coder",
  age: 24,
};

user.name = "Mike";

delete user.age; //if need to delete

console.log(user);

//
const func = (function (a) {
  delete a;
  return a;
})(5);

console.log(func); //5, delete only happen when its not a local variable

//
const user = {
  name: "Roadside Coder",
  age: 24,
  "like this video": true,
};

console.log(user["like this video"]); //how you run this

//

const property = "firstname";
const name = "Mike";

const user = {
  [property]: name,
};

console.log(user.firstname);

//
const user = {
  name: "Mike",
  age: 24,
  isTotallyAwesome: true,
};

for (key in user) {
  console.log(key); //name, age, isTotallyAwesome
  console.log(user[key]); //Mike, 24, true
}

//Q1 - What's the output?
const obj = {
  a: "one",
  b: "two",
  a: "three",
};

console.log(obj); //a:'three', b:'two', two key with the same name will be replaced but keep position

//Q2 - Create a function multiplyByTwo(obj) that multiplies all numeric property values of nums by 2

let nums = {
  a: 100,
  b: 200,
  title: "My nums",
};

multiplyBtTwo(nums);

function multiplyBtTwo(obj) {
  for (key in obj) {
    if (typeof obj[key] === "number") {
      obj[key] *= 2;
    }
  }
}

console.log(nums);

//Q3 - What's the output of the following code?

const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]); //456
console.log(a); //  [object Object]: 456, because b cannot be converted into a key unless its a string

//both act as below:
// a[object Object] = 123;
// a[object Object] = 456;
//because at the end 456 overlaps 123

//Q4 - What's JSON.stringfy and JSON.parse?

const user = {
  name: "Mike",
  age: 24,
};

console.log(JSON.stringify(user)); //{"name":"Mike","age":24}

const strObj = JSON.stringify(user);

//how to convert it back to object

console.log(JSON.parse(strObj));

//use case: local storage only takes JSON string. Cannot take object directly
localStorage.setItem("test", strObj);
console.log(localStorage.getItem("test"));
console.log(JSON.parse(localStorage.getItem("test")));

//Q5 - what's the output?
console.log([..."Lydia"]); //['L','y','d','i','a']

//Q6 - what's the output?
const user = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user };

console.log(admin);
// {
//     admin: true,
//     age: 21,
//     name: "Lydia"
// }

//Q7 - what's the output?
const settings = {
  username: "Mike",
  level: 19,
  health: 90,
};

const data = JSON.stringify(settings, ["level", "health"]); //means will only stringify level and health
console.log(data);

//Q8 what's the output?
const shape = {
  radius: 10,
  diameter() {
    //normal function refer to shape object
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius, //arrow function refers to the windows
};

console.log(shape.diameter()); //20
console.log(shape.perimeter()); //nan

//Q9 - what is destructuring in objects?
let user = {
  name: "Mike",
  age: 24,
};

const { name } = user;

console.log(name);

//how to reanme name property within destructure
const name = "Mike";

const { name: myName } = user;

console.log(myName);

//nested way
let user = {
  name: "Mike",
  age: 24,
  fullName: {
    first: "Mike",
    last: "Chen",
  },
};

const name = "Mike";

const { fullName } = user;

console.log(fullName);

//what if need to take out first object
const {
  fullName: { first },
} = user;

console.log(first);


//Q10 - what's the output?
function getItems(friutList, ...args, favoriteFruit) {
    return [...friutList, ...args, favoriteFruit]
}

getItems(['banana', 'apple'], 'pear', 'orange')

//A:
function getItems(friutList, favoriteFruit, ...args) {
    return [...friutList, ...args, favoriteFruit]
}

console.log(getItems(['banana', 'apple'], 'pear', 'orange'));
//["banana", "apple", "orange", "pear"]


//Q11 output?
let c = {greeting:'Hey!'}
let d;

d = c;
c.greeting = 'Hello'
console.log(d.greeting); //Hello, because we simply provide the reference not complete object


//Q12 output?
console.log({a:1} == {a:1}); //false, both are independent object
console.log({a:1} === {a:1});//false


//Q13 output?
let person = {name: 'Lydia'}
const members = [person]; //members is an array
person = null;

console.log(members);
// [{
//     name: "Lydia"
// }]

//we are providing person object into members[0] so null is not affecting

//but if
person.name = null
//then its affecting


//Q14 - output?
const value = {number: 10};

const multiply = (x = {...value}) => {
    //...value is cloning the object here
    console.log((x.number *= 2));
}

multiply()//20
multiply()//20
multiply(value)//20, taking the value of global, x = global value, then it modified the value of global value
multiply(value)//40


//Q15 - output?
function changeAgeAndReference(person){
    person.age = 25;
    person = {
        name: 'John',
        age: 50
    } //since we are reassign the object, this is not affecting the reference

    return person;
}

const personObj1 = {
    name: 'Alex',
    age: 30,
}

const personObj2 = changeAgeAndReference(personObj1)

console.log(personObj1);
// {
//     age: 25,
//     name: "Alex"
// }
console.log(personObj2);
// {
//     age: 50,
//     name: "John"
// }


//Q16 - what is shallow copy and deep copy?
//shallow: when we copy an object to another object, but that object still got the reference to the original object
//deep: completely clone the object
//how to deep copy:
let user = {
    name: 'Mike',
    age:34,
}

const objClone = Object.assign({}, user);
objClone.name = 'Chen'
console.log(user, objClone);
// {
//     age: 34,
//     name: "Mike"
// }, {
//     age: 34,
//     name: "Chen"
// }


//
let user = {
    name: 'Mike',
    age:34,
}

const objClone = JSON.parse(JSON.stringify(user))
objClone.name = 'Chen'
console.log(user, objClone);

//
let user = {
    name: 'Mike',
    age:34,
}

const objClone = {...user}
objClone.name = 'Chen'
console.log(user, objClone);