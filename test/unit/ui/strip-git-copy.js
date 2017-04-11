const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > stripGitCopy', function () {
  it('Strips git copy from an error message.', function () {
    const input = 'error: foo';

    const output = ui.stripGitCopy(input);

    const expected = 'foo'

    assert.strictEqual(output, expected);
  });

  it('Strips git copy from a fatal message.', function () {
    const input = 'fatal: foo';

    const output = ui.stripGitCopy(input);

    const expected = 'foo'

    assert.strictEqual(output, expected);
  });

  it('Does not strip irrelevant text.', function () {
    const input = 'foo';

    const output = ui.stripGitCopy(input);

    const expected = 'foo'

    assert.strictEqual(output, expected);
  });
});

