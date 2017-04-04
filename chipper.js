'use strict';
const { deleteBranches, listLocalBranches, } = require('./git');
const {
  getAnswers,
  listChoices,
  listSelected,
  logSuccess,
  showPrompt,
} = require('./ui');
const { curry, get, } = require('./util');

module.exports = notSelected => {
  listLocalBranches()
    .then(({ all, branches, }) => all.map(name => branches[name]))
    .then(listChoices)
    .then(curry(listSelected)(notSelected))
    .then(showPrompt)
    .then(getAnswers)
    .then(deleteBranches)
    .then(logSuccess);
};

