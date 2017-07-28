const chalk = require('chalk');
const utils = require('../utils');
const api = require('../api');

const start = taskname => {

    api.createTimeEntry(result => {

        const {time_entry} = result;
        if (time_entry) {
            console.log(`Created new time entry: ${time_entry.id}`);
        }
    });

    //return console.log(chalk.yellow('This has not been implemented yet!\n'));
};

module.exports = start;