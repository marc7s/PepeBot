require('dotenv').config();
const env = require('./.env.js');
const path = require('path');
const { checkHandlers } = require('./configs/handler-config');
const schedule = require('node-schedule');
const SingleInstance = require('single-instance');
const locker = new SingleInstance('PepeBot');
const { updateBirthdayOptIn } = require('./commands/_helpers/files');


var birthdayHandler = require('./commands/scheduled/birthday');


global.__basedir = path.normalize(__dirname + '/');
global.lastSongWigwalk = false;

const { Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');
const fs = require('fs');

if(!fs.existsSync('./cloud-auth.json')){
    fs.writeFileSync('cloud-auth.json', JSON.stringify(env.config.google_cloud));
}

var logger = require('winston');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

locker.lock().then(() => {    
    const intents = new Intents(
        [
            Intents.FLAGS.GUILDS, 
            Intents.FLAGS.GUILD_MEMBERS, 
            Intents.FLAGS.GUILD_BANS, 
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_MESSAGE_TYPING,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING
        ]);

    const bot = new Client({intents: intents});

    bot.once('ready', function (evt) {
        logger.info('Connected');
        logger.info('Logged in as: ');
        logger.info(bot.user.username + ' - (' + bot.user.id + ')');

        bot.user.setPresence(env.config.bot.presence);
    });

    bot.login(env.config.discord.token);
    
    // SECOND MINUTE HOUR DAY_OF_MONTH MONTH DAY_OF_WEEK
    schedule.scheduleJob('0 0 0 * * *', () => { birthdayHandler.handle(bot); });

    bot.on('messageCreate', message => {
        Object.keys(env.config.guilds).forEach(async key => {
            let guild = env.config.guilds[key];
            if(guild.config.id == message.guild.id){

                const cmdChar = guild.config.cmdChar;
                const cmdCharLen = cmdChar.length;
                let args = message.content.substring(cmdCharLen).split(' ');
                let firstChar = message.content.substring(0, cmdCharLen);
                let cmd = args[0];
                args.shift();

                checkHandlers(firstChar, cmd, args, message, guild);            
            }
        });
    });

    bot.on('interactionCreate', async interaction => {
        if (!interaction.isSelectMenu()) return;

        if(interaction.customId === 'select-opt'){
            if(interaction.values.includes('birthday')){
                const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select-opt-birthday')
                        .setMinValues(1)
                        .setMaxValues(1)
                        .setPlaceholder('Select...')
                        .addOptions([
                            {
                                label: 'Yes',
                                description: 'You will receive birthday wishes',
                                value: 'yes'
                            },
                            {
                                label: 'No',
                                description: 'You will not receive birthday wishes',
                                value: 'no'
                            }
                        ]),
                );
                await interaction.reply({content: `<@${interaction.user.id}>, do you wish to receive birthday wishes?`, components: [row]});
            }
        }else if(interaction.customId === 'select-opt-birthday'){
            let update = updateBirthdayOptIn(interaction.user.id, interaction.values.includes('yes') ? true : false);
            interaction.reply(`Opt in settings for <@${interaction.user.id}> ${update ? 'updated successfully' : 'failed to update'}`);
        }
    });
}).catch(err => {
    console.error("PepeBot is already running");
});




