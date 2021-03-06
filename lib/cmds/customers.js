const api = require('../api');
const utils = require('../utils');

const customers = ({name}) => {
    let filter = null;
    if (typeof name === 'string') {
        filter = name;
    }
    api.getCustomers({name: filter})
        .then(result => {
            if (result.length > 0) {
                console.log(utils.formatSuccess(`Results${filter ? ` for "${filter}"` : ''}:`));
            } else {
                console.log(utils.formatWarning(`No results${filter ? ` for "${filter}"` : ''}.`));
            }
            result.forEach(item => {
                const {customer} = item;
                console.log(`${customer.id}\t\t${customer.name}`);
            });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = customers;