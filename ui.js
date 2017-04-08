'use strict';
const chalk = require('chalk');
const inquirer = require('inquirer');
const {
  compose,
  curry,
  filter,
  get,
  includes,
  join,
  map,
  not,
  partial,
  partialRight,
  replace,
  toTitleCase,
} = require('./util');

const ui = exports;

const log = new inquirer.ui.BottomBar().log;

// ui.getName :: { name: a } -> a
ui.getName = partial(get, 'name');

// ui.getNames :: [{ name: a }] -> [a]
ui.getNames = curry(map)(ui.getName);

// ui.branchToChoice :: Object -> Object
ui.branchToChoice = ({ current, name, }) => ({
  disabled: current ? 'current branch' : false,
  name: current ? chalk.blue(name) : name,
  short: name,
  value: name,
});

// ui.listChoices :: Array -> Array
ui.buildChoices = branches => branches.map(ui.branchToChoice);

// ui.isSelected :: Array -> a -> Bool
ui.isSelected = notSelected => compose(
  not,
  partialRight(includes, notSelected)
);

// ui.filterSelected :: Array -> (Array -> Array)
ui.filterSelected = notSelected => compose(
  curry(filter)(ui.isSelected(notSelected)),
  ui.getNames
);

// ui.listSelected :: (Array, Object) -> Object
ui.buildSelected = (notSelected, choices) => ({
  choices,
  selected: notSelected.length ? ui.filterSelected(notSelected)(choices) : [],
});

// ui.buildPrompt :: Object -> Promise
ui.buildPrompt = ({ selected, choices, }) => ({
  choices: [ ...choices, ],
  default: selected,
  message: 'Select branches to delete: ',
  name: 'branches',
  pageSize: 20,
  type: 'checkbox',
});

// ui.showPrompt :: Array -> Promise
ui.askQuestion = notSelected => compose(
  inquirer.prompt,
  ui.buildPrompt,
  curry(ui.buildSelected)(notSelected),
  ui.buildChoices
);

// ui.getAnswers :: { branches: a } -> a
ui.getAnswers = partial(get, 'branches');

// ui.getDeleted :: { branch : a } -> a
ui.getDeleted = branch => get('branch', branch);

// ui.joinNames :: Array -> String
ui.joinNames = compose(
  curry(join)(', '),
  curry(map)(ui.getDeleted)
);

// ui.buildMessage :: String -> String
ui.buildResultMsg = names => {
  // add two extra spaces after : to match Inquirer logs
  const message = names.length ?
    'Deleted branches:  ' :
    'No branches selected';

  // pad start with two extra spaces to match Inquirer logs
  return `  ${chalk.bold(message)}${chalk.cyan(names)}`;
};

// ui.logResult :: Array -> Undefined
ui.logResult = compose(
  log.write,
  ui.buildResultMsg,
  ui.joinNames
);

// ui.getErrMsg :: String | Error -> String
ui.getErrMsg = err => {
  const msg = typeof err === 'string' ? err : err.message;

  return msg;
};

// ui.formatErrMsg :: String -> String
ui.formatErrMsg = msg =>
`${chalk.green('!')} ${chalk.red('Error')}${chalk.bold(`: ${msg}`)}`;

// ui.buildErrMsg :: String -> String
ui.buildErrMsg = compose(
  ui.formatErrMsg,
  toTitleCase,
  partialRight(replace, '\n  ', '\n'),
  partialRight(replace, '', 'error: '),
  ui.getErrMsg
);

// ui.logError :: String -> Undefined
ui.logError = compose(
  log.write,
  ui.buildErrMsg
);

