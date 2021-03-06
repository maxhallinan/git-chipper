const assert = require('chai').assert;
const ui = require('../../../ui');

describe('unit > ui > buildChoices', () => {
  it('Returns an array of choices.', () => {
    const input = [
      {
        name: 'foo',
        current: false,
      },
      {
        name: 'bar',
        current: true,

      },
      {
        name: 'baz',
        current: false,
      },
    ];

    const output = ui.buildChoices(input);

    const expected = input.map(ui.branchToChoice);

    assert.deepEqual(output, expected);
  });
});

