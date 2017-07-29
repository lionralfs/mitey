const api = require('../api');
const utils = require('../utils');

const stop = id => {
    if (!id) {
        api.getTracker()
            .then(result => {
                const {tracker} = result;
                if (tracker && tracker.tracking_time_entry) {
                    del(result.tracker.tracking_time_entry.id);
                } else {
                    console.log('No tracker is running!');
                }
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        del(id);
    }

    function del(id) {
        api.deleteTracker(id)
            .then(result => {
                const time = utils.minutesToHoursMinutes(result.tracker.stopped_time_entry.minutes);
                console.log(`Tracker was stopped after ${time}.`);
            })
            .catch(err => {
                console.log(err);
            });
    }
};

module.exports = stop;