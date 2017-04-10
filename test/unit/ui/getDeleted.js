const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > getDeleted', function () {
  it('Returns a branch name.', function () {
    assert.strictEqual(ui.getDeleted({ branch: 'foo', }), 'foo');
  });
});

