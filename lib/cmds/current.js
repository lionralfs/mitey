const api = require('../api');
const utils = require('../utils');

const current = () => {
    api.getTracker()
        .then(result => {
            const {tracker} = result;
            if (tracker && tracker.tracking_time_entry) {
                // Can already give info about minutes here, fetch other data after
                const minutes = tracker.tracking_time_entry.minutes;
                console.log('Tracker is running.\n');

                console.log(`Time:\t\t${utils.minutesToHoursMinutes(minutes)}`);
                console.log(`ID:\t\t${tracker.tracking_time_entry.id}`);
                api.getTimeEntry(tracker.tracking_time_entry.id)
                    .then(result => {
                        const {time_entry} = result;
                        if (!time_entry) {
                            return console.log('An error occured while trying to fetch the current time entry');
                        }
                        console.log(`Customer: \t${time_entry.customer_name || ''}`);
                        console.log(`Project: \t${time_entry.project_name || ''}`);
                        console.log(`Service: \t${time_entry.service_name || ''}`);
                        console.log(`Billable: \t${time_entry.billable ? 'Yes' : 'No'}`);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                console.log('Tracker isn\'t running.');
            }
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = current;