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
        'scatter'
    ],
    async (message, cmd, args) => {
        let old_vc = message.member.voice.channel;
        let vcKeys = Object.keys(config.bot.voice_channels);
        for(const [memberID, member] of old_vc.members){
            let randChannel = config.bot.voice_channels[vcKeys[vcKeys.length * Math.random() << 0]];
            member.voice.setChannel(randChannel);
        }
        let msg = 'Moved members to random channels';
        message.channel.send(msg);
        console.log(msg);
        return 'movedMembers';
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};