const assert = require('chai').assert;
const chalk = require('chalk');
const ui = require('../../../ui');

describe('unit > ui > formatErrMsg', () => {
  const message = 'foo';
  let output;

  before(() => {
    output = ui.formatErrMsg(message);
  });

  it('Highlights the error message', () => {
    assert.isTrue(chalk.hasColor(output));
  });

  it('Prepends the error message with error label', () => {
    assert.include(output, '! Error: ');
  });
});

