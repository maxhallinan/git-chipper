const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > joinNames', () => {
  const input = [
    { branch: 'foo', },
    { branch: 'bar', },
    { branch: 'baz', },
  ];

  let output;

  before(() => {
    output = ui.joinNames(input);
  });

  it('All branch names are join in a comma-separated string.', () => {
    assert.strictEqual(output, 'foo, bar, baz');
  });
});

