const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > getNames', () => {
  it('Returns an array of names.', () => {
    const input = [
      { name: 'foo', },
      { name: 'bar', },
      { name: 'baz', },
    ];

    const output = ui.getNames(input);

    const expected = [ 'foo', 'bar', 'baz', ];

    assert.deepEqual(output, expected);
  });
});

