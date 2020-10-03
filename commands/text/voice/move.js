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
        'move'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            let newChannel = config.bot.voice_channels.oklart;
            if(args.length >= 1){
                switch (args[0].toLowerCase()){
                    case 'plugg1':
                        newChannel = config.bot.voice_channels.plugg1;
                        break;
                    case 'plugg2':
                        newChannel = config.bot.voice_channels.plugg2;
                        break;
                    case 'oklart':
                        newChannel = config.bot.voice_channels.oklart;
                        break;
                    case 'basen':
                        newChannel = config.bot.voice_channels.basen;
                        break;
                    case 'among-us':
                    case 'amongus':
                        newChannel = config.bot.voice_channels.amongUs;
                        break;
                }
            }
            let old_vc = message.member.voice.channel;
            let new_vc = message.guild.channels.cache.get(newChannel);
            for(const [memberID, member] of old_vc.members){
                member.voice.setChannel(newChannel);
            }
            let msg = 'Moved members from ' + old_vc.name + ' to ' + new_vc.name;
            message.channel.send(msg);
            console.log(msg);
            return 'movedMembers';
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};