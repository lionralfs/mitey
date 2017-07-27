const api = require('../api');
const chalk = require('chalk');

const services = ({name}) => {
    let filter = null;
    if (typeof name === 'string') {
        filter = name;
    }
    api.getServices(result => {
        if (result.length > 0) {
            console.log(chalk.green(`Results${filter ? ` for "${filter}"` : ''}:`));
        } else {
            console.log(chalk.red(`No results${filter ? ` for "${filter}"` : ''}.`));
        }
        result.forEach(item => {
            const {service} = item;
            console.log(`${service.id}\t\t${service.name}`);
        });
    }, {name: filter});
};

module.exports = services;