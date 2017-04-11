const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > joinNames', function () {
  const input = [
    { branch: 'foo', },
    { branch: 'bar', },
    { branch: 'baz', },
  ];

  let output;

  before(function () {
    output = ui.joinNames(input);
  });

  it('All branch names are join in a comma-separated string.', function () {
    assert.strictEqual(output, 'foo, bar, baz');
  });
});

