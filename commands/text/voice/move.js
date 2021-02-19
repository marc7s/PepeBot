const { CommandHandler } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');
const { getChannelFromText } = require('../../_helpers/voice.js');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.voice,
        config.guilds.house.text_channels.botUltra
    ],
    [
        'move'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            let newChannel = null;
            if(message.guild.id == config.guilds.frukost.config.id){
                newChannel = config.guilds.frukost.voice_channels.oklart;
            }else if(message.guild.id == config.guilds.house.config.id){
                newChannel = config.guilds.house.voice_channels.general;
            }
            
            let old_vc = message.member.voice.channel;
            if(args.length == 1){
                newChannel = getChannelFromText(args[0]);
            }else if(args.length == 2){
                oldChannel = getChannelFromText(args[0]);
                newChannel = getChannelFromText(args[1]);
                old_vc = message.guild.channels.cache.get(oldChannel);
            }
                
            let new_vc = message.guild.channels.cache.get(newChannel);
            for(const [memberID, member] of old_vc.members){
                member.voice.setChannel(newChannel);
            }
            
            let msg = '';
            if(new_vc != undefined && old_vc != undefined){
                msg = 'Moved members from ' + old_vc.name + ' to ' + new_vc.name;
            }
            else{
                msg = 'Could not find voice channel';
            }
            message.channel.send(msg);
            console.log(msg);
            return 'movedMembers';
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};