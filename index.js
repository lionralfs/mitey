#!/usr/bin/env node
'use strict';

const fs = require('fs');
const co = require('co');
const prompt = require('co-prompt');
const program = require('commander');
const chalk = require('chalk');
const {version} = require('./package.json');
const keyFile = 'key.json';

const init = () => {
    co(function* () {
        const apiKey = yield prompt.password('Please enter your API-Key. ' +
            'You can find it at https://mitey.mite.yo.lk/myself\n');
        fs.open(keyFile, 'r', (err, data) => {
            if (err) {
                // file doesn't exist
                saveKey(apiKey);
            } else {
                fs.readFile(keyFile, (err) => {
                    if (!err) {
                        co(function* () {
                            const override = yield prompt.confirm('It seems like you have already registered an API-Key.\n' +
                                'Do you want to override it? (y/n)\n');
                            if (override) {
                                saveKey(apiKey);
                            }
                            process.stdin.pause();
                        });
                    }
                });
            }
        });
    });
};

const saveKey = key => {
    fs.writeFile(keyFile, key, err => {
        if (err) {
            return console.log(chalk.red(err));
        }
        console.log(chalk.green('Your API-Key was saved!\n'));
    });
};

const start = taskname => {
    if (!taskname) {
        return console.log(chalk.yellow('Please specify a task name!\n'));
    }
    console.log(taskname);
};

program
    .command('init')
    .description('Set an API-Key')
    .action(init);

program
    .command('start [taskname]')
    .description('Start a task')
    .action(start);

program.version(version);
program.parse(process.argv);
