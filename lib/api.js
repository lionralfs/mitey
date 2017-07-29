const request = require('request');
const rp = require('request-promise');
const utils = require('./utils');
const {version} = require('../package.json');

/**
 * Handles the communication with the mite api
 * @see https://mite.yo.lk/en/api/index.html
 *
 * @author lionralfs
 */
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

    /**
     * Builds the correct request options, like header and url params
     *
     * @param {String} endpoint     The API endpoint
     * @param {String} method       HTTP method
     * @param {Object} [body]       The request body
     * @returns {Object}            The completed request options
     * @private
     */
    _getRequestOptions({endpoint, method, body}) {
        endpoint = endpoint || this.defaults.enpoint;
        method = method || this.defaults.method;

        const options = {
            url: `https://${this.team}.mite.yo.lk${endpoint}`,
            method: method,
            headers: {
                'X-MiteApiKey': this.key,
                'User-Agent': this.userAgent,
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        return options;
    }

    /**
     * Fires the actual API request.
     *
     * @param {String} endpoint     The API endpoint
     * @param {String} method       HTTP method
     * @param {Object} [body]       The request body
     * @returns {Promise}           The API-Response as a Promise
     * @private
     */
    _fireRequest({endpoint, method, body}) {
        const options = this._getRequestOptions({endpoint, method, body});

        return new Promise((resolve, reject) => {
            rp(options)
                .then(result => {
                    try {
                        result = JSON.parse(result);
                        resolve(result);
                    } catch (err) {
                        reject(err);
                    }
                })
                .catch(err => {
                    reject(err);
                });

        });
    }

    /**
     * Get the current authenticated user.
     * @see https://mite.yo.lk/en/api/account.html#get-myself
     *
     * @returns {Promise}       The API-Response as a Promise
     */
    getMyself() {
        const endpoint = '/myself.json';
        const method = 'GET';

        return this._fireRequest({endpoint, method});
    }

    /**
     * Returns the time tracker for the authenticated user.
     * @see https://mite.yo.lk/en/api/tracker.html#get
     *
     * @returns {Promise}       The API-Response as a Promise
     */
    getTracker() {
        const endpoint = '/tracker.json';
        const method = 'GET';

        return this._fireRequest({endpoint, method});
    }

    /**
     * Start the tracker for the time entry given by the id.
     * @see https://mite.yo.lk/en/api/tracker.html#start
     *
     * @returns {Promise}       The API-Response as a Promise
     */
    startTracker({id}) {
        const endpoint = `/tracker/${id}.json`;
        const method = 'PATCH';

        return this._fireRequest({endpoint, method});
    }

    /**
     * Stops the time tracker on the time entry with the given id and returns its last state.
     * @see https://mite.yo.lk/en/api/tracker.html#stop
     *
     * @param {Number} id       The tracker id
     * @returns {Promise}       The API-Response as a Promise
     */
    deleteTracker(id) {
        const endpoint = `/tracker/${id}.json`;
        const method = 'DELETE';

        return this._fireRequest({endpoint, method});
    }

    /**
     * Get a single time entry by its id. The entry can belong to any user of the account,
     * as long as the authenticated user is not a time tracker.
     * @see https://mite.yo.lk/en/api/time-entries.html#get-single
     *
     * @param {Number} id       The entry id
     * @returns {Promise}       The API-Response as a Promise
     */
    getTimeEntry(id) {
        const endpoint = `/time_entries/${id}.json`;
        const method = 'GET';

        return this._fireRequest({endpoint, method});
    }

    /**
     * Create a new time entry. All attributes are optional.
     * @see https://mite.yo.lk/en/api/time-entries.html#create
     *
     * @param {Number} project      A project id
     * @param {Number} service      A service id
     * @param {String} note         A note
     * @returns {Promise}           The API-Response as a Promise
     */
    createTimeEntry({project, service, note}) {
        const endpoint = `/time_entries.json`;
        const method = 'POST';
        const body = {
            time_entry: {
                project_id: project || null,
                service_id: service || null,
                note: note || ''
            }
        };

        return this._fireRequest({endpoint, method, body});
    }

    /**
     * List all active customers, sorted by name.
     * @see https://mite.yo.lk/en/api/customers.html#list-active
     *
     * @param {String} [name]   Filters the list by name. The given string will match partly and is treated as
     *                          case-insensitive.
     * @returns {Promise}       The API-Response as a Promise
     */
    getCustomers({name}) {
        const params = name ? `?name=${name}` : '';
        const endpoint = `/customers.json${params}`;
        const method = 'GET';

        return this._fireRequest({endpoint, method})
    }

    /**
     * Get a single customer by his id
     * @see https://mite.yo.lk/en/api/customers.html#get-single
     *
     * @param {Number} id    The customer id
     * @returns {Promise}       The API-Response as a Promise
     */
    getCustomer(id) {
        const endpoint = `/customers/${id}.json`;
        const method = 'GET';

        return this._fireRequest({endpoint, method});
    }

    /**
     * List all active projects, sorted by name
     * @see https://mite.yo.lk/en/api/projects.html#list-active
     *
     * @param {String} [name]   Filters the list by name. The given string will match partly and is treated as
     *                          case-insensitive.
     * @param {Number} [id]     Filters the list by customer. Can be either a single ID, or multiple comma-separated IDs.
     * @returns {Promise}       The API-Response as a Promise
     */
    getProjects({name, id}) {
        let paramString = '';

        // Prepare URL params
        [
            {key: 'name', value: name},
            {key: 'customer_id', value: id}
        ].forEach(param => {
            if (param.value) {
                const pair = `${param.key}=${param.value}`;
                paramString += (paramString === '' ? `?${pair}` : `&${pair}`);
            }
        });

        const endpoint = `/projects.json${paramString}`;
        const method = 'GET';

        return this._fireRequest({endpoint, method});
    }

    /**
     * Get a single project by its id
     * @see https://mite.yo.lk/en/api/projects.html#get-single
     *
     * @param {Number} id    The project id
     * @returns {Promise}       The API-Response as a Promise
     */
    getProject(id) {
        const endpoint = `/projects/${id}.json`;
        const method = 'GET';

        return this._fireRequest({endpoint, method});
    }

    /**
     * List all active services, sorted by name
     * @see https://mite.yo.lk/en/api/services.html#list-active
     *
     * @param {String} [name]   Filters the list by name. The given string will match partly and is treated as
     *                          case-insensitive.
     * @returns {Promise}       The API-Response as a Promise
     */
    getServices({name}) {
        const params = name ? `?name=${name}` : '';

        const endpoint = `/services.json${params}`;
        const method = 'GET';

        return this._fireRequest({endpoint, method});
    }

    /**
     * Get a single service by its id
     * @see https://mite.yo.lk/en/api/services.html#get-single
     *
     * @param {Number} id       The service id
     * @returns {Promise}       The API-Response as a Promise
     */
    getService(id) {
        const endpoint = `/services/${id}.json`;
        const method = 'GET';

        return this._fireRequest({endpoint, method});
    }
}

module.exports = new API();