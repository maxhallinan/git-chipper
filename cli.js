#!/usr/bin/env node
'use strict';
const meow = require('meow');
const { deleteBranches, listLocalBranches, } = require('./git');
const { askQuestion, getAnswers, logError, logResult, } = require('./ui');
const { curry, partialRight, } = require('./util');

// adaptBranches :: { all: [ name ], { name: Object } } -> [ Object ]
const adaptBranches = ({ all, branches, }) => all.map(name => branches[name]);

const help = `
  Usage
    $ git-chipper

  Options
    -f, --force
      Force delete selected branches.

    -n, --not
      Select all branches not named in this comma-separated list.

  Examples
    $ git-chipper
    # ...follow the terminal prompt instructions

    $ git-chipper --not=foo,bar,baz
    # ...follow the terminal prompt instructions
`;

const opts = {
  alias: {
    f: 'force',
    h: 'help',
    n: 'not',
  },
  default: {
    force: false,
    not: '',
  },
};

const cli = meow(help, opts);

const {
  force: isForce,
  not,
} = cli.flags;

const notSelected = not ? not.split(',') : [];

listLocalBranches()
.then(adaptBranches)
.then(curry(askQuestion)(notSelected))
.then(getAnswers)
.then(partialRight(deleteBranches, isForce))
.then(logResult)
.catch(logError);

