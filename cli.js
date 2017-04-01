#!/usr/bin/env node
'use strict';

const meow = require('meow');
const chipper = require('.');

const cli = meow(`
  Usage
    $ git-chipper

	Options
		-n, --not
			Select all branch names except those provided in this comma-separated list.

	Examples
		$ git-chipper
		# ...follow the terminal prompt instructions

		$ git-chipper --not=foo,bar,baz
		# ...follow the terminal prompt instructions
`);

console.log(chipper(cli.input[0]);
