#!/usr/bin/env node
'use strict';
const meow = require('meow');
const updateNotifier = require('update-notifier');

const { deleteBranches, listLocalBranches, } = require('./git');
const pkg = require('./package.json');
const { askQuestion, getAnswers, logError, logResult, } = require('./ui');
const { compose, curry, partialRight, } = require('./util');

// adaptBranches :: { all: [ name ], { name: Object } } -> [ Object ]
const adaptBranches = ({ all, branches, }) => all.map(name => branches[name]);

const help = `
  Usage
    $ git-chipper

  Options
    -a, --all
      Select all branches.

    -f, --force
      Force delete selected branches.

    -n, --not
      Select all branches not named in this comma-separated list.

  Examples
    $ git-chipper
    # ... follow the terminal prompt instructions

    $ git-chipper --not=foo,bar,baz
    # ... follow the terminal prompt instructions
`;

const opts = {
  alias: {
    a: 'all',
    f: 'force',
    h: 'help',
    n: 'not',
  },
  default: {
    all: false,
    force: false,
    not: '',
  },
};

const cli = meow(help, opts);

const {
  all: isAll,
  force: isForce,
  not,
} = cli.flags;

const notSelected = not ? not.split(',') : [];

listLocalBranches()
.then(adaptBranches)
.then(curry(askQuestion)({ isAll, notSelected, }))
.then(getAnswers)
.then(partialRight(deleteBranches, isForce))
.then(logResult)
.catch(compose(() => process.exit(1), logError));

// prompt user to update when there is a new package version
updateNotifier({ pkg, }).notify();

