const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > isSelected', () => {
  const notSelected = [ 'foo', 'bar', ];

  it('Returns false notSelected array includes name', () => {
    const input = 'foo';

    const output = ui.isSelected(notSelected)(input);

    assert.isFalse(output);
  });

  it('Returns true notSelected array does not include name', () => {
    const input = 'baz';

    const output = ui.isSelected(notSelected)(input);

    assert.isTrue(output);
  });
});

