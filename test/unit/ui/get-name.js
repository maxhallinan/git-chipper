const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > getName', () => {
  it('Returns a name.', () => {
    const input = { name: 'foo', };

    const output = ui.getName(input);

    const expected = input.name;

    assert.strictEqual(output, expected);
  });
});

