const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > getDeleted', () => {
  it('Returns a branch name.', () => {
    const deleted = { branch: 'foo', };

    const output = ui.getDeleted(deleted);

    const expected = deleted.branch;

    assert.strictEqual(output, expected);
  });
});

