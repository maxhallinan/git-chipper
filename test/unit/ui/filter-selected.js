const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > filterSelected', () => {
  it('Returns an array of branch names not included in the notSelected array.', () => {
    const input = ui.buildChoices([
      {
        current: false,
        name: 'foo',
      }, {
        current: false,
        name: 'bar',
      }, {
        current: false,
        name: 'baz',
      },
    ]);

    const notSelected = [ 'foo', ];

    const output = ui.filterSelected(notSelected)(input);

    const expected = [ 'bar', 'baz', ];

    assert.deepEqual(output, expected);
  });
});

