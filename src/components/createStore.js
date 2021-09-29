import { createContext } from 'react';

let store;

function clean(o) {
  return JSON.parse(JSON.stringify(o));
}

export const symbol = Symbol('observable');

export const StoreContext = createContext(store);

export function createStore(defaultStore = {}) {
  if (store !== undefined) {
    return store;
  }

  defaultStore[symbol] = {
    set(...args) {
      const result = Reflect.set(...args);
      const [obj] = args;

      this.handlers.forEach(fn => fn(clean(obj)));

      return result;
    },

    deleteProperty(...args) {
      const result = Reflect.deleteProperty(...args);
      const [obj] = args;

      this.handlers.forEach(fn => fn(clean(obj)));

      return result;
    },

    handlers: [],

    register(fn) {
      if (this.handlers.indexOf(fn) === -1) {
        this.handlers.push(fn);
      }

      return fn;
    },

    unregister(fn) {
      const i = this.handlers.indexOf(fn);

      if (i !== -1) {
        delete this.handlers[i];

        return true;
      }

      return false;
    },

    clear() {
      if (this.handlers.length) {
        this.handlers = [];
      }
    },
  };

  store = new Proxy(defaultStore, defaultStore[symbol]);

  return store;
}
