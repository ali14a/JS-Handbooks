<img src="Redux-Logger.jpeg">

#### Thus, in summary there are two parts to Redux-Logger:

- 1. A logger middleware, which logs actions and state changes to the console
- 2. Configuration options, which allow customization of the logging behavior

The reason that we use middleware such as Redux-Logger is to help with debugging by providing a clear and detailed log of actions and state changes. Middleware allows for additional functionality to be added to the Redux store, and Redux-Logger specifically helps in tracking the flow of data and actions within the application.

### First note that, the synchronous and pure flow of data through Redux’s components is well-defined with distinct, simple roles. Which is as below ->

### Action creators create objects → objects are dispatched to the store → the store invokes reducers → reducers generate new state → listeners are notified of state updates.

Redux-Logger is a middleware that logs actions and the state after they are dispatched. It helps in understanding what actions are being dispatched and how the state is changing as a result.

Here is a basic example of how Redux-Logger can be used:

```js
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

In this example, logger is the Redux-Logger middleware that is applied to the Redux store. This will log every action that is dispatched and the resulting new state.

*************
Redux-Logger provides detailed logs of actions and state changes, which can be very helpful for debugging and understanding the flow of data in your application.

The logger middleware can be customized with various options to control what is logged and how it is formatted. Here is an example of how to configure Redux-Logger:


import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const logger = createLogger({
  collapsed: true,
  diff: true,
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);
In this example, the logger middleware is configured to collapse the log entries and show the differences between the previous and next state.

********************
https://github.com/LogRocket/redux-logger

Redux-Logger source code is available on GitHub
https://github.com/LogRocket/redux-logger

tsx


import { createLogger } from 'redux-logger';

const logger = createLogger({
  // ...options
});

export default logger;
What is a middleware?
Middleware is a function that sits between the action being dispatched and the action reaching the reducer. It can be used to intercept actions and perform additional tasks, such as logging, modifying actions, or handling asynchronous operations.

Middleware provides a powerful way to extend Redux with custom functionality. Redux-Logger is an example of middleware that logs actions and state changes to the console.

Other sources to Read
```

1> https://redux.js.org/usage/middleware

2> https://medium.com/@me_37270/redux-logger-middleware-7b6b1e1e5b2

3> https://dev.to/robertcoopercode/using-redux-logger-for-better-debugging-3m5a

```

```
