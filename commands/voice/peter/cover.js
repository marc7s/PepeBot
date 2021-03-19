const { CommandHandler, Action } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');

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
        'kåver',
        'kover',
        'cover'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            let song = 'ringerOchSprackerCovernJPEG.wav';
            let songURI = __basedir + config.bot.URIs.peterURI + song;

            lastSongWigwalk = false;

            message.react('🔊');
            
            await playSong(message.member.voice.channel, songURI);
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