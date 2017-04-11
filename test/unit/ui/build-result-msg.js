const assert = require('chai').assert;
const chalk = require('chalk');
const ui = require('../../../ui');

describe('unit > ui > buildResultMsg', function () {
  const names = 'foo, bar, baz';

  let empty;
  let output;

  before(function () {
    empty = ui.buildResultMsg('');
    output = ui.buildResultMsg(names);
  });

  it('Generates the deleted message.', function () {
    assert.include(output, 'Deleted branches: ');
  });

  it('Appends the names string to the deleted message.', function () {
    assert.include(output, names);
  });

  it('Generates a no-op message if names is empty.', function () {
    assert.include(empty, 'No branches selected');
  });

  it('Prepends the message with the expected prefix.', function () {
    assert.include(empty, '-');
    assert.include(output, '-');
  });

  it('Highlights the message.', function () {
    assert.isTrue(chalk.hasColor(empty));
    assert.isTrue(chalk.hasColor(output));
  });
});

