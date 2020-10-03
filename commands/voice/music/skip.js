const { CommandHandler } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');

const { getReactionEmote } = require('../../_helpers/emotes.js');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.bot.text_channels.music,
        config.bot.text_channels.wigwalk
    ],
    [
        's',
        'skip'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            if(lastSongWigwalk)
                message.channel.send('**YOU DON\'T SKIP TENNESSEE WIGWALK**');
            let emt = getReactionEmote(message, config.bot.emotes.HYPERDANSGAME);
            if(emt !== false)
                message.react(emt);
            lastSongWigwalk = false;
            message.member.voice.channel.leave();
            return 'skipSong';
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};