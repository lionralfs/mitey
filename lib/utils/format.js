const chalk = require('chalk');

const formatPrompt = (prompt) => {
  return chalk.white.underline(prompt);
};

const formatSuccess = (msg) => {
  return chalk.green(msg);
};

const formatWarning = (msg) => {
  return chalk.yellow(msg);
};

const formatError = (msg) => {
  return chalk.red(msg);
};

module.exports = {
  formatPrompt,
  formatSuccess,
  formatWarning,
  formatError,
};
