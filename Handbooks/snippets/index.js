const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
// console.log(shape.perimeter());

class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = "green" } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: "purple" });
// console.log(freddie.colorChange("orange"));

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};
const member = new Person("Lydia", "Hallie");
Person.prototype.animal = "dog";
console.log(member.animal);
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = "Lydia";
const age = 21;

getPersonInfo`${person} is ${age} years old`;
console.log(typeof [1, 2]);

const a = {};
const b = { key: "b" };
const c = { key: "c" };
console.log(a, b, c);

a[b] = 123;
console.log(a, a[b], a[c]);

a[c] = 456;
console.log(a, a[b], a[c], a, b, c);

console.log(a[b]);

console.log(Boolean([]));

const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);

// for (var i = 0; i < 10; i++) {
//   // Passed as an argument will use the value as-is in
//   // that point in time
//   setTimeout(console.log, 0, i);
// }
console.log("dsd", []);
const previousLine = 3;
const previousLine2 = [1, 2, previousLine];
[1, 2, 3].map((n) => n * 2);

const myLibrary = (function () {
  var privateVariable = 2;
  return {
    publicMethod: () => privateVariable,
  };
})();
// privateVariable; // ReferenceError
myLibrary.publicMethod(); // 2

const myLibrary2 = (function () {
  var privateVariable = 2;
  return {
    publicMethod: () => privateVariable,
  };
})();
console.log(myLibrary.publicMethod());

const myLibrary3 = (function () {
  var privateVariable = 20;
  return {
    publicMethod: () => privateVariable,
  };
})();
console.log(myLibrary3.publicMethod());

console.log(mask("123456789")); // "#####6789"

function mask(str) {
  console.log(str.slice(-4));
  console.log(str.padEnd(14, "#"));
  return str.slice(-4).padStart(str.length, "#");
  // let result = "#";
  // for (let i = 0; i < str.length; i++) {
  //   if (i < 4) {
  //     result = result + '#'
  //   } else {
  //     result = result + str.slice(5)
  //     return result
  //   }
  // }
}
let e = [1, 3, 4];
let d = [1, 3, 4];
let f = "1,3,4";

console.log(e, f);
const pipe = (a, b, c) => {
  return (NUM) => c(b(a(NUM)));
};
const square = (v) => v * v;
const double = (v) => v * 2;
const addOne = (v) => v + 1;
const res = pipe(square, double, addOne);
console.log(res(3)); // 19; addOne(double(square(3)))

const fruits = [
  "apple",
  "banana",
  "orange",
  "apple",
  "orange",
  "banana",
  "banana",
];
const uniqueFruits = [...new Set(fruits)];
console.log("🚀 ~ uniqueFruits:", uniqueFruits);
const fruitsCount = fruits.reduce((accumulator, currentValue) => {
  if (accumulator[currentValue]) {
    accumulator[currentValue]++;
  } else {
    accumulator[currentValue] = 1;
  }
  return accumulator;
}, {});
console.log("🚀 ~ fruitsCount ~ fruitsCount:", fruitsCount);

const count = fruits.reduce((accumulator, currentValue) => {
  if (!accumulator[currentValue]) {
    accumulator[currentValue] = 1;
  } else {
    accumulator[currentValue]++;
  }
  return accumulator;
}, {});
console.log("🚀 ~ count ~ count:", count);
