const { CommandHandler, Action } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    Object.values(config.guilds.frukost.text_channels)
        .concat(Object.values(config.guilds.house.text_channels)),
    [
        'ping'
    ],
    async (message, cmd, args) => {
        message.channel.send('Pong!');
        return Action.messageSent;
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};