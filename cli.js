#!/usr/bin/env node
'use strict';

const meow = require('meow');
const chipper = require('.');

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
const { not, } = cli.flags;

const notSelected = stringListToArray(not);

chipper(notSelected);

function stringListToArray(str) {
  const arr = str ? str.split(',') : [];

  return arr;
}

