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

    /**
     * List all active customers, sorted by name
     * @see https://mite.yo.lk/en/api/customers.html#list-active
     *
     * @param {Function} cb     The callback to the API-Request
     * @param {String} [name]   Filters the list by name. The given string will match partly and is treated as
     *                          case-insensitive.
     */
    getCustomers(cb, {name}) {
        const params = name ? `?name=${name}` : '';
        const endpoint = `/customers.json${params}`;
        const method = 'GET';

        this.fireRequest({endpoint, method}, result => {
            cb(result);
        });
    }

    /**
     * Get a single customer by his id
     * @see https://mite.yo.lk/en/api/customers.html#get-single
     *
     * @param {String|Number} id    The customer id
     * @param {Function} cb         The callback to the API-Request
     */
    getCustomer(id, cb) {
        const endpoint = `/customers/${id}.json`;
        const method = 'GET';

        this.fireRequest({endpoint, method}, result => {
            cb(result);
        });
    }

    /**
     * List all active projects, sorted by name
     * @see https://mite.yo.lk/en/api/projects.html#list-active
     *
     * @param {Function} cb     The callback to the API-Request
     * @param {String} [name]   Filters the list by name. The given string will match partly and is treated as
     *                          case-insensitive.
     */
    getProjects(cb, {name}) {
        const params = name ? `?name=${name}` : '';
        const endpoint = `/projects.json${params}`;
        const method = 'GET';

        this.fireRequest({endpoint, method}, result => {
            cb(result);
        });
    }

    /**
     * Get a single project by its id
     * @see https://mite.yo.lk/en/api/projects.html#get-single
     *
     * @param {String|Number} id    The project id
     * @param {Function} cb         The callback to the API-Request
     */
    getProject(id, cb) {
        const endpoint = `/projects/${id}.json`;
        const method = 'GET';

        this.fireRequest({endpoint, method}, result => {
            cb(result);
        });
    }

    /**
     * List all active services, sorted by name
     * @see https://mite.yo.lk/en/api/services.html#list-active
     *
     * @param {Function} cb     The callback to the API-Request
     * @param {String} [name]   Filters the list by name. The given string will match partly and is treated as
     *                          case-insensitive.
     */
    getServices(cb, {name}) {
        const params = name ? `?name=${name}` : '';
        const endpoint = `/services.json${params}`;
        const method = 'GET';

        this.fireRequest({endpoint, method}, result => {
            cb(result);
        });
    }

    /**
     * Get a single service by its id
     * @see https://mite.yo.lk/en/api/services.html#get-single
     *
     * @param {String|Number} id    The service id
     * @param {Function} cb         The callback to the API-Request
     */
    getService(id, cb) {
        const endpoint = `/services/${id}.json`;
        const method = 'GET';

        this.fireRequest({endpoint, method}, result => {
            cb(result);
        });
    }
}

module.exports = new API();