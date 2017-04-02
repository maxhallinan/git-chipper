'use strict';
const {
  deleteBranches,
  listLocalBranches,
} = require('./git');
const {
  getAnswers,
  listChoices,
  logSuccess,
  showPrompt,
} = require('./ui');

module.exports = function (notSelected) {
  listLocalBranches()
    .then(branches => listChoices(notSelected, branches))
    .then(showPrompt)
    .then(getAnswers)
    .then(deleteBranches)
    .then(logSuccess);
};

