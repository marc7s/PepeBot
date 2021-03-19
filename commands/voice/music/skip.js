const { CommandHandler, Action } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');

const { getReactionEmote } = require('../../_helpers/emotes.js');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.bot,
        config.guilds.frukost.text_channels.wigwalk,
        config.guilds.house.text_channels.bot,
        config.guilds.house.text_channels.botUltra
    ],
    [
        's',
        'skip'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            if(lastSongWigwalk)
                message.channel.send('**YOU DON\'T SKIP TENNESSEE WIGWALK**');
            let emt = getReactionEmote(message, config.guilds.frukost.emotes.HYPERDANSGAME);
            if(emt.length > 0)
                message.react(emt);
            lastSongWigwalk = false;
            message.member.voice.channel.leave();
            return Action.skipSong;
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};