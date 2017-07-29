const api = require('../api');
const utils = require('../utils');

const projects = ({name}) => {
    let filter = null;
    if (typeof name === 'string') {
        filter = name;
    }
    api.getProjects({name: filter})
        .then(result => {
            if (result.length > 0) {
                console.log(utils.formatSuccess(`Results${filter ? ` for "${filter}"` : ''}:`));
            } else {
                console.log(utils.formatWarning(`No results${filter ? ` for "${filter}"` : ''}.`));
            }
            result.forEach(item => {
                const {project} = item;
                console.log(`${project.id}\t\t${project.name}`);
            });
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = projects;