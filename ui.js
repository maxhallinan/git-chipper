'use strict';

const inquirer = require('inquirer');

const ui = new inquirer.ui.BottomBar();

function getAnswers(answers) {
  return answers.toDelete;
}

function listChoices(notSelected, branchSummary) {
  const { all, branches, } = branchSummary;

  const choices = all.map(name => {
    const { current, } = branches[name];

    return {
      disabled: current ? 'Current branch' : false,
      name,
      short: name,
      value: name,
    };
  });

  const selected = notSelected.length && all.filter(name => notSelected.indexOf(name) === -1);

  return { choices, selected, };
}

function logSuccess(isSuccess) {
  if (isSuccess) {
    ui.log.write('Branches deleted successfully!');
  }
}

function showPrompt({ choices, selected, }) {
  const prompt = {
    choices,
    default: selected,
    message: 'Select branches to delete',
    name: 'toDelete',
    pageSize: 20,
    type: 'checkbox',
  };

  return inquirer.prompt(prompt);
}

module.exports.getAnswers = getAnswers;
module.exports.listChoices = listChoices;
module.exports.logSuccess = logSuccess;
module.exports.showPrompt = showPrompt;

