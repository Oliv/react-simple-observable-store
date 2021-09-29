import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, StoreContext, symbol, useStore } from '../src/index';

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
