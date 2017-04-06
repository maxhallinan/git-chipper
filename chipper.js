'use strict';
const { deleteBranches, listLocalBranches, } = require('./git');
const { askQuestion, getAnswers, logResult, } = require('./ui');
const { curry, } = require('./util');

module.exports = notSelected => {
  listLocalBranches()
  .then(curry(askQuestion)(notSelected))
  .then(getAnswers)
  .then(deleteBranches)
  .then(logResult);
};

