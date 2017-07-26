const request = require('request');
const utils = require('./utils');
const {version} = require('../package.json');

class API {
    constructor() {
        const {team, key} = utils.getConfig();
        this.team = team;
        this.key = key;
        this.userAgent = `mitey/v${version} (https://github.com/lionralfs/mitey)`;

        this.defaults = {
            enpoint: '/',
            method: 'GET'
        }
    }

    getRequestOptions({endpoint, method}) {
        endpoint = endpoint || this.defaults.enpoint;
        method = method || this.defaults.method;

        return {
            url: `https://${this.team}.mite.yo.lk${endpoint}`,
            method: method,
            headers: {
                'X-MiteApiKey': this.key,
                'User-Agent': this.userAgent,
                'Content-Type': 'application/json'
            }
        }
    }

    fireRequest({endpoint, method}, cb) {
        const options = this.getRequestOptions({endpoint, method});
        function callback(error, response, body) {
            let result = {};
            if (!error && response.statusCode === 200) {
                try {
                    result = JSON.parse(body);
                } catch (err) {
                    console.log(err);
                }
            }
            cb(result);
        }


        request(options, callback);
    }

    getMyself(cb) {
        const endpoint = '/myself.json';
        const method = 'GET';

        this.fireRequest({endpoint, method}, result => {
            cb(result);
        });
    }

    getTracker(cb) {
        const endpoint = '/tracker.json';
        const method = 'GET';

        this.fireRequest({endpoint, method}, result => {
            cb(result);
        });
    }

    deleteTracker(id, cb) {
        const endpoint = `/tracker/${id}.json`;
        const method = 'DELETE';

        this.fireRequest({endpoint, method}, result => {
            cb(result);
        });
    }

    getTimeEntry(id, cb) {
        const endpoint = `/time_entries/${id}.json`;
        const method = 'GET';

        this.fireRequest({endpoint, method}, result => {
            cb(result);
        });
    }
}

module.exports = new API();