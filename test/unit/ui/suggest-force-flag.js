const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > suggestForceFlag', () => {
  it('Replaces git command with git-chipper command', () => {
    const input = `foo bar 'git branch -D foo' baz qux`;

    const output = ui.suggestForceFlag(input);

    const expected = 'foo bar \'git-chipper --force\' baz qux';

    assert.strictEqual(output, expected);
  });

  it('Leaves other text unchanged.', () => {
    const input = `foo bar baz`;

    const output = ui.suggestForceFlag(input);

    assert.strictEqual(input, output);
  });
});

