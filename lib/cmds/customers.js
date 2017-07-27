const api = require('../api');
const chalk = require('chalk');

const customers = ({name}) => {
    let filter = null;
    if (typeof name === 'string') {
        filter = name;
    }
    api.getCustomers(result => {
        if (result.length > 0) {
            console.log(chalk.green(`Results${filter ? ` for "${filter}"` : ''}:`));
        } else {
            console.log(chalk.red(`No results${filter ? ` for "${filter}"` : ''}.`));
        }
        result.forEach(item => {
            const {customer} = item;
            console.log(`${customer.id}\t\t${customer.name}`);
        });
    }, {name: filter});
};

module.exports = customers;