const { CommandHandler, Action } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');
const { readdirSync } = require('fs');

const { getMessageEmote } = require('../../_helpers/emotes.js');
const { playSong } = require('../../_helpers/music.js');
const { shuffleArray, playSamples } = require('../../_helpers/voice');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.bot,
        config.guilds.house.text_channels.bot,
        config.guilds.house.text_channels.botUltra
    ],
    [
        'citat'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            let citatDir = __basedir + config.bot.URIs.citatURI;
            const allCitat = readdirSync(citatDir);
            let num = 1;

            if(args.length == 1 && (args[0] == parseInt(args[0]))){
                num = parseInt(args[0]);
            }

            let citat = [];

            shuffleArray(allCitat);
            for(let i = 0; i < num && i < allCitat.length; i++){
                citat.push(citatDir + allCitat[i]);
            }
            
            lastSongWigwalk = false;
            
            message.react('🧠');
            
            await playSamples(message.member.voice.channel, citat);
            return Action.playSong;
        }else{
            let emt  = getMessageEmote(message, config.guilds.frukost.emotes.Sadge);
            message.channel.send('not in voice channel ' + emt);
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};