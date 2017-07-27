const api = require('../api');
const utils = require('../utils');

const stop = id => {
    if (!id) {
        api.getTracker(result => {
            const {tracker} = result;
            if (tracker && tracker.tracking_time_entry) {
                del(result.tracker.tracking_time_entry.id);
            } else {
                console.log('No tracker is running!');
            }
        });
    } else {
        del(id);
    }

    function del(id) {
        api.deleteTracker(id, result => {
            const time = utils.minutesToHoursMinutes(result.tracker.stopped_time_entry.minutes);
            console.log(`Tracker was stopped after ${time}.`);
        })
    }
};

module.exports = stop;