const { CommandHandler, Action } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');

const chConfig = new CommandHandlerConfig(
    true,
    true,
    Object.values(config.guilds.frukost.text_channels)
        .concat(Object.values(config.guilds.house.text_channels)),
    [

    ],
    async (message, cmd, args) => {
        if (message.content.includes(config.bot.links.wigwalk)){
            message.react('🇧')
            .then(() => message.react('🇦'))
            .then(() => message.react('🇳'))
            .then(() => message.react('🇬'))
            .then(() => message.react('🇪'))
            .then(() => message.react('🇷'));
            return Action.messageReact;
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};