const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > sortByName', function () {
  const a = { name: 'foo', };
  const b = { name: 'bar', };

  it('Returns 1 if a follows b alphabetically.', function () {
    const output = ui.sortByName(a, b);

    const expected = 1;

    assert.strictEqual(output, expected);
  });

  it('Returns -1 if a precedes b alphabetically.', function () {
    const output = ui.sortByName(b, a);

    const expected = -1;

    assert.strictEqual(output, expected);
  });

  it('Returns 0 if a and b occupy the same position alphabetically.', function () {
    const output = ui.sortByName(a, a);

    const expected = 0;

    assert.strictEqual(output, expected);
  });

  it('Comparison is case-insensitive.', function () {
    const c = { name: 'FOO', };
    const d = { name: 'foo', };

    const output = ui.sortByName(c, d);

    const expected = 0;

    assert.strictEqual(output, expected);
  });
});

