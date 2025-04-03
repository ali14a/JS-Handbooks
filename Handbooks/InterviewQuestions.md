<!-- TODO: add links-->

# JS

#### What is the difference between **let, const, and var**?

<details>
<summary>View answer</summary>

#### Let, Const, Var

| Feature           | var                                  | let                                         | const                                               |
| ----------------- | ------------------------------------ | ------------------------------------------- | --------------------------------------------------- |
| **Scope**         | Function-scoped                      | Block-scoped                                | Block-scoped                                        |
| **Hoisting**      | Hoisted (initialized as `undefined`) | Hoisted (TDZ, no access before declaration) | Hoisted (TDZ, no access before declaration)         |
| **Reassignment**  | ✅ Allowed                           | ✅ Allowed                                  | ❌ Not allowed                                      |
| **Redeclaration** | ✅ Allowed                           | ❌ Not allowed                              | ❌ Not allowed                                      |
| **Mutability**    | ✅ Mutable                           | ✅ Mutable                                  | ❌ Immutable (but object properties can be changed) |

</details>

#### How does hoisting work in JavaScript? <!-- TODO: add links-->

<details>
<summary>View answer</summary>

Hoisting is a JavaScript mechanism where variable and function declarations are put into memory during the compile phase. This means that no matter where functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local.

However, the value is not hoisted with the declaration.

The following snippet:

```js
console.log(hoist);
var hoist = "value";
```

is equivalent to:

```js
var hoist;
console.log(hoist);
hoist = "value";
```

Therefore logging `hoist` outputs `undefined` to the console, not `"value"`.

Hoisting also allows you to invoke a function declaration before it appears to be declared in a program.

```js
myFunction(); // No error; logs "hello"
function myFunction() {
  console.log("hello");
}
```

But be wary of function expressions that are assigned to a variable:

```js
myFunction(); // Error: `myFunction` is not a function
var myFunction = function () {
  console.log("hello");
};
```

#### Good to hear

- Hoisting is JavaScript’s default behavior of moving declarations to the top
- Functions declarations are hoisted before variable declarations

</details>

#### What is a closure? Can you give a useful example of one?

<details>
<summary>View answer</summary>

A closure is a function defined inside another function and has access to its lexical scope even when it is executing outside its lexical scope. The closure has access to variables in three scopes:

- Variables declared in its own scope
- Variables declared in the scope of the parent function
- Variables declared in the global scope

In JavaScript, all functions are closures because they have access to the outer scope, but most functions don't utilise the usefulness of closures: the persistence of state. Closures are also sometimes called stateful functions because of this.

In addition, closures are the only way to store private data that can't be accessed from the outside in JavaScript. They are the key to the UMD (Universal Module Definition) pattern, which is frequently used in libraries that only expose a public API but keep the implementation details private, preventing name collisions with other libraries or the user's own code.

#### Good to hear

- Closures are useful because they let you associate data with a function that operates on that data.
- A closure can substitute an object with only a single method.
- Closures can be used to emulate private properties and methods.

##### Additional Links

- [MDN docs for closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [What is a closure](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36)
- [I never understood JavaScript closures](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8)

</details>

#### Event Loop

<details>
<summary>View answer</summary>
The **event loop** is a core concept in JavaScript that allows it to handle asynchronous operations despite being single-threaded. It works in conjunction with several key components:

---

### 1. Key Components of the Event Loop

#### 1.1 Call Stack (Execution Stack)

- The **call stack** is a **LIFO** (Last In, First Out) data structure that keeps track of function execution.
- When a function is invoked, it gets **pushed** onto the stack.
- When a function completes, it gets **popped** off the stack.
- JavaScript executes **synchronous** code directly from the call stack.

#### 1.2 Web APIs (Browser APIs or Node APIs)

- Certain functions like `setTimeout`, `fetch`, or `DOM events` are handled outside the call stack by the **Web APIs** (in browsers) or **Node APIs** (in Node.js).
- These APIs process tasks asynchronously and send the results to appropriate queues.

#### 1.3 Callback Queue (Macrotask Queue)

- Once an asynchronous operation (e.g., `setTimeout`, I/O operations) completes, its callback is placed in the **callback queue** (also called the macrotask queue).
- The event loop picks tasks from this queue **only when the call stack is empty**.

#### 1.4 Microtask Queue (Priority Queue)

- Microtasks (e.g., `Promise.then()`, `MutationObserver`, `queueMicrotask()`) are placed in the **microtask queue**.
- The microtask queue is **higher priority than the callback queue**.
  - Before executing the next macrotask, the event loop first **empties the microtask queue**.

---

#### How the Event Loop Works Step by Step

1. **Execute Synchronous Code**:
   - The JavaScript engine executes all **synchronous** code in the **call stack** first.
2. **Process Microtasks**:
   - If there are pending **microtasks** (from Promises, MutationObserver, etc.), they execute before moving to the callback queue.
3. **Process Macrotasks (Callback Queue)**:

   - Once the microtask queue is empty, the event loop picks the first task from the **callback queue (macrotask queue)** and executes it.

4. **Repeat**:
   - This process continues in an infinite loop, ensuring that JavaScript remains non-blocking.

---

#### Example of the Event Loop in Action

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Macrotask: setTimeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Microtask: Promise.then");
});

console.log("End");

Execution Order
"Start" → Call stack (executes immediately).

setTimeout() → Web API handles it, callback goes to the macrotask queue.

Promise.then() → Moves to the microtask queue.

"End" → Call stack (executes immediately).

Microtasks execute first → "Microtask: Promise.then".

Macrotask executes next → "Macrotask: setTimeout".

```

```
Start
End
Microtask: Promise.then
Macrotask: setTimeout
```

#### Why the Event Loop is Important

✅ Prevents blocking: The event loop ensures non-blocking execution, allowing JavaScript to handle I/O, user interactions, and network requests smoothly.<br>
✅ Optimized Performance: Microtasks run before macrotasks, improving the efficiency of UI updates and data fetching.<br>
✅ Single-Threaded Efficiency: JavaScript can simulate multi-threading behavior while actually running in a single-threaded environment

</details>

#### Deep Copy vs. Shallow Copy in JavaScript

<details>
<summary>View answer</summary>

#### What is Copying in JavaScript?

When copying an object or array in JavaScript, we create a **new reference** that points to the original or a **new independent copy**.

- **Shallow Copy** → Copies only the first level, keeping references to nested objects.
- **Deep Copy** → Recursively copies all levels, creating independent nested structures.

---

#### Shallow Copy

A **shallow copy** creates a new object/array but retains references to nested objects. If the nested object is modified, changes reflect in both copies.

#### Example:

```javascript
const original = {
  name: "Alice",
  details: {
    age: 25,
    city: "New York",
  },
};

const shallowCopy = { ...original };

shallowCopy.details.city = "Los Angeles";

console.log(original.details.city); // "Los Angeles" (Modified!)
console.log(shallowCopy.details.city); // "Los Angeles"
```

#### Why?

- The `...` (spread operator) creates a **new object**, but the **nested object (`details`) is still a reference**.
- **Only top-level properties are copied.**

#### Methods to Create a Shallow Copy:

| Method                   | Works With | Notes                                        |
| ------------------------ | ---------- | -------------------------------------------- |
| `Object.assign({}, obj)` | Objects    | Does not copy nested objects.                |
| `{ ...obj }`             | Objects    | Modern ES6 method, but still shallow.        |
| `array.slice()`          | Arrays     | Creates a new array with top-level elements. |
| `array.concat([])`       | Arrays     | Similar to `slice()`, but not deep.          |
| `[...array]`             | Arrays     | ES6 spread, but shallow.                     |

---

#### Deep Copy

A **deep copy** creates a completely independent copy, ensuring no references to the original object.

#### Example:

```javascript
const original = {
  name: "Alice",
  details: {
    age: 25,
    city: "New York",
  },
};

// Deep Copy using JSON methods
const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.details.city = "Los Angeles";

console.log(original.details.city); // "New York" (Unchanged ✅)
console.log(deepCopy.details.city); // "Los Angeles"
```

#### Methods to Create a Deep Copy:

| Method                            | Works With      | Notes                                                 |
| --------------------------------- | --------------- | ----------------------------------------------------- |
| `JSON.parse(JSON.stringify(obj))` | Objects, Arrays | Simple but removes functions and `undefined`.         |
| `structuredClone(obj)`            | Objects, Arrays | Modern deep copy method (available in most browsers). |
| `Lodash _.cloneDeep(obj)`         | Objects, Arrays | Best for deep copies, handles all data types.         |
| **Recursive Function**            | Objects, Arrays | Can manually implement recursion to deep copy.        |

---

#### Shallow vs. Deep Copy Comparison

| Feature                  | Shallow Copy                                | Deep Copy                                                            |
| ------------------------ | ------------------------------------------- | -------------------------------------------------------------------- |
| **Top-level properties** | ✅ Copied                                   | ✅ Copied                                                            |
| **Nested objects**       | 🔗 Referenced                               | ✅ Copied recursively                                                |
| **Independent copy?**    | ❌ No                                       | ✅ Yes                                                               |
| **Performance**          | 🔥 Fast                                     | 🐢 Slower (depends on size)                                          |
| **Methods**              | `Object.assign()`, `{ ...obj }`, `[...arr]` | `JSON.parse(JSON.stringify())`, `structuredClone()`, `_.cloneDeep()` |

---

#### When to Use Which?

- **Use Shallow Copy** when:

  - Your object **does not** have nested structures.
  - Performance is critical, and you just need a top-level copy.

- **Use Deep Copy** when:
  - You need to modify nested objects **without affecting the original**.
  - Your data structure has **multiple levels of nesting**.

---

</details>

### Debouncing, Throttling, and Event Propagation in JavaScript

<details>
<summary>View answer</summary>

#### Introduction

When handling **event-driven actions** like scrolling, resizing, and user input, optimizing performance is essential.  
We use **debouncing** and **throttling** to **control function execution**, and we use **event propagation** to manage event bubbling and capturing.

#### **Key Concepts**

- **Debouncing** → Delays function execution until after a pause.
- **Throttling** → Ensures a function runs **at most** once in a fixed time interval.
- **Event Propagation** → Controls how events travel through the **DOM tree** (bubbling & capturing).

---

#### What is Debouncing?

Debouncing ensures that a function executes **only after a set delay** once the event stops firing.

#### **Use Cases**

- **Search Input** → Calls API **only after** the user stops typing.
- **Window Resize** → Triggers the resize event **after** resizing ends.

#### **Implementation**

```javascript
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Example: Debounce a search input
document.getElementById("search").addEventListener(
  "input",
  debounce((e) => {
    console.log("Searching for:", e.target.value);
  }, 500)
); // Runs 500ms after typing stops
```

#### **How it Works**

- If the function is **called again** within `delay` milliseconds, it cancels the previous call.
- The function **executes only** after the event stops firing.

---

#### What is Throttling?

Throttling ensures that a function **executes at most once per interval**, even if the event triggers continuously.

#### **Use Cases**

- **Scrolling Event** → Runs a function **at most** once per second while scrolling.
- **Button Click Prevention** → Prevents multiple clicks in quick succession.

#### **Implementation**

```javascript
function throttle(func, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}

// Example: Throttle a scroll event
window.addEventListener(
  "scroll",
  throttle(() => {
    console.log("Scrolling...");
  }, 1000)
); // Runs at most once per second
```

#### **How it Works**

- The function **executes immediately** on the first call.
- Subsequent calls **within the interval** are ignored.
- Executes **again only after** the interval has passed.

---

#### What is Event Propagation?

When an event occurs on an element, it **travels through the DOM tree** in a process called **event propagation**.  
There are **three phases**:

1. **Capturing Phase** → Event travels **from the root to the target**.
2. **Target Phase** → Event **reaches the target element**.
3. **Bubbling Phase** → Event **bubbles up** from the target to the root.

#### **Example: Bubbling and Capturing**

Consider this HTML:

```html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```

Now, let's attach event listeners:

```javascript
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent Clicked (Bubbling)");
});

document.getElementById("child").addEventListener("click", (e) => {
  console.log("Child Clicked");
});
```

#### **Bubbling Example**

- Clicking the **button** logs:
  ```
  Child Clicked
  Parent Clicked (Bubbling)
  ```
- The event travels **upwards** from `child` → `parent`.

#### **Capturing Example**

To listen in the **capturing phase**, pass `{ capture: true }`:

```javascript
document.getElementById("parent").addEventListener(
  "click",
  () => {
    console.log("Parent Clicked (Capturing)");
  },
  true
);
```

Now, clicking the **button** logs:

```
Parent Clicked (Capturing)
Child Clicked
```

- The event travels **downwards** from `parent` → `child`.

#### **Stopping Propagation**

Use `event.stopPropagation()` to **prevent bubbling or capturing**:

```javascript
document.getElementById("child").addEventListener("click", (e) => {
  console.log("Child Clicked");
  e.stopPropagation(); // Prevents event from bubbling up
});
```

Now, clicking `child` logs **only**:

```
Child Clicked
```

- The event **does not reach** `parent`.

---

#### Debouncing vs. Throttling vs. Event Propagation

| Feature              | Debouncing                            | Throttling                                      | Event Propagation                             |
| -------------------- | ------------------------------------- | ----------------------------------------------- | --------------------------------------------- |
| **Purpose**          | Delays execution after a pause        | Ensures function runs at most once per interval | Controls how events flow in the DOM           |
| **Common Use Cases** | Typing, search input, form validation | Scroll events, API rate-limiting                | Handling nested elements (bubbling/capturing) |
| **Control Type**     | Executes **after delay**              | Executes **at fixed intervals**                 | Determines event flow direction               |

---

#### When to Use What?

- **Use Debouncing** when you need to **wait** for a user to **finish an action**.
- **Use Throttling** when you need to **limit execution** of frequent events.
- **Use Event Propagation** to manage **how events travel** through DOM elements.

---

#### Conclusion

- **Debouncing and Throttling** optimize performance by **reducing unnecessary function calls**.
- **Event Propagation** determines **how events are handled** in the DOM.
- **Understanding all three** is crucial for **efficient event management** in JavaScript.

---

</details>

### What is Prototype and Prototype Chaining?

<details>
<summary>View answer</summary>
#### **Prototype**
- Every JavaScript object has an internal property called `[[Prototype]]`, which points to another object.
- This object is called the **prototype**.
- Prototypes are used to share properties and methods between objects.

#### **Example**:

```javascript
const obj = { name: "Alice" };
console.log(obj.toString()); // Inherited from Object.prototype
```

#### **Prototype Chaining**

- **Prototype chaining** is a mechanism where an object can inherit properties and methods from another object through its prototype.
- If a property or method is not found on the object itself, JavaScript looks up the prototype chain until it finds the property or reaches the end of the chain (`null`).

#### **Example**:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hello, my name is ${this.name}`;
};

const alice = new Person("Alice");

console.log(alice.greet()); // "Hello, my name is Alice"
console.log(alice.toString()); // Inherited from Object.prototype
console.log(Object.getPrototypeOf(alice) === Person.prototype); // true
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null
```

#### **Key Points**:

- The prototype chain ends when `[[Prototype]]` is `null`.
- Methods like `toString` are inherited from `Object.prototype` if not overridden.
- Prototype chaining enables reusability and efficient memory usage.

</details>

### What is currying, and why is it useful?

<details>
<summary>View answer</summary>

#### **Currying**

- **Currying** is a technique in functional programming where a function is transformed into a sequence of functions, each taking a single argument.
- Instead of taking all arguments at once, the curried function takes them one at a time.

#### **Example**:

```javascript
// Regular function
function add(a, b) {
  return a + b;
}

// Curried version
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}

const add5 = curriedAdd(5);
console.log(add5(3)); // 8
console.log(curriedAdd(2)(4)); // 6
```

#### **Why is Currying Useful?**

1. **Reusability**:

   - Curried functions allow partial application of arguments, making them reusable for different scenarios.
   - Example:
     ```javascript
     const multiply = (a) => (b) => a * b;
     const double = multiply(2);
     console.log(double(5)); // 10
     ```

2. **Function Composition**:

   - Currying simplifies function composition, enabling the creation of more modular and readable code.

3. **Avoid Repetition**:

   - Currying helps avoid repeating common arguments in multiple function calls.

4. **Improved Readability**:
   - Breaking down functions into smaller, single-argument functions makes the code easier to understand.

#### **Key Points**:

- Currying does not call the function immediately; it returns a series of functions.
- It is particularly useful in scenarios where functions are reused with some fixed arguments.

#### **Additional Links**:

- [MDN: Function Currying](https://developer.mozilla.org/en-US/docs/Glossary/Currying)
- [Currying in JavaScript](https://javascript.info/currying-partials)

</details>

#### What are JavaScript promises, and how do they work?

<details>
<summary>View answer</summary>

#### **Promises in JavaScript**

- A **promise** is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
- Promises provide a cleaner and more readable way to handle asynchronous code compared to callbacks.

#### **States of a Promise**

1. **Pending**: The initial state, neither fulfilled nor rejected.
2. **Fulfilled**: The operation completed successfully, and the promise has a resulting value.
3. **Rejected**: The operation failed, and the promise has a reason for the failure.

#### **Example**:

```javascript
const promise = new Promise((resolve, reject) => {
  const success = true; // Simulate success or failure
  if (success) {
    resolve("Operation succeeded!");
  } else {
    reject("Operation failed!");
  }
});

promise
  .then((result) => {
    console.log(result); // Logs: "Operation succeeded!"
  })
  .catch((error) => {
    console.error(error); // Logs: "Operation failed!" if rejected
  });
```

#### **How Promises Work**

- A promise is created using the `Promise` constructor, which takes a function with two arguments: `resolve` and `reject`.
- Use `.then()` to handle the resolved value and `.catch()` to handle errors.
- Promises are chainable, allowing multiple asynchronous operations to be handled in sequence.

#### **Chaining Promises**:

```javascript
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => {
    console.log("Data received:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

#### **Why Use Promises?**

1. **Avoid Callback Hell**:
   - Promises make asynchronous code more readable and maintainable.
2. **Error Handling**:
   - Errors can be caught using `.catch()` at the end of the chain.
3. **Composability**:
   - Promises can be chained and combined using methods like `Promise.all()` and `Promise.race()`.

#### **Key Methods**

| Method              | Description                                                                        |
| ------------------- | ---------------------------------------------------------------------------------- |
| `Promise.all()`     | Resolves when all promises in an array resolve, or rejects if any promise rejects. |
| `Promise.race()`    | Resolves or rejects as soon as the first promise in an array resolves or rejects.  |
| `Promise.resolve()` | Creates a promise that resolves with a given value.                                |
| `Promise.reject()`  | Creates a promise that rejects with a given reason.                                |

#### **Example with `Promise.all`**:

```javascript
const promise1 = Promise.resolve(10);
const promise2 = Promise.resolve(20);
const promise3 = Promise.resolve(30);

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values); // [10, 20, 30]
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

#### **Additional Links**

- [MDN: Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [JavaScript.info: Promises](https://javascript.info/promise-basics)

</details>

#### What is async/await, and how is it different from promises?

<details>
<summary>View answer</summary>

#### **Async/Await**

- **Async/await** is a syntactic sugar built on top of promises, introduced in ES2017 (ES8), to make asynchronous code easier to read and write.
- It allows you to write asynchronous code that looks synchronous.

#### **How It Works**

1. **`async` Function**:

   - Declaring a function as `async` makes it return a promise.
   - Inside an `async` function, you can use the `await` keyword.

2. **`await` Keyword**:
   - The `await` keyword pauses the execution of the `async` function until the promise is resolved or rejected.
   - It can only be used inside `async` functions.

#### **Example**:

```javascript
// Using Promises
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched!"), 1000);
  });
}

fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// Using Async/Await
async function fetchDataAsync() {
  try {
    const data = await fetchData();
    console.log(data); // Logs: "Data fetched!"
  } catch (error) {
    console.error(error);
  }
}

fetchDataAsync();
```

#### **Key Differences Between Promises and Async/Await**

| Feature            | Promises                                   | Async/Await                              |
| ------------------ | ------------------------------------------ | ---------------------------------------- |
| **Syntax**         | Uses `.then()` and `.catch()` for chaining | Uses `async` and `await` for readability |
| **Readability**    | Can become hard to read with nested chains | Looks synchronous and is easier to read  |
| **Error Handling** | Uses `.catch()`                            | Uses `try/catch` blocks                  |
| **Execution Flow** | Executes asynchronously                    | Pauses execution with `await`            |

#### **Why Use Async/Await?**

1. **Improved Readability**:
   - Async/await eliminates the need for chaining `.then()` and `.catch()`, making the code more readable.
2. **Error Handling**:
   - Errors can be caught using `try/catch`, which is more intuitive than `.catch()`.
3. **Sequential Execution**:
   - Async/await makes it easier to write code that executes asynchronous operations in sequence.

#### **Example with Sequential Execution**:

```javascript
async function processTasks() {
  const task1 = await fetch("https://api.example.com/task1");
  const task2 = await fetch("https://api.example.com/task2");
  console.log("Tasks completed:", task1, task2);
}

processTasks();
```

#### **Example with Parallel Execution**:

```javascript
async function processTasksInParallel() {
  const [task1, task2] = await Promise.all([
    fetch("https://api.example.com/task1"),
    fetch("https://api.example.com/task2"),
  ]);
  console.log("Tasks completed:", task1, task2);
}

processTasksInParallel();
```

#### **Key Points**:

- Async/await is built on promises, so understanding promises is essential.
- Use `try/catch` for error handling in async/await.
- For parallel execution, combine async/await with `Promise.all()`.

#### **Additional Links**:

- [MDN: Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises#async_and_await)
- [JavaScript.info: Async/Await](https://javascript.info/async-await)

</details>

## Advanced JavaScript Concepts

### Explain the difference between call, apply, and bind in JavaScript.

<details>
<summary>View answer</summary>

#### **Call, Apply, and Bind**

- These methods are used to set the `this` context of a function.

| Method  | Description                                                                   | Syntax Example                           |
| ------- | ----------------------------------------------------------------------------- | ---------------------------------------- |
| `call`  | Invokes the function immediately with arguments passed individually.          | `func.call(thisArg, arg1, arg2, ...)`    |
| `apply` | Invokes the function immediately with arguments passed as an array.           | `func.apply(thisArg, [arg1, arg2, ...])` |
| `bind`  | Returns a new function with `this` bound, but does not invoke it immediately. | `const boundFunc = func.bind(thisArg)`   |

#### **Example**:

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "Alice" };

// Using call
console.log(greet.call(person, "Hello", "!")); // "Hello, Alice!"

// Using apply
console.log(greet.apply(person, ["Hi", "."])); // "Hi, Alice."

// Using bind
const boundGreet = greet.bind(person, "Hey");
console.log(boundGreet("?")); // "Hey, Alice?"
```

#### **Key Points**:

- Use `call` and `apply` for immediate invocation.
- Use `bind` when you need a new function with a specific `this` context.

</details>

### What are WeakMap and WeakSet in JavaScript?

<details>
<summary>View answer</summary>

#### **WeakMap**

- A `WeakMap` is a collection of key-value pairs where keys are **weakly referenced objects**.
- Keys must be objects, and they are eligible for garbage collection if no other references exist.

#### **WeakSet**

- A `WeakSet` is a collection of **unique objects** that are weakly referenced.
- Like `WeakMap`, objects in a `WeakSet` are eligible for garbage collection.

#### **Example**:

```javascript
let obj = { name: "Alice" };

const weakMap = new WeakMap();
weakMap.set(obj, "Some value");

const weakSet = new WeakSet();
weakSet.add(obj);

obj = null; // The object is now eligible for garbage collection
```

#### **Key Points**:

- Weak references prevent memory leaks.
- `WeakMap` and `WeakSet` do not prevent garbage collection.
- They do not have methods like `size`, `keys`, or `values`.

</details>

### How does Garbage Collection work in JavaScript?

<details>
<summary>View answer</summary>

#### **Garbage Collection**

- JavaScript uses **automatic garbage collection** to manage memory.
- The **Mark-and-Sweep Algorithm** is the most common technique:
  1. Objects that are no longer reachable are marked for garbage collection.
  2. The memory occupied by these objects is reclaimed.

#### **Example**:

```javascript
let obj = { name: "Alice" };
obj = null; // The object is no longer reachable and will be garbage collected.
```

#### **Key Points**:

- Circular references can cause memory leaks.
- Use tools like Chrome DevTools to monitor memory usage.

</details>

### What is memoization, and how can you implement it?

<details>
<summary>View answer</summary>

#### **Memoization**

- Memoization is an optimization technique where the results of expensive function calls are cached for reuse.

#### **Example**:

```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const factorial = memoize((n) => (n <= 1 ? 1 : n * factorial(n - 1)));

console.log(factorial(5)); // 120
console.log(factorial(5)); // Cached result: 120
```

#### **Key Points**:

- Reduces redundant computations.
- Useful for recursive functions like Fibonacci or factorial.

</details>

### What is the difference between map, filter, and reduce?

<details>
<summary>View answer</summary>

#### **Map**

- Transforms each element in an array and returns a new array.

```javascript
const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2); // [2, 4, 6]
```

#### **Filter**

- Filters elements based on a condition and returns a new array.

```javascript
const nums = [1, 2, 3];
const evens = nums.filter((n) => n % 2 === 0); // [2]
```

#### **Reduce**

- Reduces an array to a single value by applying a function.

```javascript
const nums = [1, 2, 3];
const sum = nums.reduce((acc, n) => acc + n, 0); // 6
```

#### **Key Points**:

- `map` transforms, `filter` selects, and `reduce` aggregates.

</details>

### How do you optimize a highly recursive function in JavaScript?

<details>
<summary>View answer</summary>

#### **Optimization Techniques**

1. **Memoization**:
   - Cache results of previous computations.
2. **Tail Call Optimization**:
   - Use tail recursion to optimize stack usage.
3. **Convert to Iterative**:
   - Replace recursion with loops.

#### **Example with Memoization**:

```javascript
function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(10)); // 55
```

</details>

### What are generator functions, and how do they work?

<details>
<summary>View answer</summary>

#### **Generator Functions**

- A generator function is a special type of function that can pause and resume execution.
- Defined using the `function*` syntax.

#### **Example**:

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```

#### **Key Points**:

- Use `yield` to pause execution.
- Use `.next()` to resume execution.

</details>

### Explain the difference between deep and shallow equality checks.

<details>
<summary>View answer</summary>

#### **Shallow Equality**

- Compares references for objects and values for primitives.

```javascript
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj2); // false (different references)
```

#### **Deep Equality**

- Compares the structure and values of objects recursively.

```javascript
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
}

console.log(deepEqual({ a: 1 }, { a: 1 })); // true
```

</details>

### What is the difference between synchronous and asynchronous code execution?

<details>
<summary>View answer</summary>

#### **Synchronous Execution**

- Code is executed line by line, blocking further execution until the current task completes.

#### **Asynchronous Execution**

- Code does not block; tasks are executed in the background, and callbacks or promises handle the results.

#### **Example**:

```javascript
// Synchronous
console.log("Start");
console.log("End");

// Asynchronous
console.log("Start");
setTimeout(() => console.log("Async Task"), 1000);
console.log("End");
```

#### **Output**:

```
Start
End
Async Task
```

</details>

### How do you prevent memory leaks in JavaScript?

<details>
<summary>View answer</summary>

#### **Common Causes of Memory Leaks**

1. **Global Variables**:
   - Avoid unintentional global variables.
2. **Event Listeners**:
   - Remove listeners when they are no longer needed.
3. **Closures**:
   - Avoid retaining unnecessary references in closures.

#### **Prevention Techniques**

- Use `WeakMap` or `WeakSet` for weak references.
- Use tools like Chrome DevTools to monitor memory usage.

#### **Example**:

```javascript
function createListener() {
  const element = document.getElementById("button");
  const handler = () => console.log("Clicked");
  element.addEventListener("click", handler);

  // Remove listener to prevent memory leak
  return () => element.removeEventListener("click", handler);
}

const removeListener = createListener();
removeListener();
```

</details>

## React Native Technical Questions

## React Native Basics

### What are the differences between ReactJS and React Native?

<details>
<summary>View answer</summary>

#### **ReactJS**

- A JavaScript library for building web applications.
- Uses **HTML** and **CSS** for rendering UI.
- Runs in the browser.

#### **React Native**

- A framework for building mobile applications.
- Uses **native components** instead of HTML elements.
- Runs on mobile platforms (iOS and Android).

#### **Key Differences**:

| Feature        | ReactJS        | React Native                    |
| -------------- | -------------- | ------------------------------- |
| **Platform**   | Web            | Mobile                          |
| **Rendering**  | DOM            | Native components               |
| **Styling**    | CSS            | Stylesheets (similar to CSS)    |
| **Navigation** | React Router   | React Navigation or Native APIs |
| **Animation**  | CSS animations | Animated API                    |

</details>

### Explain the React Native rendering lifecycle.

<details>
<summary>View answer</summary>

#### **React Native Rendering Lifecycle**

1. **Mounting Phase**:

   - Components are initialized and added to the UI.
   - Lifecycle methods:
     - `constructor()`
     - `componentDidMount()`

2. **Updating Phase**:

   - Triggered when props or state change.
   - Lifecycle methods:
     - `shouldComponentUpdate()`
     - `componentDidUpdate()`

3. **Unmounting Phase**:
   - Components are removed from the UI.
   - Lifecycle method:
     - `componentWillUnmount()`

#### **Key Points**:

- React Native uses a virtual DOM for efficient updates.
- The rendering lifecycle is similar to ReactJS but optimized for mobile.

</details>

### What is the React Native bridge, and how does it work?

<details>
<summary>View answer</summary>

#### **React Native Bridge**

- The bridge is a communication layer between JavaScript and native code (iOS/Android).
- It allows JavaScript to call native APIs and vice versa.

#### **How It Works**:

1. JavaScript code sends messages to the bridge.
2. The bridge translates these messages into native code.
3. Native code executes the operation and sends the result back to JavaScript.

#### **Example**:

- Accessing the camera or GPS requires native modules via the bridge.

#### **Key Points**:

- The bridge enables React Native to use native features.
- It can introduce performance overhead for frequent communication.

</details>

### How does React Native handle UI updates differently from ReactJS?

<details>
<summary>View answer</summary>

#### **ReactJS**

- Updates the DOM using a virtual DOM for efficient rendering.

#### **React Native**

- Updates the UI by communicating with native components via the bridge.
- Uses a shadow tree to calculate layout changes.

#### **Key Points**:

- React Native does not use a browser DOM.
- UI updates are optimized for mobile performance.

</details>

### What are the advantages of using TypeScript in React Native?

<details>
<summary>View answer</summary>

#### **Advantages of TypeScript**

1. **Type Safety**:

   - Prevents runtime errors by catching type errors during development.

2. **Improved Code Readability**:

   - Makes code easier to understand with explicit types.

3. **Better Tooling**:

   - Provides autocompletion and better IDE support.

4. **Refactoring**:

   - Simplifies refactoring with type checking.

5. **Community Support**:
   - Many React Native libraries support TypeScript.

#### **Example**:

```typescript
type Props = {
  name: string;
  age: number;
};

const Greeting: React.FC<Props> = ({ name, age }) => {
  return (
    <Text>
      Hello, {name}. You are {age} years old.
    </Text>
  );
};
```

</details>

## React Native Navigation

### What are the key differences between Stack Navigator, Tab Navigator, and Drawer Navigator?

<details>
<summary>View answer</summary>

#### **Stack Navigator**

- Organizes screens in a stack (like a call stack).
- Allows navigation back and forth between screens.
- Example: Navigating between a login screen and a home screen.

#### **Tab Navigator**

- Displays tabs at the bottom or top of the screen for switching between screens.
- Example: Switching between "Home," "Profile," and "Settings."

#### **Drawer Navigator**

- Provides a side menu (drawer) for navigation.
- Example: Accessing app sections like "Dashboard," "Notifications," and "Settings."

#### **Key Differences**:

| Feature      | Stack Navigator       | Tab Navigator          | Drawer Navigator         |
| ------------ | --------------------- | ---------------------- | ------------------------ |
| **UI**       | Stack-based           | Tabs                   | Side Drawer              |
| **Use Case** | Sequential navigation | Quick screen switching | Section-based navigation |
| **Example**  | Login flow            | Social media tabs      | App menu                 |

</details>

### How would you handle deep linking in a React Native app?

<details>
<summary>View answer</summary>

#### **Deep Linking**

- Deep linking allows users to open specific screens in the app using URLs.

#### **Steps to Handle Deep Linking**:

1. **Configure URL Schemes**:

   - For iOS: Add URL schemes in `Info.plist`.
   - For Android: Add intent filters in `AndroidManifest.xml`.

2. **Use React Navigation**:

   - Configure deep linking in the navigation container.

   ```javascript
   const linking = {
     prefixes: ["myapp://"],
     config: {
       screens: {
         Home: "home",
         Profile: "profile/:id",
       },
     },
   };

   <NavigationContainer linking={linking}>
     {/* Navigators */}
   </NavigationContainer>;
   ```

3. **Handle Incoming Links**:
   - Use `Linking` API to listen for incoming links.

#### **Example**:

```javascript
import { Linking } from "react-native";

useEffect(() => {
  const handleDeepLink = (event) => {
    const url = event.url;
    console.log("Deep link URL:", url);
  };

  Linking.addEventListener("url", handleDeepLink);

  return () => {
    Linking.removeEventListener("url", handleDeepLink);
  };
}, []);
```

</details>

### How do you persist navigation state across app restarts?

<details>
<summary>View answer</summary>

#### **Persisting Navigation State**

- Use `AsyncStorage` to save and restore navigation state.

#### **Example**:

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";

<NavigationContainer
  onStateChange={(state) =>
    AsyncStorage.setItem("NAVIGATION_STATE", JSON.stringify(state))
  }
  initialState={async () => {
    const savedState = await AsyncStorage.getItem("NAVIGATION_STATE");
    return savedState ? JSON.parse(savedState) : undefined;
  }}
>
  {/* Navigators */}
</NavigationContainer>;
```

#### **Key Points**:

- Save the navigation state on changes.
- Restore the state during app initialization.

</details>

### What are the performance optimizations for React Navigation?

<details>
<summary>View answer</summary>

#### **Optimizations**

1. **Lazy Loading Screens**:

   - Load screens only when they are accessed.

   ```javascript
   <Stack.Screen
     name="Profile"
     component={ProfileScreen}
     options={{ lazy: true }}
   />
   ```

2. **Avoid Unnecessary Re-renders**:

   - Use `React.memo` or `useCallback` for components inside navigators.

3. **Use `detachInactiveScreens`**:

   - For stack navigators, detach inactive screens to save memory.

   ```javascript
   <Stack.Navigator detachInactiveScreens={true}>
     {/* Screens */}
   </Stack.Navigator>
   ```

4. **Optimize Animations**:
   - Use native driver for animations.

#### **Key Points**:

- Optimize navigation transitions.
- Avoid keeping unnecessary screens in memory.

</details>

## Performance Optimization in React Native

### How do you optimize FlatList performance in React Native?

<details>
<summary>View answer</summary>

#### **Optimizations**

1. **Use `keyExtractor`**:

   - Provide a unique key for each item.

2. **Enable `windowSize`**:

   - Adjust the number of items rendered outside the viewport.

3. **Use `getItemLayout`**:

   - Predefine item heights for faster rendering.

4. **Avoid Inline Functions**:
   - Use `useCallback` for `renderItem` and `onEndReached`.

#### **Example**:

```javascript
<FlatList
  data={data}
  keyExtractor={(item) => item.id.toString()}
  renderItem={useCallback(
    ({ item }) => (
      <ItemComponent item={item} />
    ),
    []
  )}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  windowSize={5}
/>
```

</details>

### How do you prevent unnecessary re-renders in React Native?

<details>
<summary>View answer</summary>

#### **Techniques**

1. **Use `React.memo`**:

   - Prevent re-renders for functional components.

   ```javascript
   const MyComponent = React.memo(({ prop }) => {
     return <Text>{prop}</Text>;
   });
   ```

2. **Use `useCallback` and `useMemo`**:

   - Memoize functions and values.

3. **Avoid Inline Functions**:

   - Define functions outside render methods.

4. **Optimize Context Usage**:
   - Avoid passing unnecessary values in context.

</details>

### What is the difference between React.memo and useCallback?

<details>
<summary>View answer</summary>

#### **React.memo**

- Prevents re-renders of a component if its props have not changed.

#### **useCallback**

- Memoizes a function to avoid re-creating it on every render.

#### **Example**:

```javascript
const MyComponent = React.memo(({ onClick }) => {
  return <Button onPress={onClick} />;
});

const Parent = () => {
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);

  return <MyComponent onClick={handleClick} />;
};
```

#### **Key Points**:

- Use `React.memo` for components.
- Use `useCallback` for functions.

</details>

### How would you reduce app bundle size in React Native?

<details>
<summary>View answer</summary>

#### **Techniques**

1. **Remove Unused Dependencies**:

   - Use tools like `depcheck` to identify unused packages.

2. **Enable Proguard**:

   - Minify and obfuscate code for Android.

3. **Use Hermes**:

   - Enable Hermes for JavaScript optimization.

4. **Optimize Images**:

   - Compress images and use appropriate formats.

5. **Code Splitting**:
   - Dynamically load modules when needed.

</details>

### How do you improve React Native startup time?

<details>
<summary>View answer</summary>

#### **Techniques**

1. **Enable Hermes**:

   - Reduces JavaScript parsing time.

2. **Lazy Load Screens**:

   - Load screens only when accessed.

3. **Optimize Assets**:

   - Compress and bundle assets.

4. **Reduce Native Module Initialization**:
   - Avoid initializing unused native modules.

</details>

### What are Hermes and JSI, and how do they improve performance?

<details>
<summary>View answer</summary>

#### **Hermes**

- A JavaScript engine optimized for React Native.
- Reduces app size and improves startup time.

#### **JSI (JavaScript Interface)**

- A new architecture for bridging JavaScript and native code.
- Improves performance by reducing bridge overhead.

#### **Key Points**:

- Hermes is ideal for low-end devices.
- JSI enables direct communication between JavaScript and native code.

</details>

## State Management in React Native

### Compare Redux, Recoil, and Zustand for state management in React Native.

<details>
<summary>View answer</summary>

#### **Redux**

- Centralized state management.
- Requires boilerplate code.

#### **Recoil**

- Simplifies state management with atoms and selectors.
- Ideal for React-based apps.

#### **Zustand**

- Minimalistic state management.
- Uses hooks for simplicity.

#### **Key Differences**:

| Feature            | Redux | Recoil   | Zustand   |
| ------------------ | ----- | -------- | --------- |
| **Boilerplate**    | High  | Moderate | Low       |
| **Learning Curve** | Steep | Moderate | Easy      |
| **Performance**    | Good  | Good     | Excellent |

</details>

### What are the best practices for managing global state in React Native?

<details>
<summary>View answer</summary>

#### **Best Practices**

1. **Use Context API for Small Apps**:

   - Avoid over-engineering for simple state management.

2. **Use Redux or Zustand for Large Apps**:

   - Centralize state for better scalability.

3. **Avoid Overusing Global State**:

   - Keep local state where possible.

4. **Memoize Selectors**:
   - Use libraries like `reselect` for efficient state selection.

</details>

### How would you structure a Redux store for a large-scale application?

<details>
<summary>View answer</summary>

#### **Structure**

1. **Feature-Based Folders**:

   - Organize files by feature (e.g., `auth`, `profile`).

2. **Use Slices**:

   - Use `redux-toolkit` to create slices for each feature.

3. **Combine Reducers**:
   - Use `combineReducers` to manage multiple slices.

#### **Example**:

```
src/
  store/
    auth/
      authSlice.js
    profile/
      profileSlice.js
    store.js
```

</details>

### Explain the differences between redux-thunk and redux-saga.

<details>
<summary>View answer</summary>

#### **Redux-Thunk**

- Middleware for handling asynchronous actions.
- Uses functions to dispatch actions.

#### **Redux-Saga**

- Middleware for managing side effects.
- Uses generator functions for better control.

#### **Key Differences**:

| Feature        | Redux-Thunk        | Redux-Saga        |
| -------------- | ------------------ | ----------------- |
| **Complexity** | Low                | High              |
| **Use Case**   | Simple async logic | Complex workflows |

</details>

### How do you handle persisting state between app sessions?

<details>
<summary>View answer</summary>

#### **Techniques**

1. **Use AsyncStorage**:

   - Save and load state from storage.

2. **Use Redux Persist**:
   - Automatically persist Redux state.

#### **Example with Redux Persist**:

```javascript
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
```

</details>

## React Native Native Modules & Platform-Specific Code

### How do you create a custom native module in React Native?

<details>
<summary>View answer</summary>

#### **Steps**

1. **Create Native Code**:

   - Write native code in Java/Kotlin (Android) or Objective-C/Swift (iOS).

2. **Expose Methods**:

   - Use `@ReactMethod` (Android) or `RCT_EXPORT_METHOD` (iOS) to expose methods.

3. **Link Module**:
   - Link the native module to the React Native app.

#### **Example**:

- Android:

```java
@ReactMethod
public void showToast(String message) {
  Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
}
```

</details>

### How do you handle platform-specific UI differences?

<details>
<summary>View answer</summary>

#### **Techniques**

1. **Platform-Specific Files**:

   - Use `.ios.js` and `.android.js` extensions.

2. **Platform Module**:

   - Use `Platform` API to conditionally render components.

   ```javascript
   import { Platform } from "react-native";

   const Button = Platform.OS === "ios" ? IOSButton : AndroidButton;
   ```

</details>

### What are the challenges in bridging JavaScript and native code?

<details>
<summary>View answer</summary>

#### **Challenges**

1. **Performance Overhead**:

   - Frequent communication between JavaScript and native code can slow down the app.

2. **Debugging**:

   - Debugging native code requires platform-specific tools.

3. **Compatibility**:
   - Ensuring compatibility across iOS and Android can be challenging.

</details>

### How do you debug native crashes in React Native apps?

<details>
<summary>View answer</summary>

#### **Techniques**

1. **Use Native Debugging Tools**:

   - Android: Use Logcat.
   - iOS: Use Xcode's debugger.

2. **Analyze Crash Logs**:

   - Use tools like Firebase Crashlytics for detailed crash reports.

3. **Enable Symbolication**:
   - Symbolicate stack traces for better readability.

</details>

### How do you integrate a third-party native SDK into React Native?

<details>
<summary>View answer</summary>

#### **Steps**

1. **Install SDK**:

   - Add the SDK to the native project (e.g., Gradle for Android, CocoaPods for iOS).

2. **Create a Native Module**:

   - Wrap the SDK's functionality in a native module.

3. **Expose Methods**:

   - Use `@ReactMethod` or `RCT_EXPORT_METHOD` to expose SDK methods.

4. **Link Module**:
   - Link the native module to the React Native app.

</details>

## React Native Real-World Scenarios

#### Your app is crashing in production but works fine in development. How do you debug it?

<details>
<summary>View answer</summary>

#### **Steps to Debug Production Crashes**

1. **Enable Crash Reporting**:

   - Use tools like **Firebase Crashlytics**, **Sentry**, or **Bugsnag** to capture crash logs in production.

2. **Analyze Crash Logs**:

   - Retrieve crash logs from the crash reporting tool or device logs (e.g., Logcat for Android, Xcode for iOS).
   - Look for stack traces and error messages to identify the root cause.

3. **Symbolicate Stack Traces**:

   - Use symbolication to convert minified stack traces into readable code.
   - For iOS: Use Xcode's symbolication tools.
   - For Android: Use `proguard` mapping files.

4. **Reproduce the Issue**:

   - Try to replicate the crash in a production-like environment (e.g., release build on a physical device).

5. **Check for Environment-Specific Issues**:

   - Verify API keys, configurations, or third-party services that may differ between development and production.

6. **Debug Native Code**:
   - If the crash is in native code, use platform-specific debugging tools like Logcat (Android) or Xcode (iOS).

#### **Key Points**:

- Always test release builds on physical devices before deploying to production.
- Use crash reporting tools to monitor and resolve production issues efficiently.

</details>

#### You need to implement push notifications. How would you do it?

<details>
<summary>View answer</summary>

#### **Steps to Implement Push Notifications**

1. **Choose a Push Notification Service**:

   - Use services like **Firebase Cloud Messaging (FCM)** or **OneSignal**.

2. **Set Up Firebase**:

   - Create a Firebase project and add your app (iOS and Android).
   - Download the `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) files and add them to your project.

3. **Install React Native Push Notification Library**:

   - Use libraries like `react-native-push-notification` or `@react-native-firebase/messaging`.

4. **Configure Android**:

   - Add the Firebase configuration file (`google-services.json`) to the `android/app` directory.
   - Update `build.gradle` files to include Firebase dependencies.

5. **Configure iOS**:

   - Add the Firebase configuration file (`GoogleService-Info.plist`) to the Xcode project.
   - Enable push notifications and background modes in Xcode.

6. **Handle Notifications in the App**:
   - Use the library's API to handle incoming notifications and display them to the user.

#### **Example**:

```javascript
import messaging from "@react-native-firebase/messaging";

useEffect(() => {
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    console.log("Notification received:", remoteMessage);
  });

  return unsubscribe;
}, []);
```

#### **Key Points**:

- Test push notifications on physical devices.
- Ensure proper permissions are requested from the user.

</details>

#### How do you handle offline data synchronization in React Native?

<details>
<summary>View answer</summary>

#### **Steps to Handle Offline Data Synchronization**

1. **Use Local Storage**:

   - Store data locally using libraries like `AsyncStorage`, `MMKV`, or `SQLite`.

2. **Detect Network Status**:

   - Use libraries like `@react-native-community/netinfo` to monitor network connectivity.

3. **Queue Offline Actions**:

   - Queue user actions (e.g., form submissions) while offline and replay them when the network is restored.

4. **Conflict Resolution**:

   - Implement conflict resolution strategies (e.g., last-write-wins or merge changes) to handle data discrepancies.

5. **Sync with the Server**:
   - Use background tasks or periodic sync mechanisms to update the server with local changes.

#### **Example**:

```javascript
import NetInfo from "@react-native-community/netinfo";

NetInfo.addEventListener((state) => {
  if (state.isConnected) {
    console.log("Device is online. Syncing data...");
    // Sync local data with the server
  } else {
    console.log("Device is offline. Queueing actions...");
    // Queue actions for later
  }
});
```

#### **Key Points**:

- Ensure data integrity during synchronization.
- Provide feedback to users about offline status and sync progress.

</details>

#### Your React Native app is laggy while scrolling lists. How do you fix it?

<details>
<summary>View answer</summary>

#### **Steps to Fix Laggy Scrolling**

1. **Use `FlatList` or `SectionList`**:

   - Replace `ScrollView` with `FlatList` or `SectionList` for better performance with large datasets.

2. **Optimize `FlatList`**:

   - Use `keyExtractor` for unique keys.
   - Enable `windowSize` to limit the number of items rendered outside the viewport.
   - Use `getItemLayout` for fixed-height items.

3. **Avoid Inline Functions**:

   - Use `useCallback` for `renderItem` and other callbacks.

4. **Use `React.memo`**:

   - Memoize list items to prevent unnecessary re-renders.

5. **Optimize Images**:
   - Use libraries like `react-native-fast-image` for efficient image rendering.

#### **Example**:

```javascript
<FlatList
  data={data}
  keyExtractor={(item) => item.id.toString()}
  renderItem={useCallback(
    ({ item }) => (
      <ItemComponent item={item} />
    ),
    []
  )}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  windowSize={5}
/>
```

#### **Key Points**:

- Avoid rendering too many items at once.
- Optimize images and animations for smoother scrolling.

</details>

#### You need to implement in-app purchases. What steps would you take?

<details>
<summary>View answer</summary>

#### **Steps to Implement In-App Purchases**

1. **Choose a Library**:

   - Use libraries like `react-native-iap` for handling in-app purchases.

2. **Set Up App Store Accounts**:

   - For iOS: Set up in-app purchases in App Store Connect.
   - For Android: Set up in-app purchases in Google Play Console.

3. **Configure the Library**:

   - Follow the library's setup instructions for iOS and Android.

4. **Fetch Products**:

   - Retrieve the list of available products from the store.

5. **Handle Purchases**:
   - Use the library's API to initiate and validate purchases.

#### **Example**:

```javascript
import RNIap from "react-native-iap";

const products = ["com.example.product1", "com.example.product2"];

useEffect(() => {
  RNIap.initConnection().then(() => {
    RNIap.getProducts(products).then((availableProducts) => {
      console.log("Available products:", availableProducts);
    });
  });

  return () => {
    RNIap.endConnection();
  };
}, []);
```

#### **Key Points**:

- Test in-app purchases in sandbox mode.
- Handle edge cases like failed transactions or refunds.

</details>

#### How do you optimize React Native for low-memory devices?

<details>
<summary>View answer</summary>

#### **Steps to Optimize for Low-Memory Devices**

1. **Reduce Memory Usage**:

   - Use `FlatList` or `SectionList` for large datasets.
   - Avoid keeping unnecessary data in memory.

2. **Optimize Images**:

   - Use compressed images and libraries like `react-native-fast-image`.

3. **Minimize Native Module Usage**:

   - Avoid loading unused native modules.

4. **Enable Proguard**:

   - Minify and optimize the app for Android.

5. **Monitor Memory Usage**:
   - Use tools like Android Studio Profiler or Xcode Instruments to identify memory leaks.

#### **Key Points**:

- Test the app on low-end devices.
- Optimize both JavaScript and native layers.

</details>

#### Your app has a high memory footprint. How do you analyze and fix it?

<details>
<summary>View answer</summary>

#### **Steps to Analyze and Fix High Memory Usage**

1. **Use Profiling Tools**:

   - Android: Use Android Studio Profiler.
   - iOS: Use Xcode Instruments.

2. **Identify Memory Leaks**:

   - Look for objects that are not being garbage collected.

3. **Optimize Components**:

   - Use `React.memo` and `useCallback` to prevent unnecessary re-renders.

4. **Release Resources**:

   - Remove event listeners and timers when components unmount.

5. **Optimize Images**:
   - Use compressed images and efficient libraries.

#### **Key Points**:

- Regularly monitor memory usage during development.
- Fix memory leaks to improve app performance.

</details>

#### How do you handle real-time updates using WebSockets in React Native?

<details>
<summary>View answer</summary>

#### **Steps to Handle Real-Time Updates**

1. **Use a WebSocket Library**:

   - Use the built-in `WebSocket` API or libraries like `socket.io-client`.

2. **Establish a Connection**:

   - Connect to the WebSocket server and listen for messages.

3. **Handle Incoming Messages**:

   - Update the app state with real-time data.

4. **Reconnect on Disconnection**:
   - Implement reconnection logic to handle network interruptions.

#### **Example**:

```javascript
import { useEffect } from "react";

useEffect(() => {
  const socket = new WebSocket("wss://example.com/socket");

  socket.onmessage = (event) => {
    console.log("Message received:", event.data);
  };

  socket.onclose = () => {
    console.log("Socket closed. Reconnecting...");
    // Reconnect logic here
  };

  return () => {
    socket.close();
  };
}, []);
```

#### **Key Points**:

- Handle reconnections gracefully.
- Use throttling or debouncing to limit updates.

</details>

#### You need to implement biometric authentication (Face ID, Fingerprint). How would you do it?

<details>
<summary>View answer</summary>

#### **Steps to Implement Biometric Authentication**

1. **Choose a Library**:

   - Use libraries like `react-native-biometrics` or `react-native-touch-id`.

2. **Check Device Compatibility**:

   - Verify if the device supports biometric authentication.

3. **Request Authentication**:
   - Use the library's API to prompt the user for biometric authentication.

#### **Example**:

```javascript
import ReactNativeBiometrics from "react-native-biometrics";

ReactNativeBiometrics.simplePrompt({ promptMessage: "Authenticate" }).then(
  (result) => {
    if (result.success) {
      console.log("Authentication successful");
    } else {
      console.log("Authentication failed");
    }
  }
);
```

#### **Key Points**:

- Provide fallback options (e.g., PIN or password) for unsupported devices.
- Handle errors gracefully.

</details>

#### How do you manage background services efficiently in a React Native app?

<details>
<summary>View answer</summary>

#### **Steps to Manage Background Services**

1. **Use Background Task Libraries**:

   - Use libraries like `react-native-background-fetch` or `react-native-background-task`.

2. **Optimize Battery Usage**:

   - Minimize the frequency and duration of background tasks.

3. **Handle Platform Differences**:

   - Use platform-specific APIs for background tasks (e.g., WorkManager for Android).

4. **Test on Real Devices**:
   - Verify background behavior on physical devices.

#### **Key Points**:

- Follow platform guidelines for background tasks.
- Avoid excessive background activity to preserve battery life.

</details>

## React Native Security & Deployment

### How do you secure sensitive data in a React Native app?

<details>
<summary>View answer</summary>

#### **Steps to Secure Sensitive Data**

1. **Avoid Storing Sensitive Data in Plaintext**:

   - Use secure storage solutions like `react-native-encrypted-storage` or `react-native-keychain`.

2. **Encrypt Data**:

   - Encrypt sensitive data before storing it using libraries like `crypto-js`.

3. **Use Environment Variables**:

   - Store API keys and secrets in environment variables using libraries like `react-native-config`.

4. **Secure Network Communication**:

   - Use HTTPS for all API requests and enable SSL pinning to prevent man-in-the-middle attacks.

5. **Implement Authentication**:
   - Use secure authentication methods like OAuth2 or biometric authentication.

#### **Example**:

```javascript
import EncryptedStorage from "react-native-encrypted-storage";

// Save data securely
await EncryptedStorage.setItem("user_token", "secure_token");

// Retrieve data securely
const token = await EncryptedStorage.getItem("user_token");
console.log(token);
```

#### **Key Points**:

- Never hardcode sensitive information in the app.
- Regularly audit your app for security vulnerabilities.

</details>

### How do you prevent man-in-the-middle attacks in React Native?

<details>
<summary>View answer</summary>

#### **Steps to Prevent MITM Attacks**

1. **Use HTTPS**:

   - Ensure all API requests are made over HTTPS to encrypt communication.

2. **Enable SSL Pinning**:

   - Use libraries like `react-native-ssl-pinning` to pin your app to a specific server certificate.

3. **Validate Certificates**:

   - Verify server certificates to ensure they are valid and trusted.

4. **Avoid Using Public Wi-Fi**:

   - Warn users about the risks of using public Wi-Fi for sensitive operations.

5. **Use Secure Authentication**:
   - Implement secure authentication methods like OAuth2 and refresh tokens.

#### **Example**:

```javascript
import { fetch } from "react-native-ssl-pinning";

fetch("https://example.com/api", {
  method: "GET",
  sslPinning: {
    certs: ["example_cert"],
  },
})
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

#### **Key Points**:

- Regularly update certificates to avoid expiration issues.
- Test your app for vulnerabilities using tools like OWASP ZAP.

</details>

### What is CodePush, and how does it work for OTA (Over-the-Air) updates?

<details>
<summary>View answer</summary>

#### **What is CodePush?**

- CodePush is a service by Microsoft that enables over-the-air (OTA) updates for React Native apps.
- It allows you to update JavaScript code and assets without requiring users to download a new version from the app store.

#### **How It Works**:

1. **Install CodePush**:

   - Use the `react-native-code-push` library to integrate CodePush into your app.

2. **Deploy Updates**:

   - Push updates to the CodePush server using the `code-push` CLI.

3. **Fetch Updates**:

   - The app checks for updates on the CodePush server and downloads them if available.

4. **Apply Updates**:
   - Updates are applied either immediately or on the next app restart, depending on the configuration.

#### **Example**:

```javascript
import codePush from "react-native-code-push";

class App extends React.Component {
  render() {
    return <MainApp />;
  }
}

export default codePush(App);
```

#### **Key Points**:

- CodePush can only update JavaScript and assets, not native code.
- Ensure updates comply with app store guidelines.

</details>

### How do you set up an automated CI/CD pipeline for a React Native app?

<details>
<summary>View answer</summary>

#### **Steps to Set Up CI/CD**

1. **Choose a CI/CD Tool**:

   - Use tools like **GitHub Actions**, **Bitrise**, or **CircleCI**.

2. **Set Up Build Environments**:

   - Configure separate environments for iOS and Android builds.

3. **Automate Testing**:

   - Run unit tests, integration tests, and end-to-end tests as part of the pipeline.

4. **Build and Sign the App**:

   - Automate the signing process using keystores (Android) and provisioning profiles (iOS).

5. **Deploy to App Stores**:
   - Use tools like `fastlane` to automate deployment to the App Store and Google Play.

#### **Example GitHub Actions Workflow**:

```yaml
name: React Native CI/CD

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 16
      - name: Install dependencies
        run: yarn install
      - name: Run tests
        run: yarn test
      - name: Build Android
        run: cd android && ./gradlew assembleRelease
      - name: Build iOS
        run: cd ios && xcodebuild -workspace MyApp.xcworkspace -scheme MyApp -sdk iphoneos -configuration AppStoreDistribution archive -archivePath MyApp.xcarchive
```

#### **Key Points**:

- Use environment variables to store sensitive information like API keys and signing credentials.
- Regularly monitor the pipeline for failures and optimize build times.

</details>

### How do you ensure a React Native app meets App Store and Play Store guidelines?

<details>
<summary>View answer</summary>

#### **Steps to Ensure Compliance**

1. **Follow Design Guidelines**:

   - Adhere to platform-specific design guidelines (e.g., Material Design for Android, Human Interface Guidelines for iOS).

2. **Test on Real Devices**:

   - Test the app on a variety of devices to ensure compatibility and performance.

3. **Handle Permissions Properly**:

   - Request only necessary permissions and provide clear explanations for their use.

4. **Optimize App Performance**:

   - Ensure the app is responsive and does not crash or lag.

5. **Comply with Content Policies**:

   - Avoid prohibited content and ensure the app complies with legal requirements.

6. **Prepare Metadata**:
   - Provide accurate app descriptions, screenshots, and videos for the app store listing.

#### **Key Points**:

- Regularly review app store guidelines as they may change over time.
- Use tools like **Google Play Console Pre-Launch Report** to identify potential issues before release.

</details>

### React Native Leadership & Code Quality

#### How do you ensure code quality in a large React Native project?

<details>
<summary>View answer</summary>

#### **Steps to Ensure Code Quality**

1. **Use a Linter**:

   - Enforce consistent coding standards using tools like `ESLint` and `Prettier`.

2. **Implement Type Checking**:

   - Use TypeScript to catch type-related errors during development.

3. **Write Unit Tests**:

   - Use testing libraries like `Jest` and `React Native Testing Library` to ensure components and logic work as expected.

4. **Code Reviews**:

   - Establish a code review process to ensure all changes are reviewed by peers before merging.

5. **Automate Quality Checks**:

   - Integrate CI/CD pipelines to run automated tests, linting, and type checks on every pull request.

6. **Document Standards**:
   - Maintain a coding standards document to guide developers on best practices.

#### **Key Points**:

- Regularly refactor code to improve maintainability.
- Use tools like SonarQube to analyze code quality metrics.

</details>

#### How do you review pull requests to maintain a clean codebase?

<details>
<summary>View answer</summary>

#### **Steps to Review Pull Requests**

1. **Check for Functionality**:

   - Verify that the changes meet the requirements and work as intended.

2. **Review Code Style**:

   - Ensure the code adheres to the project's coding standards and style guide.

3. **Test Locally**:

   - Pull the branch and test the changes locally to confirm they work as expected.

4. **Check for Performance Issues**:

   - Look for potential performance bottlenecks or inefficient code.

5. **Provide Constructive Feedback**:

   - Offer clear and actionable feedback to help the author improve their code.

6. **Verify Tests**:
   - Ensure that new code is covered by unit tests and that all tests pass.

#### **Key Points**:

- Use tools like GitHub's review feature to leave inline comments.
- Encourage small, focused pull requests to simplify the review process.

</details>

#### How do you onboard a new developer into a React Native project?

<details>
<summary>View answer</summary>

#### **Steps to Onboard a New Developer**

1. **Provide Documentation**:

   - Share project documentation, including setup instructions, architecture, and coding standards.

2. **Set Up the Development Environment**:

   - Guide the developer through setting up the project locally, including dependencies and tools.

3. **Introduce the Codebase**:

   - Walk through the project's folder structure, key components, and workflows.

4. **Assign a Mentor**:

   - Pair the new developer with an experienced team member for guidance.

5. **Start with Small Tasks**:

   - Assign small, well-defined tasks to help the developer get familiar with the codebase.

6. **Encourage Questions**:
   - Create a welcoming environment where the developer feels comfortable asking questions.

#### **Key Points**:

- Use tools like Slack or Microsoft Teams for communication.
- Regularly check in with the developer to address any challenges.

</details>

#### How do you balance feature development vs. technical debt?

<details>
<summary>View answer</summary>

#### **Strategies to Balance Feature Development and Technical Debt**

1. **Prioritize Technical Debt**:

   - Regularly assess and prioritize technical debt alongside feature development.

2. **Allocate Time for Refactoring**:

   - Dedicate a portion of each sprint to address technical debt.

3. **Use Metrics**:

   - Track code quality metrics (e.g., code complexity, test coverage) to identify areas needing improvement.

4. **Involve Stakeholders**:

   - Communicate the impact of technical debt to stakeholders and get their buy-in for addressing it.

5. **Adopt Incremental Improvements**:
   - Refactor code incrementally as part of feature development.

#### **Key Points**:

- Avoid accumulating excessive technical debt by enforcing coding standards.
- Use tools like SonarQube to monitor technical debt over time.

</details>

#### How would you guide a team on React Native architecture best practices?

<details>
<summary>View answer</summary>

#### **Best Practices for React Native Architecture**

1. **Use a Modular Structure**:

   - Organize the codebase into feature-based modules to improve maintainability.

2. **Adopt State Management**:

   - Use state management libraries like Redux, Recoil, or Zustand for predictable state handling.

3. **Separate Concerns**:

   - Follow the separation of concerns principle by dividing UI, business logic, and data layers.

4. **Implement Testing**:

   - Write unit tests, integration tests, and end-to-end tests to ensure code reliability.

5. **Optimize Performance**:

   - Use tools like `React.memo`, `useCallback`, and `FlatList` to optimize performance.

6. **Document Architecture**:
   - Maintain an architecture document to guide developers on the project's structure and best practices.

#### **Key Points**:

- Regularly review and update the architecture to adapt to project needs.
- Encourage team collaboration to identify and resolve architectural challenges.

</details>

### System Design Case Studies

#### Design a real-time chat application using React Native and Firebase.

<details>
<summary>View answer</summary>

#### **Steps to Design a Real-Time Chat Application**

1. **Set Up Firebase**:

   - Create a Firebase project and enable Firestore for real-time database functionality.
   - Enable Firebase Authentication for user login and registration.

2. **Design the Data Model**:

   - Use Firestore collections for users and messages.
   - Example:
     - `users`: Stores user profiles.
     - `messages`: Stores chat messages with fields like `senderId`, `receiverId`, `timestamp`, and `content`.

3. **Implement Authentication**:

   - Use Firebase Authentication to allow users to sign up and log in.

4. **Real-Time Messaging**:

   - Use Firestore's real-time listeners to fetch and display messages instantly.

5. **UI Design**:

   - Create screens for login, user list, and chat.
   - Use `FlatList` for rendering chat messages efficiently.

6. **Push Notifications**:
   - Use Firebase Cloud Messaging (FCM) to send notifications for new messages.

#### **Example Code**:

```javascript
import firestore from "@react-native-firebase/firestore";

function sendMessage(senderId, receiverId, content) {
  firestore().collection("messages").add({
    senderId,
    receiverId,
    content,
    timestamp: firestore.FieldValue.serverTimestamp(),
  });
}

function listenForMessages(chatId, callback) {
  return firestore()
    .collection("messages")
    .where("chatId", "==", chatId)
    .orderBy("timestamp", "asc")
    .onSnapshot(callback);
}
```

#### **Key Points**:

- Use Firestore's indexing for efficient querying.
- Secure Firestore with rules to prevent unauthorized access.

</details>

#### Design a scalable e-commerce mobile app using React Native.

<details>
<summary>View answer</summary>

#### **Steps to Design a Scalable E-Commerce App**

1. **Backend Setup**:

   - Use a scalable backend like Firebase, AWS Amplify, or a custom Node.js/Express server.
   - Use a database like Firestore, MongoDB, or PostgreSQL.

2. **Data Model**:

   - Design collections for `users`, `products`, `orders`, and `categories`.

3. **Authentication**:

   - Implement user authentication using Firebase Authentication or OAuth providers.

4. **Product Catalog**:

   - Use `FlatList` to display products with pagination for performance.

5. **Cart and Checkout**:

   - Implement a cart feature with local state management or a global state library like Redux.

6. **Payment Integration**:

   - Integrate payment gateways like Stripe or PayPal.

7. **Push Notifications**:
   - Notify users about order updates or promotions using Firebase Cloud Messaging.

#### **Example Code**:

```javascript
import firestore from "@react-native-firebase/firestore";

function fetchProducts(categoryId) {
  return firestore()
    .collection("products")
    .where("categoryId", "==", categoryId)
    .get();
}
```

#### **Key Points**:

- Optimize images using a CDN.
- Use analytics tools to track user behavior.

</details>

#### Design a fitness-tracking mobile application that works offline and syncs data when online.

<details>
<summary>View answer</summary>

#### **Steps to Design a Fitness-Tracking App**

1. **Local Storage**:

   - Use SQLite or MMKV for offline data storage.

2. **Activity Tracking**:

   - Use device sensors (e.g., accelerometer, GPS) to track fitness activities.

3. **Sync Mechanism**:

   - Use libraries like `@react-native-community/netinfo` to detect network status.
   - Sync data with the server when the device is online.

4. **Data Visualization**:

   - Use libraries like `react-native-chart-kit` to display fitness stats.

5. **Authentication**:
   - Allow users to log in and sync their data across devices.

#### **Example Code**:

```javascript
import NetInfo from "@react-native-community/netinfo";

NetInfo.addEventListener((state) => {
  if (state.isConnected) {
    syncDataWithServer();
  }
});
```

#### **Key Points**:

- Ensure data consistency during synchronization.
- Optimize battery usage when tracking activities.

</details>

#### Design a ride-sharing application (like Uber) with real-time tracking.

<details>
<summary>View answer</summary>

#### **Steps to Design a Ride-Sharing App**

1. **Backend Setup**:

   - Use a backend like Firebase, AWS, or a custom Node.js server.
   - Use a real-time database for tracking rides.

2. **Maps Integration**:

   - Use `react-native-maps` for displaying maps and markers.

3. **Real-Time Location Updates**:

   - Use WebSockets or Firebase Realtime Database for real-time location sharing.

4. **Ride Matching**:

   - Implement algorithms to match riders with nearby drivers.

5. **Payment Integration**:

   - Use payment gateways like Stripe for ride payments.

6. **Push Notifications**:
   - Notify users about ride status updates.

#### **Example Code**:

```javascript
import MapView, { Marker } from "react-native-maps";

<MapView>
  <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
</MapView>;
```

#### **Key Points**:

- Optimize location updates to reduce battery usage.
- Use geofencing for better ride tracking.

</details>

#### Design a multi-user collaborative whiteboard in React Native with WebSockets.

<details>
<summary>View answer</summary>

#### **Steps to Design a Collaborative Whiteboard**

1. **Backend Setup**:

   - Use a WebSocket server (e.g., Socket.IO) for real-time collaboration.

2. **Canvas Implementation**:

   - Use libraries like `react-native-canvas` for drawing.

3. **Real-Time Updates**:

   - Broadcast drawing events to all connected users via WebSockets.

4. **User Management**:

   - Allow multiple users to join a session and track their actions.

5. **Data Persistence**:
   - Save whiteboard data to a database for later retrieval.

#### **Example Code**:

```javascript
import { Socket } from "socket.io-client";

const socket = new Socket("https://example.com");

socket.on("draw", (data) => {
  // Update canvas with received data
});

function sendDrawEvent(data) {
  socket.emit("draw", data);
}
```

#### **Key Points**:

- Handle conflicts when multiple users draw simultaneously.
- Optimize performance for large sessions.

</details>
