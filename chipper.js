'use strict';

const { deleteBranches, listLocalBranches, } = require('./git');
const {
  getAnswers,
  listChoices,
  logSuccess,
  showPrompt,
} = require('./ui');

module.exports = notSelected => {
  listLocalBranches()
    // figure out a neater way to do this
    .then(branches => listChoices(notSelected, branches))
    .then(showPrompt)
    .then(getAnswers)
    .then(deleteBranches)
    .then(logSuccess);
};

