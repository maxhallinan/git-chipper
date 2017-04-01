'use strict';

module.exports = input => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string, got number');
  }

  return input;
};
