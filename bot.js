require('dotenv').config();
const env = require('./.env.js');
const path = require('path');

global.__basedir = path.normalize(__dirname + '/');
global.lastSongWigwalk = false;

const { Client } = require('discord.js');
var fs = require('fs');

if(!fs.existsSync('./cloud-auth.json')){
    fs.writeFileSync('cloud-auth.json', JSON.stringify(env.config.google_cloud));
}


var logger = require('winston');

const cmdChar = env.config.bot.command_character;
const cmdCharLen = cmdChar.length;

var rouletteHandler = require('./commands/voice/music/roulette');
var boostedHandler = require('./commands/voice/music/boosted');
var notNerdyHandler = require('./commands/voice/music/notnerdy');
var pushHandler = require('./commands/voice/music/push');
var wigwalkHandler = require('./commands/voice/music/wigwalk');
var anthemHandler = require('./commands/voice/music/anthem');
var synthHandler = require('./commands/voice/music/synth');
var recursionHandler = require('./commands/voice/music/recursion');
var visitorsHandler = require('./commands/voice/music/visitors');
var vibeHandler = require('./commands/voice/music/vibe');
var skipHandler = require('./commands/voice/music/skip');
var voiceHandler = require('./commands/voice/ai/voice');

var bangerReactHandler = require('./commands/text/global/bangerReact');
var pepeReactHandler = require('./commands/text/global/pepeReact');
var pingHandler = require('./commands/text/global/ping');

var moveHandler = require('./commands/text/voice/move');
var leaveHandler = require('./commands/text/voice/leave');
var teamsHandler = require('./commands/text/voice/teams');
var scatterHandler = require('./commands/text/voice/scatter');

var mkHandler = require('./commands/text/mk');
var shortCommandsHandler = require('./commands/text/shortCommands');
var scheduleHandler = require('./commands/text/schedule');

const handlers = [
    rouletteHandler,
    boostedHandler,
    notNerdyHandler,
    anthemHandler,
    synthHandler,
    recursionHandler,
    visitorsHandler,
    vibeHandler,
    pushHandler,
    skipHandler,
    pingHandler,
    moveHandler,
    leaveHandler,
    teamsHandler,
    scatterHandler,
    shortCommandsHandler,
    scheduleHandler,
    //voiceHandler, -- Removed temporarily until permanent Google Cloud-solution in place
    bangerReactHandler,
    pepeReactHandler,
    mkHandler
];


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

    bot.user.setPresence(env.config.bot.presence);
});

bot.login(env.config.discord.token);

bot.on('message', async message => {
    let args = message.content.substring(cmdCharLen).split(' ');
    let firstChar = message.content.substring(0, cmdCharLen);
    let cmd = args[0];
    args.shift();
    let actions = [];

    for(let cmdHandler of handlers){
        actions.push(await cmdHandler.handler.handle(firstChar, cmd, args, message));
    }

    if((!actions.includes('playSong') && !actions.includes('skipSong') && !actions.includes('leaveChannel') && !actions.includes('movedMembers')) && wigwalkHandler.handler.config.channels.includes(message.channel.id))
        await wigwalkHandler.handler.handle(firstChar, cmd, args, message);
    
});





