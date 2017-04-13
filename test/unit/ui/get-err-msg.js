const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > getErrMsg', () => {
  it('Returns the message of an error object', () => {
    const err = { message: 'foo', };

    const output = ui.getErrMsg(err);

    assert.strictEqual(output, err.message);
  });

  it('Falls back to returning the error value if there is no error.message', () => {
    const err = 'foo';

    const output = ui.getErrMsg(err);

    assert.strictEqual(output, err);
  });
});

