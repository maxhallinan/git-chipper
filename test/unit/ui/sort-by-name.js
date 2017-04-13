const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > sortByName', () => {
  const a = { name: 'foo', };
  const b = { name: 'bar', };

  it('Returns 1 if a follows b alphabetically.', () => {
    const output = ui.sortByName(a, b);

    const expected = 1;

    assert.strictEqual(output, expected);
  });

  it('Returns -1 if a precedes b alphabetically.', () => {
    const output = ui.sortByName(b, a);

    const expected = -1;

    assert.strictEqual(output, expected);
  });

  it('Returns 0 if a and b occupy the same position alphabetically.', () => {
    const output = ui.sortByName(a, a);

    const expected = 0;

    assert.strictEqual(output, expected);
  });

  it('Comparison is case-insensitive.', () => {
    const c = { name: 'FOO', };
    const d = { name: 'foo', };

    const output = ui.sortByName(c, d);

    const expected = 0;

    assert.strictEqual(output, expected);
  });
});

