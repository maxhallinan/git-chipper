const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > getAnswers', function () {
  it('Returns an array of answers.', function () {
    const branches = [ 'foo' , 'bar', 'baz', ];

    const output = ui.getAnswers({ branches, });

    assert.deepEqual(output, branches);
  })
});

