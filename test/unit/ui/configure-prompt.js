const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > configurePrompt', function () {
  const opts = {
    isAll: true,
    notSelected: [],
  };

  const choices = [
    { name: 'foo', },
    { name: 'bar', },
    { name: 'baz', },
  ];

  let output;

  before(function () {
    output = ui.configurePrompt(opts, choices);
  });

  it('Returns an object with expected shape.', function () {
    const keys = Object.keys(output);

    const expected = [ 'choices', 'selected', ];

    assert.includeMembers(keys, expected);
    assert.strictEqual(keys.length, 2);
  });

  it('Passes choices through the output.', function () {
    assert.deepEqual(output.choices, choices);
  });

  it('Sets selected to an array of all branch names if opts.isAll is true.', function () {
    const expected = [ 'foo', 'bar', 'baz', ];

    assert.includeMembers(output.selected, expected);
  });

  it('Sets selected to an array of selected branch names if opts.isAll is false.', function () {
    opts.isAll = false;
    opts.notSelected = [ 'bar', ];

    output = ui.configurePrompt(opts, choices);

    const expected = [ 'foo', 'baz', ];

    assert.includeMembers(output.selected, expected);
  });
});

