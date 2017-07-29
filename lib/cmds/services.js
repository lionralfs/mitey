const api = require('../api');
const utils = require('../utils');

const services = ({name}) => {
    let filter = null;
    if (typeof name === 'string') {
        filter = name;
    }
    api.getServices({name: filter})
        .then(result => {
            if (result.length > 0) {
                console.log(utils.formatSuccess(`Results${filter ? ` for "${filter}"` : ''}:`));
            } else {
                console.log(utils.formatWarning(`No results${filter ? ` for "${filter}"` : ''}.`));
            }
            result.forEach(item => {
                const {service} = item;
                console.log(`${service.id}\t\t${service.name}`);
            });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = services;