const { CommandHandler, Action } = require('../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../command_handler/command-handler-config');
const { config } = require('../../.env.js');
const { getRandomImage } = require('../_helpers/files');
const { MessageAttachment } = require('discord.js');

require('../_helpers/events');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.schema,
        config.guilds.frukost.text_channels.bot,
        config.guilds.frukost.text_channels.pepeBot,
        config.guilds.house.text_channels.bot,
        config.guilds.house.text_channels.botUltra
    ],
    [
        'schemalänk',
        'vecka',
        'sektion',
        'färg',
        'skyddshelgon',
        'pepe',
        'help',
        'commands'
    ],
    async (message, cmd, args) => {
        const commands = [
            '.play/.roulette',
            '.stop/.s',
            '.boost/.boosted',
            '.chalmers/.intenördigt',
            '.visitors',
            '.git/.push',
            '.recursion/.haskell',
            '.synth',
            '.vibe',
            '.intro/.kjell',
            '.kåver/.cover',
            '.pepe',
            '.schema/.kurser [vecka/imorgon]',
            '.vecka',
            '.ping',
            '.sektion',
            '.färg',
            '.skyddshelgon',
            '.synka',
            '.lowlife [@Member]',
            '.move [ToChannel]/.move [FromChannel] [ToChannel]',
            '.teams'
        ];
        switch(cmd) {
            case 'schemalänk':
                message.channel.send(config.bot.links.schema);
                return Action.messageSent;
            case 'vecka':
                let today = new Date();
                message.channel.send(today.getWeek());
                return Action.messageSent;
            case 'sektion':
                message.channel.send('**DATA**');
                return Action.messageSent;
            case 'färg':
                message.channel.send('**ORANGE**');
                return Action.messageSent;
            case 'skyddshelgon':
                message.channel.send('**HACKE HACKSPETT HACKE HACKSPETT HACKE HACKSPETT HACKE HACKSPETT**');
                return Action.messageSent;
            case 'pepe':
                let randPepe = getRandomImage(config.bot.URIs.pepeURI);
                const pepe = new MessageAttachment(randPepe);
                message.channel.send(pepe);
                return Action.messageSent;
            case 'help':
            case 'commands':
                let msg = 'Commands:\n```';
                for(cmd of commands){
                    msg += cmd + '\n';
                }
                msg += '```';
                message.channel.send(msg);
                return Action.messageSent;
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};