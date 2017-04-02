'use strict';

const { deleteBranches, listLocalBranches, } = require('./git');
const { getAnswers, listChoices, logSuccess, showPrompt, } = require('./ui');

module.exports = notChecked => {
  listLocalBranches()
    .then(branches => listChoices(notChecked, branches))
    .then(showPrompt)
    .then(getAnswers)
    .then(deleteBranches)
    .then(logSuccess);
};

