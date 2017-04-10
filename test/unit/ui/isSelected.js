const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > isSelected', function () {
  it('Returns false notSelected array includes name', function () {
    const notSelected = [ 'foo', 'bar', ];

    const input = 'foo';

    const output = ui.isSelected(notSelected)(input);

    const expected = false;

    assert.strictEqual(output, expected);
  });

  it('Returns true notSelected array does not include name', function () {
    const notSelected = [ 'foo', 'bar', ];

    const input = 'baz';

    const output = ui.isSelected(notSelected)(input);

    const expected = true;

    assert.strictEqual(output, expected);
  });
});

