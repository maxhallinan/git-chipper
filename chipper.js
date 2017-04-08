'use strict';
const { deleteBranches, listLocalBranches, } = require('./git');
const { askQuestion, getAnswers, logError, logResult, } = require('./ui');
const { curry, partialRight, } = require('./util');

module.exports = (notSelected, isForce) => {
  listLocalBranches()
  .then(curry(askQuestion)(notSelected))
  .then(getAnswers)
  .then(partialRight(deleteBranches, isForce))
  .then(logResult)
  .catch(logError);
};

