const { CommandHandler } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.bot.text_channels.voice
    ],
    [
        'leave',
        'stop'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            message.member.voice.channel.leave();
            return 'leaveChannel';
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};