const assert = require('chai').assert;
const chalk = require('chalk');
const ui = require('../../../ui');

describe('unit > ui > formatErrMsg', function () {
  let message = 'foo';
  let output;

  before(function () {
    output = ui.formatErrMsg(message);
  });

  it('Highlights the error message', function () {
    assert.isTrue(chalk.hasColor(output));
  });

  it('Prepends the error message with error label', function () {
    assert.include(output, '! Error: ');
  });
});

