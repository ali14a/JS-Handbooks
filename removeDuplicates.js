//list fibonnaci
function listFibonacci(n) {
  var arr = [0, 1];
  for (let i = 1; i < n; i++) {
    arr.push(arr[i] + arr[i - 1]);
  }
  return arr;
}
console.log(listFibonacci(5));
function fact(n) {
  if (n === 0) {
    return false;
  }
  if (n === 1) {
    return true;
  }
  return n * fib(n - 1);
}
// console.log(fib(5));
//use of label:
// var i, j;

// loop1: for (i = 0; i < 3; i++) {
//   loop2: for (j = 0; j < 3; j++) {
//     if (i === j) {
//       continue loop1;
//     }
//     console.log("i = " + i + ", j = " + j);
//   }
// }

// Output is:
//   "i = 1, j = 0"
//   "i = 2, j = 0"
//   "i = 2, j = 1"

// Code 24: Fibonacci Series (0,1,1,2,3,5,8,13....)
// Code 19: To find a first pair whose sum is zero
function getSumPairZero(arr) {
  let arrrr = [];
  arr.forEach((element) => {
    for (let i = 0; i < arr.length; i++) {
      // if (element !== arr[i]) {
      if (element + arr[i] === 0) {
        arrrr.push(arr[i], element);
      }
      // }
    }
  });
  return arrrr;
}
const result = getSumPairZero([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);
console.log(result);
// Code 18:To find character occurance fro the string
function charOccurence() {
  var str = "abcbcbcab";
  let char = "b";
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }
  return count;
}

// Code 17: To find vowels and its count in a given string
function findVowel() {
  let vowels = ["a", "i", "e", "o", "u"];
  var str = "priya";
  let vowelCount = 0;
  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      vowelCount++;
    }
  }
  return vowelCount;
}

//Code 16: To find longest common string from array of strings
function longestCommonStr() {
  let array = ["gog", "google", "gosh"];
  var arr = array.sort();
  var i = 0;
  while (
    arr[0].length > 0 &&
    array[0].charAt(i) === arr[arr.length - 1].charAt(i)
  ) {
    i++;
  }
  return arr[0].substring(0, i);
}

// Code 13: To find longest word from a string
function longestWord() {
  let string = "THis is a looong sentence";
  //Method 2
  let longestWord1 = "";
  let currentWord = string[0];
  for (let i = 0; i < string.length; i++) {
    currentWord += string[i];
    if (string[i] === " " || i === string.length - 1) {
      if (currentWord.length > longestWord1.length) {
        longestWord1 = currentWord;
      }
      currentWord = "";
    }
  }
  return longestWord1;
}

//Code 11: Check Palindrome
function checkPalindrome() {
  const string = "anmna";
  //Method 2
  for (let i = 0; i < string.length / 2; i++) {
    if (string[i] !== string[string.length - 1 - i]) {
      return false;
    }
    return true;
  }
  //Method 1
  const reversedStr = string.split("").reverse().join("");
  return string === reversedStr;
}
console.log(checkPalindrome());

//Code 8:Anagram
function anagram() {
  var a = "Army";
  var b = "Mary";
  //Method 1
  return (
    a.toLowerCase().split("").sort().join("") ===
    b.toLowerCase().split("").sort().join("")
  );
}
console.log(anagram());
//Code 7: Find factorial of user input number
export function findFactorialRecursive(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * findFactorial(n - 1);
  }
}
function findFactorial(n) {
  if (n < 0) {
    return "number should not be less than 0";
  }
  if (n === 0) {
    return 1;
  } else {
    let fact = 1;
    for (let i = 1; i <= n; i++) {
      fact *= i;
    }
    return fact;
  }
}

//Code 3: Remove Duplicate characters from array of element using filter
export function removeDuplicatesUsingFilter() {
  var myArray = ["a", 1, "a", 2, "1", 1, 2, "2"];
  return myArray.filter((item, index, arr) => arr.indexOf(item) === index);
}

//Code 2: Remove Duplicate characters from array of element and find the count of an elements using set object
export function removeDuplicateFromArr() {
  var arr = [55, 44, 55, 67, 67, 67, 67, 8, 8, 8, 8, 8, 65, 1, 2, 3, 3, 34, 5];
  let uniqueArr = [];
  //way 1
  arr.filter((item) => {
    if (uniqueArr.indexOf(item) === -1) {
      return uniqueArr.push(item);
    }
    return item;
  });
  // return [...new Set(arr)] //Using Set
  console.log(uniqueArr);
  return uniqueArr;
}

//Code 1: Remove Duplicate characters from String
export function removeDuplicateCharactersFilter() {
  var string = "priya riya supriya";
  //way1
  let uniquesStr = "";
  string.split("").filter((char, index, arr) => {
    if (uniquesStr.includes(char)) {
      return char;
    }
    return (uniquesStr += char);
  });
  //way2
  let uniqueStr = string
    .split("")
    .filter((char, index, arr) => {
      if (arr.indexOf(char) === index) {
        return char;
      } else {
        return false;
      }
    })
    .join("");
  console.log("removeDuplicateCharactersFilter", uniquesStr);
  return uniqueStr;
}
export function removeDuplicateCharacters() {
  var string = "priya riya supriya";
  let uniqueStringArr = [...new Set(string.split(""))];
  console.log(uniqueStringArr.join(""));
  return uniqueStringArr.join("");
}

export function double() {
  const numbers = [1, 2, 3, 4, 5];

  const doubleNumbersAll = Promise.all(
    numbers.map((number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(number * 2);
        }, 10000);
      }).then((result) => result);
    })
  );
  console.log(doubleNumbersAll.then((result) => console.log(result)));
}
double();
