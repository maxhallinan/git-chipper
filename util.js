'use strict';
const _ = exports;

// compose ::
_.compose = (...fns) => x => [ ...fns, ].reverse().reduce((x, fn) => fn(x), x);

// curry :: (* -> a, Number) -> (* -> a)
_.curry = function (fn, arity = fn.length) {
  let args = [];

  return function curried(...nextArgs) {
    args = [ ...args, ...nextArgs, ];

    if (args.length >= arity) {
      return fn(...args);
    }

    return curried;
  };
};

// filter :: (a -> Bool) -> Array -> Array
_.filter = (fn, xs) => xs.filter(fn);

// get :: (s, { s: a }) -> a | Undefined
_.get = (prop, src) => src[prop];

// includes :: (a, [a]) -> Bool
_.includes = (item, collection) => collection.indexOf(item) > -1;

// join :: (String, Array) -> String
_.join = (separator, xs) => xs.join(separator);

// log :: (a, ..., z) -> b -> b
_.log = (...logs) => b => console.log(...logs, b) || b;

// map :: ((a -> b), Functor a) -> Functor b
_.map = (fn, x) => x.map(fn);

// not :: * -> Bool
_.not = x => !x;

// partial ::
_.partial = (fn, ...args) => fn.bind(null, ...args);

// partialRight :: (a -> a, b
_.partialRight = (fn, ...args) => (...nextArgs) => fn(...nextArgs, ...args.reverse());

