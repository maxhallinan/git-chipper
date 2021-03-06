const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > formatLines', () => {
  it('Left pads every line after the first with two spaces.', () => {
    const input = 'foo\n bar\n baz';

    const output = ui.formatLines(input);

    const expected = 'foo\n  bar\n  baz';

    assert.strictEqual(output, expected);
  });

  it('Does not left pad the first line.', () => {
    const input = 'foo';

    const output = ui.formatLines(input);

    assert.strictEqual(output, 'foo');
  });

  it('Does not add a linebreak to a single-line message.', () => {
    const input = 'foo';

    const output = ui.formatLines(input);

    assert.notInclude(output, '\n');
  });

  it('Trims whitespace characters from start and end of each line', () => {
    const input = '  foo \n   bar\t  \n baz';

    const output = ui.formatLines(input);

    assert.notInclude(output, '\t');
    assert.strictEqual(output, 'foo\n  bar\n  baz');
  });
});

