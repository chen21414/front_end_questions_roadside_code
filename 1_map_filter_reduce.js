//map, filter, and reduce
//what is map

const nums = [1, 2, 3, 4];

const multiplyThree = nums.map((num, i, arr) => {
  //arr is the actual array (nums)
  return num * 3 + i;
});

console.log(multiplyThree);

const moreThanTwo = nums.filter((num) => {
  return num > 2;
});

console.log(moreThanTwo);

const sum = nums.reduce((acc, curr, i, arr) => {
  return acc + curr;
}, 0);

console.log(sum);

//polyfill for map()
Array.prototype.myMap = function (cb) {};
