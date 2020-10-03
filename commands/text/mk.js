const { CommandHandler } = require('../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../command_handler/command-handler-config');
const { config } = require('../../.env.js');

const chConfig = new CommandHandlerConfig(
    false,
    true,
    [
        config.bot.text_channels.mk
    ],
    [
    ],
    async (message, cmd, args) => {
        if(message.content.toLowerCase().includes('data')){
            let excuse = config.bot.mk_responses[Math.floor(Math.random() * config.bot.mk_responses.length)];
            message.react('😡');
            message.reply(excuse);
            return 'messageSent';
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};