'use strict';
const _ = exports;

// compose ::
_.compose = (a, b) => x => a(b(x));

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

// curryRight :: (* -> a, Number) -> (* -> a)
_.curryRight = function (fn, arity = fn.length) {
  let args = [];

  return function curried(...nextArgs) {
    args = [ ...args, ...nextArgs, ];

    if (args.length >= arity) {
      return fn(...args.reverse());
    }

    return curried;
  }
};

// get :: (s, { s: a }) -> a | Undefined
_.get = (prop, src) => src[prop];

// includes :: (a, Array) -> Bool
_.includes = function (item, collection) {
  return collection.indexOf(item) >= 0;
};

// not :: * -> Bool
_.not = x => !x;

