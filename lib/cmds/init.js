const co = require('co');
const prompt = require('co-prompt');
const utils = require('../utils');

const init = () => {
    co(function* () {
        const config = utils.getConfig();

        const team = yield prompt('> Please enter your team name. ' +
            'It is this part in the url: <team>.mite.yo.lk\n');

        // In case 'team' is already set
        if (config.team) {
            const overrideTeam = yield prompt.confirm('It seems like you have already specified a team.\n' +
                '> Do you want to override it? (y/n)\n');

            if (overrideTeam) {
                config.team = team;
            }
        } else {
            config.team = team;
        }

        const key = yield prompt.password('> Please enter your API-Key. ' +
            'You can find it at https://<your-team>.mite.yo.lk/myself\n');

        // In case 'key' is already set
        if (config.key) {
            const overrideKey = yield prompt.confirm('It seems like you have already registered an API-Key.\n' +
                'Do you want to override it? (y/n)\n');
            if (overrideKey) {
                config.key = key;
            }
        } else {
            config.key = key;
        }

        utils.saveConfig(config.team, config.key);
        process.stdin.pause();
    });
};

module.exports = init;
