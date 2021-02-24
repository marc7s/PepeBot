const { CommandHandler } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');
const { getChannel } = require('../../_helpers/voice.js');

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
            let msg = '';

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

                    msg = 'Moved members from `' + fromChannel.name + '` to `' + toChannel.name + '`';
                }
                else{
                    msg = 'Voice channel `' + firstChannelNeedle + '` not found';
                }
            }else{
                msg = 'Missing argument, no voice channel supplied';
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