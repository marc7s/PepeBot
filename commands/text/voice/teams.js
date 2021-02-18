const { CommandHandler } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.voice
    ],
    [
        'teams'
    ],
    async (message, cmd, args) => {
        let old_vc = message.member.voice.channel;
        let members = [];
        for(const [memberID, member] of old_vc.members){
            members.push(member);
        }
        let half = Math.ceil(members.length / 2);
        let team1 = members.splice(0, half);
        let team2 = members.splice(-half);
        for(member of team1){
            member.voice.setChannel(config.bot.voice_channels.team1);
        }
        for(member of team2){
            member.voice.setChannel(config.bot.voice_channels.team2);
        }
        let msg = 'Moved members to random teams';
        message.channel.send(msg);
        console.log(msg);
        return 'movedMembers';
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};