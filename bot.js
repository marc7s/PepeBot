require('dotenv').config();
const env = require('./.env.js');
const path = require('path');
const { checkHandlers } = require('./configs/handler-config');


global.__basedir = path.normalize(__dirname + '/');
global.lastSongWigwalk = false;

const { Client } = require('discord.js');
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

const bot = new Client();

bot.once('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');

    //bot.user.setPresence(env.config.bot.presence);
});

bot.login(env.config.discord.token);


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
            
            //let handlers = guild.config.handler;
            //console.log(handlers);

            checkHandlers(firstChar, cmd, args, message, guild);

            /*
            for(let cmdHandler of guild.handlers){
                actions.push(await cmdHandler.handler.handle(firstChar, cmd, args, message));
            }*/
            /*
            if((!actions.includes('playSong') && !actions.includes('skipSong') && !actions.includes('leaveChannel') && !actions.includes('movedMembers')) && wigwalkHandler.handler.config.channels.includes(message.channel.id))
                await wigwalkHandler.handler.handle(firstChar, cmd, args, message);
                */
            
        }
    });
});





