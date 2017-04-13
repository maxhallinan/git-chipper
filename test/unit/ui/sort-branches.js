const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > sortBranches', () => {
  it('Sorts in ascending order.', () => {
    const input = [
      { name: 'foo', },
      { name: 'zed', },
      { name: 'ace', },
    ];

    const output = ui.sortBranches(input);

    const expected = [
      { name: 'ace', },
      { name: 'foo', },
      { name: 'zed', },
    ];

    assert.deepEqual(output, expected);
  });

  it('Sort is case-insensitive.', () => {
    const input = [
      { name: 'BAZ', },
      { name: 'bar', },
    ];

    const output = ui.sortBranches(input);

    const expected = [
      { name: 'bar', },
      { name: 'BAZ', },
    ];

    assert.deepEqual(output, expected);
  });
});

