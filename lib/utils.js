const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');
const chalk = require('chalk');
const configFile = 'config.yml';
const rootDir = path.dirname(require.main.filename);
const configFilePath = path.join(rootDir, configFile);

const createConfigFile = (team, key) => {
    const yamlString = yaml.stringify({team, key}, 4);
    fs.writeFile(configFilePath, yamlString, err => {
        if (err) {
            return console.log(chalk.red(err));
        }
    });
};

const saveConfig = (team, key) => {
    const yamlString = yaml.stringify({team, key}, 4);
    fs.writeFile(configFilePath, yamlString, err => {
        if (err) {
            return console.log(chalk.red(err));
        } else {
            createConfigFile(team, key);
        }
        console.log(chalk.green(`Your config was saved to ${path.join(configFilePath)}!`));
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

// TODO: if this gets too big, consider splitting it up like the commands
module.exports = {
    saveConfig,
    getConfig,
    minutesToHoursMinutes
};
