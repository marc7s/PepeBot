const { CommandHandler } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');

const { getMessageEmote } = require('../../_helpers/emotes.js');
const { playSong } = require('../../_helpers/music.js');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.bot.text_channels.music
    ],
    [
        'anthem',
        'shadilay',
        'theme'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            let song = 'Shadilay';
            let songURI = __basedir + config.bot.URIs.songsURI + song + '.mp3';

            lastSongWigwalk = true;

            message.channel.send('🎵 ' + song + ' 🎵');
            
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