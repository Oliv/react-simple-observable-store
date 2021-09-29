import { createStore, symbol } from '../../components/createStore';

test('creates a new store with defaults', () => {
  const store = createStore({
    foo: 'bar',
  });

  expect(store.foo).toEqual('bar');
});

test('creates only one store', () => {
  const store1 = createStore({
    foo: 'bar',
  });

  const store2 = createStore({
    foo: 'baz',
  });

  expect(store1).toBe(store2);
});

test('state should be clean', () => {
  const store = createStore();

  store[symbol].register(state => {
    expect(state).toEqual({
      foo: 'bar'
    });

    store[symbol].clear();
  });

  store.foo = 'bar';
});

test('state change should be triggered on property deletion', () => {
  const store = createStore();

  store[symbol].register(state => {
    expect(state).toEqual({});
  });

  delete store.foo;
});
