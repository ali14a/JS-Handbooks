# Progress

| File            | New Questions or Data |
| --------------- | --------------------- |
| JSOutputQues1-2 | 40                    |
| 30secjs1-3      |                       |

TODO: Event Loop, Promises

- Everything in javascript happens inside the execution context

- Javascript is single threaded synchronous language

# Javascript interview Question

- What is Ecmascript in Javascript
  `ECMAScript (ES) ek JavaScript ka standard version hai jo sabhi browsers me consistency ensure karta hai. Pehle, different JavaScript versions (Netscape’s JavaScript vs. Microsoft’s JScript) ki wajah se compatibility issues hote the jaese in engines ke apne interpretations hote the for Arrays, Dates, Strings. ES ne syntax standardize kiya, security improve ki, aur modern features jaise let/const, async/await, aur import/export modules introduce kiye. JavaScript engines (V8, SpiderMonkey) ko faster & optimized banaya. "use strict" mode errors prevent karta hai aur async programming simplify karta hai. Har ES update (ES5, ES6, etc.) JavaScript ko aur powerful & scalable banata hai, jo modern web development ke liye essential hai.`

`Let, Const, Var`
| Feature | `var` | `let` | `const` |
|--------------|------|------|------|
| **Scope** | Function-scoped | Block-scoped | Block-scoped |
| **Hoisting** | Hoisted (initialized as `undefined`) | Hoisted (TDZ, no access before declaration) | Hoisted (TDZ, no access before declaration) |
| **Reassignment** | ✅ Allowed | ✅ Allowed | ❌ Not allowed |
| **Redeclaration** | ✅ Allowed | ❌ Not allowed | ❌ Not allowed |
| **Mutability** | ✅ Mutable | ✅ Mutable | ❌ Immutable (but object properties can be changed) |

- What is the Temporal Dead Zone (TDZ) in JavaScript?

`The Temporal Dead Zone (TDZ) is the period between the hoisting of a variable and its initialization, during which accessing the variable results in a ReferenceError. This happens with let and const, but not with var.`

````console.log(a); // ✅ undefined (var is hoisted)
var a = 10;

console.log(b); // ❌ ReferenceError (b is in TDZ)
let b = 20;

console.log(c); // ❌ ReferenceError (c is in TDZ)
const c = 30;```

🔹 Why is TDZ Important?
✅ Helps prevent accidental access to uninitialized variables.
✅ Encourages better coding practices (e.g., defining variables before using them).
✅ Ensures const variables never change before initialization.

✔ let and const are hoisted, but they stay in the Temporal Dead Zone until initialization.
✔ var is hoisted and initialized to undefined, making it accessible before declaration.

The spread operator (...) is used to expand elements of an array or object into individual elements. It’s often used for copying, merging, and passing arguments to functions.

Summary: Spread (...) expands elements of an array/object.

Copying and merging
```const obj1 = { name: "Alice", age: 25 };
const obj2 = { country: "India" };
const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj); // { name: "Alice", age: 25, country: "India" }
````

Passing Arguments to a Function

```function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6
```

The rest operator (...) is the opposite of the spread operator. Instead of expanding, it collects multiple values into an array. It is used in function parameters to accept an indefinite number of arguments.
Collecting Function Arguments

```function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

Summary: Rest (...) collects multiple values into an array/object.
console.log(sum(1, 2, 3, 4, 5)); // 15
```

Rest with Object Destructuring

```const person = { name: "John", age: 30, city: "Delhi" };
const { name, ...details } = person;

console.log(name); // John
console.log(details); // { age: 30, city: "Delhi" }
```

Default Parameters
`function greet(name = "Guest") {`

| Feature                | Symbol | Purpose                                         |
| ---------------------- | ------ | ----------------------------------------------- |
| **Spread Operator**    | `...`  | Expands arrays/objects into individual elements |
| **Rest Operator**      | `...`  | Collects multiple values into an array/object   |
| **Default Parameters** | `=`    | Sets a default value if an argument is missing  |

- Deep copy vs Shallow copy
  | Copy Type | Method | Works for Nested Objects? | Preserves Functions? | Handles Circular References? |
  |--------------|-------------------------------|---------------------------|----------------------|------------------------------|
  | **Shallow Copy** | `Object.assign()` / `{ ...obj }` | ❌ No | ✅ Yes | ❌ No |
  | **Deep Copy** | `JSON.parse(JSON.stringify(obj))` | ✅ Yes | ❌ No | ❌ No |
  | **Deep Copy** | `structuredClone(obj)` | ✅ Yes | ✅ Yes | ✅ Yes |
  | **Deep Copy** | `_.cloneDeep(obj)` (Lodash) | ✅ Yes | ✅ Yes | ✅ Yes |

✔ Use shallow copy ({ ...obj }) when working with simple objects or object.assign.
✔ Avoid JSON.parse(JSON.stringify(obj)) if you need to copy functions or undefined.
✔ Use structuredClone() (modern) or Lodash’s \_.cloneDeep() for complex objects.

✅ Examples of Shallow Copy
A) Using Object.assign()

```const obj1 = { name: "Alice", details: { age: 25 } };
const obj2 = Object.assign({}, obj1);

obj2.name = "Bob";
obj2.details.age = 30; // Modifies the original object!

console.log(obj1); // { name: "Alice", details: { age: 30 } }
console.log(obj2); // { name: "Bob", details: { age: 30 } }
```

B) Using Spread Operator (...)

```const obj1 = { name: "Alice", details: { age: 25 } };
const obj2 = { ...obj1 }; // Shallow copy

obj2.details.age = 30;

console.log(obj1.details.age); // 30 (unexpected change!)
```

Deep Copy (Cloning Everything)

```const obj1 = { name: "Alice", details: { age: 25 } };
const obj2 = JSON.parse(JSON.stringify(obj1));

obj2.details.age = 30;

console.log(obj1.details.age); // ✅ 25 (original unchanged)
console.log(obj2.details.age); // ✅ 30 (modified copy)
```

Limitations:

❌ Loses functions, undefined, and special objects (like Date, RegExp).
❌ Doesn't work for circular references (where an object references itself).

B) Using structuredClone() (Best Modern Approach)

```const obj1 = { name: "Alice", details: { age: 25 } };
const obj2 = structuredClone(obj1);

obj2.details.age = 30;

console.log(obj1.details.age); // ✅ 25 (original unchanged)
console.log(obj2.details.age); // ✅ 30 (modified copy)
```

- Can you explain Promises, Callback Functions, and Async/Await in JavaScript?
  These concepts are all related to handling asynchronous operations in JavaScript.

1️⃣ Callback Function:
A callback function is a function passed as an argument to another function, which is then executed later.
It was the traditional way to handle async tasks like API calls or reading files, but it led to callback hell when multiple callbacks were nested.

```
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 2000);
}

fetchData((message) => {
  console.log(message); // Output after 2 sec: Data received
});
```

2️⃣ Promise:
A Promise is an improved way to handle async tasks.
It represents a value that might be available now, in the future, or never.
A Promise has three states:

Pending (initial state)
Resolved (success)
Rejected (error)

```
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Data received");
  }, 2000);
});
fetchData.then((message) => console.log(message)).catch((err) => console.log(err));
```

3️⃣ Async/Await:
async/await is a modern way to write async code in a synchronous style, making it easier to read and debug.
It works with Promises but avoids .then() chains.

```
async function fetchData() {
  return "Data received";
}

async function getData() {
  const message = await fetchData();
  console.log(message); // Output: Data received
}

getData();

```

| Concept         | Definition                                                 | Drawback                          |
| --------------- | ---------------------------------------------------------- | --------------------------------- |
| **Callback**    | Function passed as an argument to another function         | Callback Hell (nested functions)  |
| **Promise**     | Object that represents success or failure of an async task | Still requires `.then()` chaining |
| **Async/Await** | Modern syntax for working with Promises                    | Must be inside `async` function   |

- Why is async/await preferred over Callbacks and Promises?

`Better readability – It looks like synchronous code.
`Easier debugging – No need to chain .then().
`Error handling – Works well with try...catch for cleaner error handling.

### **📝 Interviewer: Can you explain Event Bubbling and Event Capturing in JavaScript?**

**🧑‍💼 Candidate:**  
Sure! In JavaScript, when an event occurs on an element, it doesn't just affect that element—it also travels through the DOM in two phases:

### **1️⃣ Event Bubbling (Bottom to Top)**

- In **event bubbling**, the event starts from the **target element** (where the event occurred) and then propagates **upward** through its ancestors.
- This means that if you have a `click` event on a child element inside a parent, the event will first trigger on the child, then on its parent, then on the grandparent, and so on.

✅ **Example:**

```js
document.getElementById("child").addEventListener("click", () => {
  console.log("Child Clicked");
});

document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent Clicked");
});

document.getElementById("grandparent").addEventListener("click", () => {
  console.log("Grandparent Clicked");
});
```

**🔹 Clicking on `#child` will log:**

```
Child Clicked
Parent Clicked
Grandparent Clicked
```

👉 The event **bubbles up** from the child to the grandparent.

---

### **2️⃣ Event Capturing (Top to Bottom)**

- In **event capturing** (also called event trickling), the event starts at the **root element** and propagates **downward** to the target element.
- This is the opposite of bubbling.
- To enable capturing, we pass `true` as the third argument to `addEventListener()`.

✅ **Example:**

```js
document.getElementById("grandparent").addEventListener(
  "click",
  () => {
    console.log("Grandparent Clicked");
  },
  true
); // 👈 Event capturing enabled

document.getElementById("parent").addEventListener(
  "click",
  () => {
    console.log("Parent Clicked");
  },
  true
);

document.getElementById("child").addEventListener(
  "click",
  () => {
    console.log("Child Clicked");
  },
  true
);
```

**🔹 Clicking on `#child` will log:**

```
Grandparent Clicked
Parent Clicked
Child Clicked
```

👉 The event **trickles down** from the grandparent to the child.

---

### **📝 Interviewer: What is `stopPropagation()`?**

**🧑‍💼 Candidate:**  
Great question! If we want to **prevent event propagation** (stop bubbling or capturing), we use `event.stopPropagation()`.

✅ **Example:**

```js
document.getElementById("child").addEventListener("click", (event) => {
  event.stopPropagation(); // 👈 Stops event from reaching parent elements
  console.log("Child Clicked");
});
```

Now, clicking on `#child` **won't trigger the parent handlers**.

---

### **💡 Key Differences**

| Feature               | Event Bubbling 🛑⬆️                  | Event Capturing ⬇️✅                 |
| --------------------- | ------------------------------------ | ------------------------------------ |
| **Direction**         | Bottom to Top                        | Top to Bottom                        |
| **Default Behavior?** | Yes                                  | No (must pass `true`)                |
| **Usage**             | Common                               | Less common                          |
| **Can be stopped?**   | Yes, using `event.stopPropagation()` | Yes, using `event.stopPropagation()` |

---

### **📝 Interviewer: When should you use bubbling or capturing?**

**🧑‍💼 Candidate:**

- **Event bubbling** is the default and is used when handling events **at the most specific level first**.
- **Event capturing** is useful when you want the **outermost elements to handle the event first** (e.g., for global event delegation).

### **📝 Interviewer: Can you explain Higher-Order Functions in JavaScript?**

A **Higher-Order Function (HOF)** is a function that **takes another function as an argument OR returns a function**.

They are a key feature of **functional programming** and make JavaScript more powerful and flexible.

---

## **1️⃣ Higher-Order Function Taking a Function as an Argument**

✅ **Example: Using `map()` (Built-in HOF)**

```js
const numbers = [1, 2, 3, 4];

const doubled = numbers.map((num) => num * 2); // `map` takes a function as an argument
console.log(doubled); // [2, 4, 6, 8]
```

🔹 Here, `.map()` **is a Higher-Order Function** because it takes a function `(num => num * 2)` as an argument.

---

## **2️⃣ Higher-Order Function Returning Another Function**

✅ **Example: Function that Generates a Function**

```js
function multiplier(factor) {
  return function (num) {
    return num * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10
```

🔹 `multiplier(2)` returns a **new function**, making `double(5)` work dynamically.

---

## **3️⃣ Custom Higher-Order Function Example**

✅ **Example: A Function that Filters Data Based on a Condition**

```js
function filterArray(arr, callback) {
  return arr.filter(callback);
}

const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = filterArray(numbers, (num) => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]
```

🔹 `filterArray()` **is a Higher-Order Function** because it accepts a **callback function**.

---

## **💡 Key Benefits of Higher-Order Functions**

✔ **Reusability** – Write flexible and reusable code.  
✔ **Less Code, More Power** – Makes code **concise** and **readable**.  
✔ **Functional Programming** – Enables functional paradigms like `map`, `filter`, and `reduce`.

### **📝 Interviewer: Can you explain different types of functions in JavaScript?**

**🧑‍💼 Candidate:**  
Yes, JavaScript provides various types of functions, each with different use cases. Here’s a breakdown of the most common ones:

---

## **1️⃣ Named Function**

A **named function** is a function with an explicit name. It can be called multiple times and supports hoisting.

✅ **Example:**

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Alice")); // Hello, Alice!
```

🔹 **Supports Hoisting** – Can be called **before** the function declaration.

---

## **2️⃣ Anonymous Function**

A function **without a name** is called an **anonymous function**. It is usually assigned to a variable.

✅ **Example:**

```js
const greet = function (name) {
  return `Hello, ${name}!`;
};

console.log(greet("Bob")); // Hello, Bob!
```

🔹 **Cannot be called before declaration** (No Hoisting).

---

## **3️⃣ Arrow Function (ES6+)**

Introduced in **ES6**, arrow functions provide a **concise syntax** and do not bind their own `this`.

✅ **Example:**

```js
const greet = (name) => `Hello, ${name}!`;

console.log(greet("Charlie")); // Hello, Charlie!
```

🔹 **No `this` binding**, making it ideal for callbacks.

---

## **4️⃣ Immediately Invoked Function Expression (IIFE)**

An **IIFE** is a function that runs **immediately after its definition**.

✅ **Example:**

```js
(function () {
  console.log("I am executed immediately!");
})();
```

🔹 **Used to avoid polluting the global scope.**

---

## **5️⃣ Higher-Order Function**

A **Higher-Order Function (HOF)** is a function that **takes another function as an argument OR returns a function**.

✅ **Example: Using `map()`**

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6]
```

🔹 **Encourages functional programming.**

---

## **6️⃣ Recursive Function**

A **recursive function** calls itself until a base condition is met.

✅ **Example: Factorial Function**

```js
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

🔹 **Used for problems like trees, graphs, and mathematical operations.**

---

## **7️⃣ Generator Function (`function*`)**

A **generator function** allows function execution to be paused and resumed using `yield`.

✅ **Example:**

```js
function* count() {
  yield 1;
  yield 2;
  yield 3;
}

const counter = count();
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
```

🔹 **Used for handling async operations efficiently.**

---

## **📌 Summary Table**

```md
| Function Type             | Description                                     | Supports `this`? | Hoisting? |
| ------------------------- | ----------------------------------------------- | ---------------- | --------- |
| **Named Function**        | Regular function with a name                    | ✅ Yes           | ✅ Yes    |
| **Anonymous Function**    | Function without a name, assigned to a variable | ✅ Yes           | ❌ No     |
| **Arrow Function**        | Short syntax, no `this` binding                 | ❌ No            | ❌ No     |
| **IIFE**                  | Runs immediately after declaration              | ✅ Yes           | ❌ No     |
| **Higher-Order Function** | Takes or returns another function               | ✅ Yes           | ✅ Yes    |
| **Recursive Function**    | Calls itself                                    | ✅ Yes           | ✅ Yes    |
| **Generator Function**    | Uses `yield` for pausing execution              | ✅ Yes           | ❌ No     |
```

### **📝 Interviewer: Can you explain Arrow Functions in JavaScript?**

**🧑‍💼 Candidate:**  
Yes! **Arrow functions** were introduced in **ES6** as a shorter and more concise way to write functions in JavaScript. They are especially useful in **functional programming and callbacks**.

---

## **1️⃣ Basic Syntax of Arrow Functions**

✅ **Example:**

```js
// Traditional function
function greet(name) {
  return `Hello, ${name}!`;
}

// Arrow function (shorter syntax)
const greet = (name) => `Hello, ${name}!`;

console.log(greet("Alice")); // Hello, Alice!
```

🔹 **No `return` keyword needed** for single-line expressions.  
🔹 **Parentheses around parameters can be omitted if there’s only one parameter.**

---

## **2️⃣ Key Features of Arrow Functions**

### **🔹 1. Implicit Return (No `return` Keyword Needed)**

```js
const square = (num) => num * num;
console.log(square(4)); // 16
```

✅ **Saves time by omitting `{}` and `return`.**

---

### **🔹 2. No Own `this` Binding**

- **Arrow functions do NOT have their own `this`**.
- Instead, they **inherit `this` from the surrounding scope**.
- This makes them **ideal for use inside objects and classes**.

✅ **Example (Avoids `this` confusion in Objects)**

```js
const user = {
  name: "John",
  greet: function () {
    setTimeout(() => {
      console.log(`Hello, ${this.name}!`); // ✅ Works because arrow function inherits `this`
    }, 1000);
  },
};

user.greet(); // "Hello, John!"
```

🔹 If we used a **regular function** inside `setTimeout()`, `this.name` would be `undefined`.

---

### **🔹 3. Cannot Be Used as a Constructor (`new` Keyword)**

Arrow functions **cannot be used with `new`** to create objects.

❌ **Example (Throws an Error)**

```js
const Person = (name) => {
  this.name = name;
};

const p = new Person("Alice"); // ❌ TypeError: Person is not a constructor
```

🔹 Regular functions should be used for **constructors**.

---

### **🔹 4. Cannot Use `arguments` Object**

- **Arrow functions do not have their own `arguments` object.**
- Instead, they **inherit `arguments` from the parent scope**.

✅ **Example (Using Rest Operator Instead of `arguments`)**

```js
const sum = (...nums) => nums.reduce((acc, num) => acc + num, 0);
console.log(sum(1, 2, 3, 4)); // 10
```

🔹 **Use the spread/rest operator (`...nums`) instead of `arguments`.**

---

## **📌 Summary Table**

```md
| Feature                | Arrow Function (`=>`)             | Regular Function (`function`) |
| ---------------------- | --------------------------------- | ----------------------------- |
| **Syntax**             | Shorter, concise                  | Longer, requires `return`     |
| **Own `this` binding** | ❌ No (`this` is inherited)       | ✅ Yes                        |
| **Usable with `new`?** | ❌ No (Cannot be a constructor)   | ✅ Yes                        |
| **Own `arguments`?**   | ❌ No (Inherits from parent)      | ✅ Yes                        |
| **Best Used For**      | Callbacks, functional programming | Methods, constructors         |
```

---

### **📝 Interviewer: When should you NOT use an arrow function?**

**🧑‍💼 Candidate:**

1. When using **methods inside objects** (use regular functions instead).
2. When using **constructors** (because arrow functions don’t work with `new`).
3. When needing the **`arguments` object** (use rest parameters instead).

### **📝 Interviewer: Can you explain `this` in JavaScript?**

**🧑‍💼 Candidate:**  
Yes! The **`this`** keyword in JavaScript **refers to the object that is executing the function**. Its value depends on **how the function is called, not where it is defined**.

---

## **1️⃣ `this` in Global Scope**

In the **global scope**, `this` refers to:

- The **global object** (`window` in browsers, `global` in Node.js).
- In **strict mode (`"use strict"`)**, `this` is `undefined`.

✅ **Example (Browser Global Scope)**

```js
console.log(this); // In a browser: `window` object
```

✅ **Example (Strict Mode)**

```js
"use strict";
console.log(this); // `undefined`
```

---

## **2️⃣ `this` in Object Methods**

When a function is called as a **method of an object**, `this` refers to the **object that owns the method**.

✅ **Example:**

```js
const user = {
  name: "Alice",
  greet: function () {
    console.log(`Hello, ${this.name}!`); // `this` refers to `user`
  },
};

user.greet(); // Hello, Alice!
```

🔹 `this.name` refers to `"Alice"` because `greet()` is called on `user`.

---

## **3️⃣ `this` in Constructor Functions**

When using a **constructor function**, `this` refers to the **newly created object**.

✅ **Example:**

```js
function Person(name) {
  this.name = name;
}

const p1 = new Person("Bob");
console.log(p1.name); // Bob
```

🔹 `this.name` refers to the new `Person` object.

---

## **4️⃣ `this` in Arrow Functions**

Arrow functions **do not have their own `this`**. Instead, they **inherit `this` from their surrounding lexical scope**.

✅ **Example (Arrow Function Inside Object)**

```js
const user = {
  name: "Alice",
  greet: () => {
    console.log(`Hello, ${this.name}!`); // ❌ `this` is undefined
  },
};

user.greet(); // Hello, undefined!
```

🔹 **Why?** Arrow functions inherit `this` from the **parent scope**, which in this case is the global object (`window` or `undefined` in strict mode).

✅ **Fix: Use a Regular Function**

```js
const user = {
  name: "Alice",
  greet: function () {
    console.log(`Hello, ${this.name}!`);
  },
};

user.greet(); // Hello, Alice!
```

---

## **5️⃣ `this` in Event Listeners**

In **event handlers**, `this` refers to the **element that received the event**.

✅ **Example:**

```js
document.getElementById("btn").addEventListener("click", function () {
  console.log(this); // `this` refers to the clicked button
});
```

🔹 **Arrow functions don’t work well here** because they **inherit `this` from their outer scope (window/global)**.

---

## **6️⃣ Explicit Binding (`call`, `apply`, `bind`)**

We can manually set `this` using **`call()`, `apply()`, or `bind()`**.

### **🔹 `call()` (Pass arguments one by one)**

```js
function greet(city) {
  console.log(`Hello, ${this.name} from ${city}`);
}

const person = { name: "Alice" };

greet.call(person, "New York"); // Hello, Alice from New York
```

### **🔹 `apply()` (Pass arguments as an array)**

```js
greet.apply(person, ["London"]); // Hello, Alice from London
```

### **🔹 `bind()` (Returns a new function)**

```js
const greetPerson = greet.bind(person, "Paris");
greetPerson(); // Hello, Alice from Paris
```

🔹 **`bind()` does not immediately execute the function—it returns a new function instead.**

---

## **📌 Summary Table**

```md
| Context                  | `this` refers to...                                                  |
| ------------------------ | -------------------------------------------------------------------- |
| **Global Scope**         | `window` (browser) or `global` (Node.js), `undefined` in strict mode |
| **Object Method**        | The object that owns the method                                      |
| **Constructor Function** | The newly created object                                             |
| **Arrow Function**       | Inherits `this` from the outer scope                                 |
| **Event Listeners**      | The element that triggered the event                                 |
| **`call()` / `apply()`** | Explicitly set `this`                                                |
| **`bind()`**             | Returns a new function with `this` bound                             |
```

---

### **📝 Interviewer: What is the difference between `call`, `apply`, and `bind`?**

**🧑‍💼 Candidate:**

- **`call(thisArg, arg1, arg2, ...)`** → Calls a function with `this` and arguments separately.
- **`apply(thisArg, [arg1, arg2, ...])`** → Calls a function with `this`, passing arguments as an array.
- **`bind(thisArg, arg1, arg2, ...)`** → Returns a new function with `this` permanently bound.

### **📝 Interviewer: Why do we use `call()`, `apply()`, and `bind()` in JavaScript?**

<details>
<summary>View answer</summary>
**🧑‍💼 Candidate:**  
In JavaScript, `call()`, `apply()`, and `bind()` are used to **explicitly set the value of `this`** inside a function. They help when we want to control which object a function should refer to, rather than relying on the default `this` binding.

---

## **1️⃣ `call()` Method**

- **`call(thisArg, arg1, arg2, ...)`**
- Calls a function **immediately** and explicitly **sets `this`**.
- Passes arguments **one by one**.

✅ **Example: Using `call()`**

```js
function greet(city) {
  console.log(`Hello, my name is ${this.name} and I live in ${city}.`);
}

const person = { name: "Alice" };

greet.call(person, "New York"); // ✅ Explicitly sets `this`
```

🔹 **Here, `this` refers to `person`, not the global object.**

---

## **2️⃣ `apply()` Method**

- **`apply(thisArg, [arg1, arg2, ...])`**
- Same as `call()`, but **arguments are passed as an array**.

✅ **Example: Using `apply()`**

```js
greet.apply(person, ["Los Angeles"]);
```

🔹 **Difference from `call()`?**

- `call()` → Arguments passed **one by one**.
- `apply()` → Arguments passed as **an array**.

### **When to Use `apply()`?**

- When **arguments are already in an array**.

```js
const numbers = [10, 20, 5, 40];

console.log(Math.max.call(null, ...numbers)); // ✅ Using call
console.log(Math.max.apply(null, numbers)); // ✅ Using apply
```

---

## **3️⃣ `bind()` Method**

- **`bind(thisArg, arg1, arg2, ...)`**
- **Does NOT call the function immediately.**
- Instead, it **returns a new function** with `this` permanently bound.

✅ **Example: Using `bind()`**

```js
const boundGreet = greet.bind(person, "Chicago");
boundGreet(); // ✅ Calls later with `this` set to `person`
```

🔹 **When to Use `bind()`?**

- When we need to **save `this` for future use** (e.g., in event handlers, callbacks).

---

## **📌 Key Differences**

```md
| Method      | Calls Immediately? | Arguments          | Returns a Function? |
| ----------- | ------------------ | ------------------ | ------------------- |
| **call()**  | ✅ Yes             | Passed one by one  | ❌ No               |
| **apply()** | ✅ Yes             | Passed as an array | ❌ No               |
| **bind()**  | ❌ No              | Passed one by one  | ✅ Yes              |
```

---

## **4️⃣ Real-World Use Case: `bind()` in Event Handlers**

### **🚫 Problem: Losing `this` in Event Listeners**

```js
const user = {
  name: "Bob",
  showName: function () {
    console.log(this.name);
  },
};

document.getElementById("btn").addEventListener("click", user.showName);
```

🔴 **This will print `undefined` because `this` refers to the button element (`<button>`), not `user`.**

### **✅ Fix: Use `bind()`**

```js
document
  .getElementById("btn")
  .addEventListener("click", user.showName.bind(user));
```

🔹 **Now `this` correctly refers to `user`!**

---

### **📝 Interviewer: When should you use `call()`, `apply()`, or `bind()`?**

**🧑‍💼 Candidate:**

- **Use `call()`** when calling a function **immediately** and passing arguments **one by one**.
- **Use `apply()`** when calling a function **immediately** and passing **arguments as an array**.
- **Use `bind()`** when **you need to return a function with `this` permanently set**, useful for event listeners or callbacks.

</details>
