const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > getAnswers', function () {
  it('Returns an array of answers.', function () {
    assert.deepEqual(ui.getAnswers({branches: []}), []);
  })
});

