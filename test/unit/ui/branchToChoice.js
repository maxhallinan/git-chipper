const assert = require('chai').assert;
const chalk = require('chalk');
const ui = require('../../../ui');

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

