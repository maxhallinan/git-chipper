const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > buildPrompt', () => {
  const choices = [
    { name: 'foo', },
    { name: 'bar', },
    { name: 'baz', },
  ];

  const selected = [ 'foo', 'bar', ];

  let output;

  before(() => {
    output = ui.buildPrompt({ choices, selected, });
  });

  it('Returns an object with the expected shape.', () => {
    const outputKeys = Object.keys(output);

    const expected = [ 'choices', 'default', 'message', 'name', 'pageSize', 'type', ];

    assert.includeMembers(outputKeys, expected);
  });

  it('Sets the expected choices.', () => {
    assert.deepEqual(output.choices, choices);
  });

  it('Sets the expected default.', () => {
    assert.deepEqual(output.default, selected);
  });

  it('Sets the expected message.', () => {
    assert.strictEqual(output.message, 'Select branches to delete: ');
  });

  it('Sets the expected name.', () => {
    assert.strictEqual(output.name, 'branches');
  });

  it('Sets the expected page size.', () => {
    assert.strictEqual(output.pageSize, 20);
  });

  it('Sets the expected type.', () => {
    assert.strictEqual(output.type, 'checkbox');
  });
});

