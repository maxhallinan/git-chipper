const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > buildSelected', function () {
  const choices = [
    { name: 'foo', },
    { name: 'bar', },
    { name: 'baz', }
  ];

  const notSelected = [ 'foo', ];

  let output;

  before(function () {
    output = ui.buildSelected(notSelected, choices);
  });

  it('Returns an empty array if notSelected is empty.', function () {
    const notSelected = [];
    const choices = [];

    const output = ui.buildSelected(notSelected, choices);

    assert.deepEqual(output, []);
  });

  it('Should set `selected` to an array of choice names if notSelected is not empty', function () {
    const expected = [ 'bar', 'baz', ];

    assert.deepEqual(output, expected);
  });
});

