import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createStore, StoreContext } from '../../components/createStore';
import { useStore } from '../../hooks/useStore';
import 'regenerator-runtime/runtime';

const store = createStore({
  foo: {
    bar: 'baz',
  },
});

afterEach(cleanup);

test('update state data', async() => {
  const Component = () => {
    const [ state, setState ] = useStore('foo');

    return (
      <button onClick={setState({ bar: 'baz2' })}>Update</button>
    );
  };

  const DisplayComponent = () => {
    const [ state ] = useStore('foo');

    return (
      <span>{state.bar}</span>
    );
  };

  const { getByRole, queryByText } = render(
    <StoreContext.Provider value={store}>
      <Component />
      <DisplayComponent />
    </StoreContext.Provider>
  );

  fireEvent.click(getByRole('button'));

  expect(queryByText(/baz2/i)).not.toBe(null);
});
