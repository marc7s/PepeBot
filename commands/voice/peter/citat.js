const { CommandHandler } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');
const { readdirSync } = require('fs');

const { getMessageEmote } = require('../../_helpers/emotes.js');
const { playSong } = require('../../_helpers/music.js');

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
            const allCitat = readdirSync(__basedir + config.bot.URIs.citatURI);
            
            let citat = allCitat[Math.floor(Math.random() * allCitat.length)];
            let citatURI = __basedir + config.bot.URIs.citatURI + citat;
            
            lastSongWigwalk = false;
            
            message.react('🧠');
            
            await playSong(message.member.voice.channel, citatURI);
            return 'playSong';
        }else{
            let emt  = getMessageEmote(message, config.guilds.frukost.emotes.Sadge);
            message.channel.send('not in voice channel ' + emt);
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};