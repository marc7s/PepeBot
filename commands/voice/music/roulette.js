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
        config.guilds.frukost.text_channels.music
    ],
    [
        'play',
        'roulette'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            const roulette = readdirSync(__basedir + config.bot.URIs.rouletteURI);
            
            let song = roulette[Math.floor(Math.random() * roulette.length)];
            let songURI = __basedir + config.bot.URIs.rouletteURI + song;
            
            if(song.toLowerCase().includes('wigwalk')){
                lastSongWigwalk = true;
            }else{
                lastSongWigwalk = false;
            }
            
            message.channel.send('🎵 ' + song.split('.')[0] + ' 🎵');
            
            await playSong(message.member.voice.channel, songURI);
            return 'playSong';
        }else{
            let emt  = getMessageEmote(message, config.bot.emotes.Sadge);
            message.channel.send('not in voice channel ' + emt);
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};