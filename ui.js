'use strict';
const chalk = require('chalk');
const inquirer = require('inquirer');
const { compose, curry, curryRight, get, includes, not, } = require('./util');

const log = (new inquirer.ui.BottomBar()).log;
const ui = exports;

// getAnswers :: Object -> Array
ui.getAnswers = curry(get)('toDelete');

// listChoices :: Array -> Array
ui.listChoices = branches => branches.map(
  branch => {
    const { current, name, } = branch;

    return {
      disabled: current ? 'current branch' : false,
      name: current ? chalk.blue(name) : name,
      short: name,
      value: name,
    };
  }
);

// listSelected :: (Array, Array) -> Object
ui.listSelected = (notSelected, choices) => {
  const isSelected = compose(
    not,
    curryRight(includes)(notSelected)
  );

  const selected = !notSelected.length
    ? []
    : choices.reduce((selected, { name, }) => {
        if (isSelected(name)) {
          selected.push(name);
        }

        return selected;
      }, []);

  return { choices, selected, };
};

// logSuccess :: Bool -> Undefined
ui.logSuccess = isSuccess => {
  if (isSuccess) {
    log.write('Branches deleted!');
  }
};

// showPrompt :: Object -> Promise
ui.showPrompt = ({ selected, choices, }) => {
  const emptyLine = new inquirer.Separator(' ');

  const prompt = {
    choices: [ emptyLine, ...choices, ],
    default: selected,
    message: 'Select branches to delete: ',
    name: 'toDelete',
    pageSize: 20,
    type: 'checkbox',
  };

  return inquirer.prompt(prompt);
};

