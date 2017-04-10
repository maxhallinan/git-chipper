const assert = require('chai').assert;
const ui = require('../../ui');

describe('unit > ui > getName', function () {
  it('Returns a name.', function () {
    const input = { name: 'foo', };

    const output = ui.getName(input);

    const expected = input.name;

    assert.strictEqual(output, expected);
  });
});

describe('unit > ui> getNames', function () {
  it('Returns an array of names.', function () {
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

describe('sortBranches', function () {});
describe('branchToChoice', function () {});
describe('buildChoices', function () {});
describe('isSelected', function () {});
describe('filterSelected', function () {});
describe('buildSelected', function () {});
describe('buildPrompt', function () {});
describe('getAnswers', function () {});
describe('getDeleted', function () {});
describe('joinNames', function () {});
describe('buildResultMsg', function () {});
describe('getErrMsg', function () {});
describe('formatErrMsg', function () {});
describe('buildErrMsg', function () {});

