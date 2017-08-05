const fs = require('fs');
const path = require('path');
const os = require('os');
const yaml = require('yamljs');
const configFile = 'config.yml';
const configFilePath = path.join(os.homedir(), configFile);
const {formatPrompt, formatSuccess, formatWarning, formatError} = require('./format');

const createConfigFile = obj => {
    const yamlString = yaml.stringify(obj, 4);
    fs.writeFile(configFilePath, yamlString, err => {
        if (err) {
            return console.log(formatError(err));
        }
    });
};

/**
 * Attemts to save the config data to a file.
 * @param {Object} [obj]    The config data as key-value pairs.
 */
const saveConfig = obj => {
    const content = obj ? yaml.stringify(obj, 4) : '';
    fs.writeFile(configFilePath, content, err => {
        if (err) {
            return console.log(formatError(err));
        } else {
            createConfigFile(obj);
        }
        console.log(formatSuccess(`Your config was saved to ${path.join(configFilePath)}!`));
    });
};

/**
 * Attemts to return the config file as an object.
 * If the config file wasn't found, it tries to
 * create an empty file.
 *
 * @returns {Object} Always returns an object,
 * which is either empty or contains the config data.
 */
const getConfig = () => {
    let result = null;
    try {
        result = yaml.load(configFilePath);
    } catch (e) {
        // File probably doesn't exist
        createConfigFile();
    }
    return result || {};
};

const minutesToHoursMinutes = totalMinutes => {
    const minutes = totalMinutes % 60;
    const hours = (totalMinutes - minutes) / 60;

    const minutesString = `${minutes} ${(minutes !== 1) ? 'minutes' : 'minute'}`;
    const hoursString = `${hours} ${(hours > 1) ? 'hours' : 'hour'}`;

    if (hours > 0) {
        if (minutes === 0) {
            return hoursString;
        }
        return `${hoursString} ${minutesString}`;
    } else {
        return minutesString;
    }
};

const calcTimeToAdd = (time, roundUpTime) => {
    if (roundUpTime <= 0 || (time % roundUpTime) === 0) {
        return 0;
    }
    return roundUpTime - (time % roundUpTime);
};

module.exports = {
    saveConfig,
    getConfig,
    minutesToHoursMinutes,
    formatPrompt,
    formatSuccess,
    formatWarning,
    formatError,
    calcTimeToAdd
};
