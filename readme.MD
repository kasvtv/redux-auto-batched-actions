[![NPM version](https://img.shields.io/npm/v/redux-auto-batched-actions.svg?style=flat)](https://www.npmjs.org/package/redux-auto-batched-actions)
[![Size](https://badgen.net/bundlephobia/minzip/redux-auto-batched-actions)](https://bundlephobia.com/result?p=redux-auto-batched-actions)
[![Build Status](https://travis-ci.com/kasvtv/redux-auto-batched-actions.svg?branch=master)](https://travis-ci.com/kasvtv/redux-auto-batched-actions)
[![Coverage Status](https://coveralls.io/repos/github/kasvtv/redux-auto-batched-actions/badge.svg?branch=master)](https://coveralls.io/github/kasvtv/redux-auto-batched-actions?branch=master)
[![Dependency Status](https://david-dm.org/kasvtv/redux-auto-batched-actions.svg)](https://david-dm.org/kasvtv/redux-auto-batched-actions)
[![Known Vulnerabilities](https://snyk.io/test/github/kasvtv/redux-auto-batched-actions/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kasvtv/redux-auto-batched-actions?targetFile=package.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

# redux-auto-batched-actions

I always thought `redux-batched-actions` was great to clean up your action log, but using it is a bit verbose. Why should I have to import and call `batchActions` all the time and hardcode the action names? Just passing an array to `dispatch` and joining the action or function names with commas seemed like a better API to me. **And that's exactly what this micro library does!**

Since arrays as actions seem very uncommon in redux middleware, this is unlikely to clash with most any middlewares.

## Installation

```bash
npm install redux-auto-batched-actions
```

## Usage

```js
import { createStore, applyMiddleware } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { autoBatchingMiddleware } from 'redux-auto-batched-actions';

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