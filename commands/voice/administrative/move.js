const { CommandHandler } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');
const { getChannel, isRestrictedChannel } = require('../../_helpers/voice.js');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.voice,
        config.guilds.frukost.text_channels.bot,
        config.guilds.house.text_channels.botUltra
    ],
    [
        'move'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            let msg = '', logmsg = '';
            let underkover = false;

            if(args.length >= 1){
                let fromChannel, toChannel;
                let firstChannelNeedle = args[0];
                let firstChannel = getChannel(message.guild, firstChannelNeedle, 'voice');
                
                if(firstChannel){
                    if(args.length >= 2){
                        let secondChannelNeedle = args[1];
                        let secondChannel = getChannel(message.guild, secondChannelNeedle, 'voice');
                        if(secondChannel){
                            fromChannel = firstChannel;
                            toChannel = secondChannel;
                        }else{
                            msg = 'Voice channel `' + secondChannelNeedle + '` not found';
                        }
                    }else{
                        fromChannel = message.member.voice.channel;
                        toChannel = firstChannel;
                    }

                    for(const [memberID, member] of fromChannel.members){
                        member.voice.setChannel(toChannel);
                    }
                    
                    let from = ' from `' + fromChannel.name + '`';
                    let to = ' to `' + toChannel.name + '`';
                    logmsg = 'Moved members' + from + to;
                    
                    if(isRestrictedChannel(fromChannel))
                        from = '';
                    
                    if(isRestrictedChannel(toChannel)){
                        message.delete();
                        underkover = true;
                    }
                        
                    
                    msg = 'Moved members' + from + to;

                }
                else{
                    msg = 'Voice channel `' + firstChannelNeedle + '` not found';
                }
            }else{
                msg = 'Missing argument, no voice channel supplied';
            }
            
            if(!underkover){
                message.channel.send(msg);
            }    
            console.log(logmsg);
            return 'movedMembers';
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};