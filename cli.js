#!/usr/bin/env node
'use strict';
const inquirer = require('inquirer');
const meow = require('meow');
const { deleteBranches, listLocalBranches, } = require('./git');

const ui = new inquirer.ui.BottomBar();

const help = `
  Usage
    $ git-chipper

  Options
    -n, --not
      Select all branches except those named in a comma-separated list.

  Examples
    $ git-chipper
    # ...follow the terminal prompt instructions

    $ git-chipper --not=foo,bar,baz
    # ...follow the terminal prompt instructions
`;

const opts = {
  alias: {
    n: 'not',
  },
  default: {
    not: '',
  },
};

const cli = meow(help, opts);

const not = cli.flags.not.split(',')
.filter(name => Boolean(name))
.map(name => name.trim());

listLocalBranches()
.then(branchSummary => {
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

  const selected = not.length && all.filter(name => not.indexOf(name) === -1);

  return { choices, selected, };
})
.then(({ choices, selected, }) => {
  const prompt = {
    choices,
    default: selected,
    message: 'Select branches to delete',
    name: 'toDelete',
    pageSize: 20,
    type: 'checkbox',
  };

  return inquirer.prompt(prompt);
})
.then(answers => answers.toDelete)
.then(deleteBranches)
.then(deletions => {
  const isSuccess = deletions.reduce((isSuccess, { success, }) => {
    if (!isSuccess) {
      return isSuccess;
    }

    return success;
  });

  if (isSuccess) {
    ui.log.write('Branches deleted successfully!');
  }
});

