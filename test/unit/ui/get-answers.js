const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > getAnswers', () => {
  it('Returns an array of answers.', () => {
    const branches = [ 'foo', 'bar', 'baz', ];

    const output = ui.getAnswers({ branches, });

    assert.deepEqual(output, branches);
  });
});

