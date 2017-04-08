'use strict';
const { deleteBranches, listLocalBranches, } = require('./git');
const { askQuestion, getAnswers, logError, logResult, } = require('./ui');
const { curry, partialRight, } = require('./util');

// adaptBranches :: Object -> Array
const adaptBranches = ({ all, branches, }) => all.map(name => branches[name]);

module.exports = (notSelected, isForce) => {
  listLocalBranches()
  .then(adaptBranches)
  .then(curry(askQuestion)(notSelected))
  .then(getAnswers)
  .then(partialRight(deleteBranches, isForce))
  .then(logResult)
  .catch(logError);
};

