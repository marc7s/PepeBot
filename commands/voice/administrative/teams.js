const { CommandHandler, Action } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');
const { shuffleArray } = require('../../_helpers/voice.js');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.voice,
        config.guilds.house.text_channels.botUltra
    ],
    [
        'teams'
    ],
    async (message, cmd, args) => {
        let old_vc = message.member.voice.channel;
        let members = [];
        let msg = '';

        for(const [memberID, member] of old_vc.members){
            members.push(member);
        }
        shuffleArray(members);

        let half = Math.ceil(members.length / 2);
        let team1 = members.splice(0, half);
        let team2 = members.splice(-half);

        let team1Channel, team2Channel;
        if(message.guild.id == config.guilds.frukost.config.id){
            team1Channel = config.guilds.frukost.voice_channels.team1;
            team2Channel = config.guilds.frukost.voice_channels.team2;
        }else if(message.guild.id == config.guilds.house.config.id){
            team1Channel = config.guilds.house.voice_channels.lag1;
            team2Channel = config.guilds.house.voice_channels.lag2;
        }else{
            msg = 'Unknown guild';
        }

        if(team1Channel && team2Channel){
            for(member of team1){
                member.voice.setChannel(team1Channel);
            }
            for(member of team2){
                member.voice.setChannel(team2Channel);
            }
            msg = 'Moved members to random teams';
        }
        
        message.channel.send(msg);
        console.log(msg);
        return Action.movedMembers;
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};