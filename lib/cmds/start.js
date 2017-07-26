const chalk = require('chalk');
const utils = require('../utils');

const start = taskname => {
    if (!taskname) {
        return console.log(chalk.yellow('Please specify a task name!\n'));
    }
};

module.exports = start;