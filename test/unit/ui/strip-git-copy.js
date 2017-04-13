const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > stripGitCopy', () => {
  it('Strips git copy from an error message.', () => {
    const input = 'error: foo';

    const output = ui.stripGitCopy(input);

    const expected = 'foo';

    assert.strictEqual(output, expected);
  });

  it('Strips git copy from a fatal message.', () => {
    const input = 'fatal: foo';

    const output = ui.stripGitCopy(input);

    const expected = 'foo';

    assert.strictEqual(output, expected);
  });

  it('Leaves other text unchanged.', () => {
    const input = 'foo';

    const output = ui.stripGitCopy(input);

    const expected = 'foo';

    assert.strictEqual(output, expected);
  });
});

