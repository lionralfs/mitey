const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');
const chalk = require('chalk');
const configFile = 'config.yml';
const rootDir = path.dirname(require.main.filename);
const configFilePath = path.join(rootDir, configFile);

const createConfigFile = obj => {
    const yamlString = yaml.stringify(obj, 4);
    fs.writeFile(configFilePath, yamlString, err => {
        if (err) {
            return console.log(formatError(err));
        }
    });
};

const saveConfig = obj => {
    const yamlString = yaml.stringify(obj, 4);
    fs.writeFile(configFilePath, yamlString, err => {
        if (err) {
            return console.log(formatError(err));
        } else {
            createConfigFile(obj);
        }
        console.log(formatSuccess(`Your config was saved to ${path.join(configFilePath)}!`));
    });
};

const getConfig = () => {
    try {
        const config = yaml.load(configFilePath);
        if (!config) {
            return {};
        }
        return config;
    } catch (e) {
        // File probably doesn't exist
        createConfigFile();
        return {};
    }
};

const minutesToHoursMinutes = totalMinutes => {
    let minutes = totalMinutes % 60;
    let hours = (totalMinutes - minutes) / 60;

    minutes = `${minutes} ${(minutes !== 1) ? 'minutes' : 'minute'}`;

    if (hours > 0) {
        hours = `${hours} ${(hours > 1) ? 'hours' : 'hour'}`;
        return `${hours} ${minutes}`;
    } else {
        return minutes;
    }
};

const formatPrompt = prompt => {
    return chalk.white.underline(prompt);
};

const formatSuccess = msg => {
    return chalk.green(msg);
};

const formatWarning = msg => {
    return chalk.yellow(msg);
};

const formatError = msg => {
    return chalk.red(msg);
};

const calcTimeToAdd = (time, roundUpTime) => {
    if (roundUpTime <= 0 || (time % roundUpTime) === 0) {
        return 0;
    }
    return roundUpTime - (time % roundUpTime);
};

// TODO: if this gets too big, consider splitting it up like the commands
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
