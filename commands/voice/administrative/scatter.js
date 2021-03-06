const { CommandHandler } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');
const { getChannels } = require('../../_helpers/voice');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.voice,
        config.guilds.house.text_channels.botUltra
    ],
    [
        'scatter'
    ],
    async (message, cmd, args) => {
        let old_vc = message.member.voice.channel;
        let channels = [];

        channels = getChannels(message.guild, 'voice');
        if(channels){
            let vcKeys = Array.from(channels.keys());
        
            for(const [memberID, member] of old_vc.members){
                let randChannel = channels.get(vcKeys[vcKeys.length * Math.random() << 0]);
                member.voice.setChannel(randChannel);
            }
            let msg = 'Moved members to random channels';
            message.channel.send(msg);
            console.log(msg);
            return 'movedMembers';
        }else{
            console.error('scatter: No voice channels found');
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};