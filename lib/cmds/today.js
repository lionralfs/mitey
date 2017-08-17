const api = require('../api');
const utils = require('../utils');

const today = () => {
  api
    .getToday()
    .then((result) => {
      if (result.length > 0) {
        console.log(utils.formatSuccess('Summary for today:\n'));
        result.forEach((item) => {
          const {
            minutes,
            customer_name,
            project_name,
            service_name,
          } = item.time_entry;

          console.log(
            `${utils.minutesToHoursMinutes(
              minutes
            )}\t${service_name} for ${customer_name} (${project_name})`
          );
        });
      } else {
        console.log(utils.formatWarning('No time entries for today.'));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = today;
