'use strict';
const { deleteBranches, listLocalBranches, } = require('./git');
const { getAnswers, listChoices, logSuccess, showPrompt, } = require('./ui');
const { curry, } = require('./util');

module.exports = notSelected => {
  listLocalBranches()
    .then(curry(listChoices)(notSelected))
    .then(showPrompt)
    .then(getAnswers)
    .then(deleteBranches)
    .then(logSuccess);
};

