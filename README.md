# react-simple-observable-store [![NPM version](https://badge.fury.io/js/react-simple-observable-store.svg)](https://npmjs.org/package/react-simple-observable-store) [![Build Status](https://travis-ci.org/Oliv/react-simple-observable-store.svg?branch=master)](https://travis-ci.org/Oliv/react-simple-observable-store)

Simple React store using observables. Uses `Proxy` and `Reflex` APIs

## Installation

### npm

```sh
$ npm install react-simple-observable-store
```

### compile

- Download or clone this github project
- Run `npm i` in the project folder
- Run `npm run build`


## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, StoreContext, symbol, useStore } from 'react-simple-observable-store';

const store = createStore({
  foo: {
    inc: 1,
  },
  bar: {},
});

store[symbol].register(newState => console.log('state updated', newState))

const Component = () => {
  const [ state, setState ] = useStore('foo');

  return (
    <button onClick={() => setState({ inc: state.inc + 1 })}>Update</button>
  );
};

const DisplayComponent = () => {
  const [ state ] = useStore('foo');

  return (
    <span>State : {state.inc}</span>
  );
};

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Component />
      <DisplayComponent />
    </StoreContext.Provider>
  );
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
```

## API

### `createStore`

- constructor(`<Object>`) `<Object>`: initialize a new store and returns it

### `store[symbol]`

- register(`<Function>`) `<Function>`: programmatically registers a callback
- unregister(`<Function>`) `undefined`: programmatically unregisters a callback
- clear() `undefined`: programmatically clears all callbacks

### `useStore` hook

- useStore(`<String>`) `<Array>`: returns [ state, setState ] on a key of the store

## Demo

You can launch demo/index.html to test a simple state update

## License

MIT © [Olivier Gasc](https://github.com/Oliv)
