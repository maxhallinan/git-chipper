'use strict';
const _ = exports;

// alphaCompare :: (String, String) -> Number
_.alphaCompare = (a = '', b = '') => a.toLowerCase().localeCompare(b.toLowerCase());

// compose :: ((x -> z), ..., (b -> c), (a -> b), (x -> a)) -> x -> z
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

// partial :: ((a, b, ..., z) -> x), a, b, c, ..., w) -> ((..., x, y, z) -> x)
_.partial = (fn, ...args) => fn.bind(null, ...args);

// partial :: ((a, b, ..., z) -> x), z, y, x, w, ..., d) -> ((a, b, c, ...) -> x)
_.partialRight = (fn, ...args) => (...nextArgs) => fn(...nextArgs, ...args.reverse());

// replace :: (String, String | RegEx, String) -> String
_.replace = (source, pattern, replacement) => source.replace(pattern, replacement);

// toTitleCase :: String -> String
_.toTitleCase = str => `${str[0].toUpperCase()}${str.substring(1)}`;

