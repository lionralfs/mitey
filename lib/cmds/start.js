const prompt = require('prompt');
const utils = require('../utils');
const api = require('../api');

const start = () => {

    prompt.message = '';
    prompt.delimiter = '';

    const confirmProps = {
        name: 'confirm',
        message: utils.formatPrompt('Is that correct?'),
        validator: /y[es]*|n[o]?/,
        warning: 'Must respond with yes or no',
        default: 'yes'
    };

    const chooseCustomer = () => {
        prompt.start();

        prompt.get({
            properties: {
                name: {
                    description: utils.formatPrompt('Search for a customer (or press Enter to see them all):')
                }
            }
        }, (err, result) => {
            if (!err && result) {
                const {name} = result;
                api.getCustomers({name})
                    .then(result => {
                        console.log('\n');
                        if (result.length > 1) {
                            result.forEach(item => {
                                console.log(`${result.indexOf(item)}\t${item.customer.name}`);
                            });

                            prompt.get({
                                properties: {
                                    number: {
                                        message: utils.formatPrompt('Found more than one service. Enter a number.'),
                                        type: 'integer',
                                        required: true,
                                        warning: `Must enter a number between 0 and ${result.length - 1}`,
                                        minimum: 0,
                                        maximum: result.length - 1
                                    }
                                }
                            }, (err, res) => {
                                if (res && typeof res.number === 'number') {
                                    chooseProject(result[res.number].customer);
                                }
                            });
                        } else if (result.length === 1) {
                            console.log(utils.formatSuccess(`Found customer "${result[0].customer.name}".`));
                            prompt.get(confirmProps, (err, res) => {
                                if (res && res.confirm.match(/y[es]*/)) {
                                    chooseProject(result[0].customer);
                                } else {
                                    console.log(utils.formatWarning('\n// TODO'));
                                }
                            });
                        } else {
                            console.log(`Couldn\'t find any customers named "${name}".`)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                console.log('\nSomething went wrong!');
            }

        });
    };

    const chooseProject = customer => {
        prompt.start();

        const {name, id} = customer;

        api.getProjects({id})
            .then(result => {
                console.log('\n');
                if (result.length > 1) {
                    result.forEach(item => {
                        console.log(`${result.indexOf(item)}\t${item.project.name}`);
                    });

                    prompt.get({
                        properties: {
                            number: {
                                message: utils.formatPrompt('Found more than one project. Enter a number.'),
                                type: 'integer',
                                required: true,
                                warning: `Must enter a number between 0 and ${result.length - 1}`,
                                minimum: 0,
                                maximum: result.length - 1
                            }
                        }
                    }, (err, res) => {
                        if (res && typeof res.number === 'number') {
                            chooseService(result[res.number].project);
                        }
                    });
                } else if (result.length === 1) {
                    console.log(utils.formatSuccess(`Found project "${result[0].project.name}".`));
                    prompt.get(confirmProps, (err, res) => {
                        if (res && res.confirm.match(/y[es]*/)) {
                            chooseService(result[0].project);
                        } else {
                            console.log(utils.formatWarning('\n// TODO'));
                        }
                    });
                } else {
                    // TODO: proceed without project?
                    console.log(`Couldn\'t find any projects from "${name}".`)
                }
            })
            .catch(err => {
                console.log(err);
            });

    };

    const chooseService = project => {

        prompt.start();

        prompt.get({
            properties: {
                name: {
                    description: utils.formatPrompt('Search for a service (or press Enter to see them all):')
                }
            }
        }, (err, result) => {
            if (!err && result) {
                const {name} = result;
                api.getServices({name})
                    .then(result => {
                        console.log('\n');
                        if (result.length > 1) {
                            result.forEach(item => {
                                console.log(`${result.indexOf(item)}\t${item.service.name}`);
                            });

                            prompt.get({
                                properties: {
                                    number: {
                                        message: utils.formatPrompt('Found more than one service. Enter a number.'),
                                        type: 'integer',
                                        required: true,
                                        warning: `Must enter a number between 0 and ${result.length - 1}`,
                                        minimum: 0,
                                        maximum: result.length - 1
                                    }
                                }
                            }, (err, res) => {
                                if (res && typeof res.number === 'number') {
                                    chooseNote({
                                        customer: project.customer_id,
                                        project: project.id,
                                        service: result[res.number].service.id
                                    });
                                }
                            });
                        } else if (result.length === 1) {
                            console.log(utils.formatSuccess(`Found service "${result[0].service.name}".`));
                            prompt.get(confirmProps, (err, res) => {
                                if (res && res.confirm.match(/y[es]*/)) {
                                    chooseNote({
                                        customer: project.customer_id,
                                        project: project.id,
                                        service: result[0].service.id
                                    });
                                } else {
                                    console.log(utils.formatWarning('\n// TODO'));
                                }
                            });
                        } else {
                            console.log(`Couldn\'t find a service named "${name}".`)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                console.log('\nSomething went wrong!');
            }
        });
    };

    const chooseNote = data => {
        const {project, service} = data;
        prompt.start();

        prompt.get({
            properties: {
                note: {
                    description: utils.formatPrompt('What exactly are you doing?')
                }
            }
        }, (err, result) => {
            let note = '';
            if (!err && result) {
                note = result.note;
            }

            api.createTimeEntry({project, service, note})
                .then(result => {
                    api.startTracker({id: result.time_entry.id})
                        .then(result => {
                            if(result.tracker) {
                                console.log(utils.formatSuccess('Tracker is running!'));
                            } else {
                                // TODO: what happens here?
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                })
        });
    };

    chooseCustomer();
};

module.exports = start;