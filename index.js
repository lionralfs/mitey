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
        return yield prompt.password('Please enter your API-Key. ' +
            'You can find it at https://mitey.mite.yo.lk/myself\n');
    }).then(function (apiKey) {
        fs.open(keyFile, 'r', (err) => {
            if (err) {
                saveKey(apiKey);
            } else {
                fs.readFile(keyFile, (err, data) => {
                    if (err) {
                        return console.log(chalk.red(err));
                    } else {
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
        console.log(chalk.green('Your API-Key was saved!'));
    });
};

const start = taskname => {
    if (!taskname) {
        return console.log(chalk.red('Please specify a task name'));
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
