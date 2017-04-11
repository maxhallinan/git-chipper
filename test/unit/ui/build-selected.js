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

  it('Should return an object with the expected shape.', function () {
    const outputKeys = Object.keys(output);

    const expected = [ 'choices', 'selected', ];

    assert.includeMembers(outputKeys, expected);
    assert.strictEqual(outputKeys.length, 2);
  });

  it('Should set `choices` to the second argument', function () {
    assert.deepEqual(output.choices, choices);
  });

  it('Should set `selected` to an empty array if notSelected is empty.', function () {
    const choices = [];
    const notSelected = [];

    assert.deepEqual(ui.buildSelected(notSelected, choices).selected, []);
  });

  it('Should set `selected` to an array of choice names if notSelected is not empty', function () {
    const expected = [ 'bar', 'baz', ];

    assert.deepEqual(output.selected, expected);
  });
});

