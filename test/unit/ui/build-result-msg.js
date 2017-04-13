const assert = require('chai').assert;
const chalk = require('chalk');
const ui = require('../../../ui');

describe('unit > ui > buildResultMsg', () => {
  const names = 'foo, bar, baz';

  let empty;
  let output;

  before(() => {
    empty = ui.buildResultMsg('');
    output = ui.buildResultMsg(names);
  });

  it('Generates the deleted message.', () => {
    assert.include(output, 'Deleted branches: ');
  });

  it('Appends the names string to the deleted message.', () => {
    assert.include(output, names);
  });

  it('Generates a no-op message if names is empty.', () => {
    assert.include(empty, 'No branches selected');
  });

  it('Prepends the message with the expected prefix.', () => {
    assert.include(empty, '-');
    assert.include(output, '-');
  });

  it('Highlights the message.', () => {
    assert.isTrue(chalk.hasColor(empty));
    assert.isTrue(chalk.hasColor(output));
  });
});

