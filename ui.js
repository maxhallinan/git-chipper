'use strict';
const chalk = require('chalk');
const inquirer = require('inquirer');
const {
  alphaCompare,
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

const log = new inquirer.ui.BottomBar().log;

const ui = exports;

// ui.getName :: { name: a } -> a
ui.getName = partial(get, 'name');

// ui.getNames :: [{ name: a }] -> [a]
ui.getNames = curry(map)(ui.getName);

// ui.sortByName ({ name: String }, { name: String }) -> Number
ui.sortByName = ({ name: a, }, { name: b, }) => alphaCompare(a, b);

// ui.sortBranches :: Array -> Array
ui.sortBranches = branches => branches.sort(ui.sortByName);

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

// ui.buildSelected :: ([ a ], [{ name: b }]) -> [ b ]
ui.buildSelected = (notSelected, choices) =>
notSelected.length ? ui.filterSelected(notSelected)(choices) : [];

// ui.listSelected :: (Array, Object) -> Object
ui.configurePrompt = ({ isAll, notSelected, }, choices) => ({
  choices,
  selected: isAll ? ui.getNames(choices) : ui.buildSelected(notSelected, choices),
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
ui.askQuestion = (opts) => compose(
  inquirer.prompt,
  ui.buildPrompt,
  curry(ui.configurePrompt)(opts),
  ui.buildChoices,
  ui.sortBranches
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
  return `${chalk.green.bold('-')} ${chalk.bold(message)}${chalk.cyan(names)}`;
};

// ui.logResult :: Array -> Undefined
ui.logResult = compose(
  log.write,
  ui.buildResultMsg,
  ui.joinNames
);

// ui.getErrMsg :: String | Error -> String
ui.getErrMsg = err => err.message || err;

// ui.formatErrMsg :: String -> String
ui.formatErrMsg = msg => `${chalk.red.bold('! Error: ')}${msg}`;

// ui.formatLines :: String -> String
ui.formatLines = compose(
  str => str.trim(),
  str => str.join('\n'),
  partial(map, str => `  ${str.trim()}`),
  str => str.split('\n')
);

// ui.stripGitCopy :: String -> String
ui.stripGitCopy = str => replace(str, /(error: |fatal: )/g, '');

// ui.suggestForceFlag :: String -> String
ui.suggestForceFlag = str => replace(
  str,
  /'git branch -D [^']*'/g,
  `'git-chipper --force'`
);

// ui.buildErrMsg :: String -> String
ui.buildErrMsg = compose(
  ui.formatErrMsg,
  toTitleCase,
  ui.formatLines,
  ui.stripGitCopy,
  ui.suggestForceFlag,
  ui.getErrMsg
);

// ui.logError :: String -> Undefined
ui.logError = compose(
  log.write,
  ui.buildErrMsg
);

