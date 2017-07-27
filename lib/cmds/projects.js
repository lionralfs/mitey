const api = require('../api');
const chalk = require('chalk');

const projects = ({name}) => {
    let filter = null;
    if (typeof name === 'string') {
        filter = name;
    }
    api.getProjects(result => {
        if (result.length > 0) {
            console.log(chalk.green(`Results${filter ? ` for "${filter}"` : ''}:`));
        } else {
            console.log(chalk.red(`No results${filter ? ` for "${filter}"` : ''}.`));
        }
        result.forEach(item => {
            const {project} = item;
            console.log(`${project.id}\t\t${project.name}`);
        });
    }, {name: filter});
};

module.exports = projects;