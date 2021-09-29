import { useEffect, useContext, useState } from 'react';
import { symbol, StoreContext } from '../components/createStore';

export function useStore(key) {
  const store = useContext(StoreContext);
  const [state, setState] = useState(store[key]);

  function setStore(value) {
    store[key] = value;
  }

  useEffect(() => {
    function handleChange(data) {
      setState(data[key]);
    }

    store[symbol].register(handleChange);

    return () => store[symbol].unregister(handleChange);
  }, [store, key]);

  return [ state, setStore ];
}
