#!/usr/bin/env node
'use strict';

const program = require('commander');
const {version} = require('./package.json');

const cmds = require('./lib/cmds');

// init
program
    .command('init')
    .description('Set an API-Key')
    .action(cmds.init);

// start
program
    .command('start [taskname]')
    .description('Start a task')
    .action(cmds.start);

// verify
program
    .command('verify')
    .description('Verify if mitey has been set up correctly')
    .action(cmds.verify);

program.version(version);
program.parse(process.argv);
