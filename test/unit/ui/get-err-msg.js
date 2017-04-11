const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > getErrMsg', function () {
  it('Returns the message of an error object', function () {
    const err = { message: 'foo', };

    const output = ui.getErrMsg(err);

    assert.strictEqual(output, err.message);
  });

  it('Falls back to returning the error value if there is no error.message', function () {
    const err = 'foo';

    const output = ui.getErrMsg(err);

    assert.strictEqual(output, err);
  });
});

