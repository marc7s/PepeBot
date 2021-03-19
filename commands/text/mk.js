const { CommandHandler, Action } = require('../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../command_handler/command-handler-config');
const { config } = require('../../.env.js');

const chConfig = new CommandHandlerConfig(
    true,
    true,
    [
        config.guilds.frukost.text_channels.mk
    ],
    [
    ],
    async (message, cmd, args) => {
        if(message.content.toLowerCase().includes('data')){
            let excuse = config.guilds.frukost.mk_responses[Math.floor(Math.random() * config.guilds.frukost.mk_responses.length)];
            message.react('😡');
            message.reply(excuse);
            return Action.messageSent;
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};