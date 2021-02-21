const { CommandHandler } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');

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

        if(message.guild.id == config.guilds.frukost.config.id){
            channels = config.guilds.frukost.voice_channels;
        }else if(message.guild.id == config.guilds.house.config.id){
            channels = config.guilds.house.voice_channels;
        }else{
            return null;
        }

        let vcKeys = Object.keys(channels);
        
        for(const [memberID, member] of old_vc.members){
            let randChannel = channels[vcKeys[vcKeys.length * Math.random() << 0]];
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