[![NPM version](https://img.shields.io/npm/v/redux-auto-batched-actions.svg?style=flat)](https://www.npmjs.org/package/micro-xhr)


# redux-auto-batched-actions

I always thought `redux-batched-actions` was great to clean up your action log, but using it is a bit verbose. Why should I have to import and call `batchActions` all the time and hardcode the action names? Just passing an array to `dispatch` and joining the action names with commas seemed like a better API to me. Since arrays as actions seem very uncommon in redux middleware, this is unlikely to clash with most other middlewares you tend to see.

**This middleware lets you just pass an array of actions to `dispatch`, automatically generating an action batch with a name based on its underlying actions\' type or function name (in case of thunks etc)**. It depends on `redux-batched-actions`, and exposes everything that `redux-batched-actions` does, together with the middleware `autoBatchingMiddleware` that makes everything happen.

## Installation

```bash
npm install redux-auto-batched-actions
```

## Usage

```js
import { createStore, applyMiddleware } from 'redux';
import { enableBatching, autoBatchingMiddleware } from 'redux-auto-batched-actions';

const setA = payload => ({type: 'SET_A', payload});
const setB = payload => ({type: 'SET_B', payload});

const reducer = (state={a:0, b:0}, action) => {
	switch (action.type) {
		case 'SET_A': return {...state, a: action.payload}
		case 'SET_B': return {...state, b: action.payload}
		default: return state
	}
}

// Handle bundled actions in reducer
const store = createStore(
	enableBatching(reducer),
	applyMiddleware(autoBatchingMiddleware)
);

store.dispatch([setA(1), setA(2), setB(5)]);

store.getState(); // {a: 2, b: 5}

```