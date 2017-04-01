#!/usr/bin/env node
'use strict';

const meow = require('meow');
const { deleteBranches, listLocalBranches, } = require('./git');
const { getAnswers, listChoices, logSuccess, showPrompt, } = require('./ui');

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
.then(listChoices.bind(null, not))
.then(showPrompt)
.then(getAnswers)
.then(deleteBranches)
.then(logSuccess);

