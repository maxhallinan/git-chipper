const assert = require('chai').assert;
const chalk = require('chalk');
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

describe('unit > ui > branchToChoice', function () {
  let currentInput = {
      current: true,
      name: 'foo',
  };

  let notCurrentInput = {
      current: false,
      name: 'bar',
  };

  let currentOutput;
  let notCurrentOutput;

  before(function () {
    currentOutput = ui.branchToChoice(currentInput);
    notCurrentOutput = ui.branchToChoice(notCurrentInput);
  })

  it('Returns an object with the expected shape.', function () {
    const currentKeys = Object.keys(currentOutput);
    const notCurrentKeys = Object.keys(notCurrentOutput);

    const expected = [ 'disabled', 'name', 'short', 'value', ];

    assert.includeMembers(currentKeys, expected);
    assert.strictEqual(currentKeys.length, 4);
    assert.includeMembers(notCurrentKeys, expected);
    assert.strictEqual(notCurrentKeys.length, 4);
  });

  it('Sets disabled attribute to expected value.', function () {
    assert.strictEqual(currentOutput.disabled, 'current branch');
    assert.strictEqual(notCurrentOutput.disabled, false);
  });

  it('Sets name attribute to expected value.', function () {
    assert.include(currentOutput.name, currentInput.name);
    assert.strictEqual(notCurrentOutput.name, notCurrentInput.name);
  });

  it('Sets short attribute to expected value.', function () {
    assert.strictEqual(currentOutput.short, currentInput.name);
    assert.strictEqual(notCurrentOutput.short, notCurrentInput.name);
  });

  it('Sets value attribute to expected value.', function () {
    assert.strictEqual(currentOutput.value, currentInput.name);
    assert.strictEqual(notCurrentOutput.value, notCurrentInput.name);
  });

  it('Labels the current branch', function () {
    assert.strictEqual(currentOutput.disabled, 'current branch');
  });

  it('Highlights the current branch', function () {
    assert.strictEqual(currentOutput.name, chalk.blue(currentInput.name));
  });
});

describe('buildChoices', function () {
  it('Returns an array of choices.', function () {
    const input = [
      {
        name: 'foo',
        current: false,
      },
      {
        name: 'bar',
        current: true,

      },
      {
        name: 'baz',
        current: false,
      },
    ];

    const output = ui.buildChoices(input);

    const expected = input.map(ui.branchToChoice);

    assert.deepEqual(output, expected);
  });
});

describe('isSelected', function () {
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
