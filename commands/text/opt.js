const { CommandHandler, Action } = require('../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../command_handler/command-handler-config');
const { config } = require('../../.env.js');

const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');


const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.bot,
        config.guilds.house.text_channels.bot,
        config.guilds.house.text_channels.botUltra,
        config.guilds.frukost.text_channels.pepeBot
    ],
    [
        'opt',
        'optin',
        'optins',
        'optout',
        'settings'
    ],
    async (message, cmd, args) => {
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select-opt')
                    .setMinValues(1)
                    .setMaxValues(1)
					.setPlaceholder('Select...')
					.addOptions([
						{
							label: 'Birthday',
							description: 'Opt in or out for birthday wishes',
							value: 'birthday'
						}
					]),
			);
        await message.react('🇩');
        await message.react('🇲');
        await message.react('👀');
        await message.author.send({content: 'What do you want to opt in or out of?', components: [row]});
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};