const { CommandHandler, Action } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.voice,
        config.guilds.frukost.text_channels.bot,
        config.guilds.house.text_channels.bot,
        config.guilds.house.text_channels.botUltra
    ],
    [
        'leave',
        'stop'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            message.member.voice.channel.leave();
            return Action.leaveChannel;
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};