require('dotenv').config();
const env = require('./.env.js');
const path = require('path');
const { checkHandlers } = require('./configs/handler-config');
const schedule = require('node-schedule');


var birthdayHandler = require('./commands/scheduled/birthday');


global.__basedir = path.normalize(__dirname + '/');
global.lastSongWigwalk = false;

const { Client, Intents } = require('discord.js');
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

const intents = new Intents([
    Intents.NON_PRIVILEGED,
    "GUILD_MEMBERS"
]);

const bot = new Client({ws: { intents }});

bot.once('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');

    bot.user.setPresence(env.config.bot.presence);
});

bot.login(env.config.discord.token);

// SECOND MINUTE HOUR DAY_OF_MONTH MONTH DAY_OF_WEEK
schedule.scheduleJob('0 0 0 * * *', () => { birthdayHandler.handle(bot); });

bot.on('message', message => {
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





