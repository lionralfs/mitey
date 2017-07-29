const prompt = require('prompt');
const utils = require('../utils');

const init = () => {

    const config = utils.getConfig();
    prompt.message = '';
    prompt.delimiter = '';

    prompt.start();

    prompt.get([
        {
            properties: {
                team: {
                    description: utils.formatPrompt('Enter your team name:'),
                    required: true,
                    message: 'Invalid team name',
                    type: 'string',
                }
            }
        },
        {
            properties: {
                key: {
                    description: utils.formatPrompt('Enter your API key:'),
                    hidden: true,
                    required: true,
                    message: 'You must enter an API key',
                    type: 'string',
                }
            }
        },
        {
            properties: {
                roundUp: {
                    description: utils.formatPrompt('Round up to the nearest x minutes:'),
                    default: 0,
                    required: true,
                    type: 'number',
                    minimum: 0,
                    maximum: 180, // do we need a maximum here?
                    message: 'You must enter a positive number, or leave it empty',
                }
            }
        }
    ], (err, result) => {
        if (!err && result) {
            const {team, key, roundUp} = result;

            utils.saveConfig({team, key, roundUp});
        }
    });
};

module.exports = init;
