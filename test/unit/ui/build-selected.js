const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > buildSelected', () => {
  const choices = [
    { name: 'foo', },
    { name: 'bar', },
    { name: 'baz', },
  ];

  const notSelected = [ 'foo', ];

  let output;

  before(() => {
    output = ui.buildSelected(notSelected, choices);
  });

  it('Returns an empty array if notSelected is empty.', () => {
    const notSelected = [];
    const choices = [];

    const output = ui.buildSelected(notSelected, choices);

    assert.deepEqual(output, []);
  });

  it('Should set `selected` to an array of choice names if notSelected is not empty', () => {
    const expected = [ 'bar', 'baz', ];

    assert.deepEqual(output, expected);
  });
});

