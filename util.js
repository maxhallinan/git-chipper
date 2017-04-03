'use strict';
const _ = exports;

// curry :: (* -> a, Number) -> (* -> a)
_.curry = function (fn, arity = fn.length) {
  let args = [];

  return function curried(...nextArgs) {
    args = [ ...args, ...nextArgs, ];

    if (args.length >= arity) {
      return fn(...args);
    }

    return curried;
  }
};

