#!/usr/bin/env node
'use strict';
const meow = require('meow');
const chipper = require('./chipper');

const help = `
  Usage
    $ git-chipper

  Options
    -f, --force
      Force delete selected branches.

    -n, --not
      Select all branches except those named in this comma-separated list.

  Examples
    $ git-chipper
    # ...follow the terminal prompt instructions

    $ git-chipper --not=foo,bar,baz
    # ...follow the terminal prompt instructions
`;

const opts = {
  alias: {
    f: 'force',
    n: 'not',
  },
  default: {
    force: false,
    not: '',
  },
};

const cli = meow(help, opts);

const { force, not, } = cli.flags;
const notSelected = not ? not.split(',') : [];

chipper(notSelected, force);

