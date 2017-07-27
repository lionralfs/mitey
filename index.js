#!/usr/bin/env node
'use strict';

const program = require('commander');
const {version} = require('./package.json');

const cmds = require('./lib/cmds');

// init
program
    .command('init')
    .description('Set a team name and your API-Key.')
    .action(cmds.init);

// verify
program
    .command('verify')
    .description('Verify if mitey has been set up correctly.')
    .action(cmds.verify);

// start
program
    .command('stop [id]')
    .description('Stop a task. When no id is specified, mitey tries to stop the current tracker.')
    .action(cmds.stop);

// start
program
    .command('start [taskname]')
    .description('Start a task.')
    .action(cmds.start);

// current
program
    .command('current')
    .description('Check what tracker is currently running.')
    .action(cmds.current);

// customers
program
    .command('customers')
    .option('-n, --name [name]', 'Filter by name')
    .description('List all active customers, sorted by name.')
    .action(cmds.customers);

// projects
program
    .command('projects')
    .option('-n, --name [name]', 'Filter by name')
    .description('List all active projects, sorted by name.')
    .action(cmds.projects);

// services
program
    .command('services')
    .option('-n, --name [name]', 'Filter by name')
    .description('List all active projects, sorted by name.')
    .action(cmds.services);

program.version(version);
program.parse(process.argv);
