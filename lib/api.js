const request = require('request');
const utils = require('./utils');
const {version} = require('../package.json');

class API {
    constructor() {
        const {team, key} = utils.getConfig();
        this.team = team;
        this.key = key;
        this.userAgent = `mitey/v${version} (https://github.com/lionralfs/mitey)`;
    }

    getMyself(cb) {
        const options = {
            url: `https://${this.team}.mite.yo.lk/myself.json`,
            method: 'GET',
            headers: {
                'X-MiteApiKey': this.key,
                'User-Agent': this.userAgent
            }
        };

        function callback(error, response, body) {
            let result = {};
            if (!error && response.statusCode === 200) {
                try {
                    result = JSON.parse(body);
                } catch(err) {
                    console.log(err);
                }
            }
            cb(result);
        }

        request(options, callback);
    }
}

module.exports = new API();