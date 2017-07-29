const api = require('../api');
const utils = require('../utils');

const stop = () => {

    const {roundUp} = utils.getConfig();

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

    const del = id => {
        api.stopTracker(id)
            .then(result => {
                const time = utils.minutesToHoursMinutes(result.tracker.stopped_time_entry.minutes);
                console.log(`Tracker was stopped after ${time}.`);

                if (roundUp > 0) {
                    const {id, minutes} = result.tracker.stopped_time_entry;
                    const minToAdd = utils.calcTimeToAdd(minutes, roundUp);

                    api.editTimeEntry({id, minutes: minutes + minToAdd})
                        .then(result => {
                            console.log(utils.formatSuccess(`Rounded to ${minutes + minToAdd} minutes.`));
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};

module.exports = stop;