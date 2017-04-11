const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > isSelected', function () {
  const notSelected = [ 'foo', 'bar', ];

  it('Returns false notSelected array includes name', function () {
    const input = 'foo';

    const output = ui.isSelected(notSelected)(input);

    assert.isFalse(output);
  });

  it('Returns true notSelected array does not include name', function () {
    const input = 'baz';

    const output = ui.isSelected(notSelected)(input);

    assert.isTrue(output);
  });
});

