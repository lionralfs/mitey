const api = require('../api');

const verify = () => {
    api.getMyself(result => {
        if (result.user && result.user.name) {
            console.log(`🎉 It worked! Hello ${result.user.name}. Use \`mitey -h\` to see all available commands.`);
        } else {
            console.log(`💀 Something went wrong. You should probably use \`mitey init\`.`);
        }
    });
};

module.exports = verify;
