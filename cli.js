#!/usr/bin/env node
'use strict';

const meow = require('meow');
const gitChipper = require('.');

const cli = meow(`
	Usage
	  $ git-chipper
		# ...follow the terminal prompt instructions
`);

console.log(gitChipper(cli.input[0]);
