const { CommandHandler } = require('../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../command_handler/command-handler-config');
const { config } = require('../../.env.js');
const { readdirSync } = require('fs');
const { MessageAttachment } = require('discord.js');

require('../_helpers/events');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.schema,
        config.guilds.frukost.text_channels.pepeBot
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
            '.pepe',
            '.schema/.kurser [vecka/imorgon]',
            '.vecka',
            '.ping',
            '.sektion',
            '.färg',
            '.skyddshelgon'
        ];
        switch(cmd) {
            case 'schemalänk':
                message.channel.send(config.bot.links.schema);
                return 'messageSent';
            case 'vecka':
                let today = new Date();
                message.channel.send(today.getWeek());
                return 'messageSent';
            case 'sektion':
                message.channel.send('**DATA**');
                return 'messageSent';
            case 'färg':
                message.channel.send('**ORANGE**');
                return 'messageSent';
            case 'skyddshelgon':
                message.channel.send('**HACKE HACKSPETT HACKE HACKSPETT HACKE HACKSPETT HACKE HACKSPETT**');
                return 'messageSent';
            case 'pepe':
                let pepeURI = __basedir + config.bot.URIs.pepeURI;
                let pepes = readdirSync(pepeURI);
                let pepe = new MessageAttachment(pepeURI + pepes[Math.floor(Math.random() * pepes.length)]);
                message.channel.send(pepe);
                return 'messageSent';
            case 'help':
            case 'commands':
                let msg = 'Commands:\n```';
                for(cmd of commands){
                    msg += cmd + '\n';
                }
                msg += '```';
                message.channel.send(msg);
                return 'messageSent';
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};