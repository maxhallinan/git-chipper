const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > sortBranches', function () {
  it('Sorts in ascending order.', function () {
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

  it('Sort is case-insensitive.', function () {
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

