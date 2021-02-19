var rouletteHandler = require('../commands/voice/music/roulette');
var boostedHandler = require('../commands/voice/music/boosted');
var notNerdyHandler = require('../commands/voice/music/notnerdy');
var pushHandler = require('../commands/voice/music/push');
var wigwalkHandler = require('../commands/voice/music/wigwalk');
var anthemHandler = require('../commands/voice/music/anthem');
var synthHandler = require('../commands/voice/music/synth');
var recursionHandler = require('../commands/voice/music/recursion');
var visitorsHandler = require('../commands/voice/music/visitors');
var vibeHandler = require('../commands/voice/music/vibe');
var skipHandler = require('../commands/voice/music/skip');
var frokenPeterHandler = require('../commands/voice/misc/froken_peter');
var voiceHandler = require('../commands/voice/ai/voice');

var bangerReactHandler = require('../commands/text/global/bangerReact');
var pepeReactHandler = require('../commands/text/global/pepeReact');
var pingHandler = require('../commands/text/global/ping');

var moveHandler = require('../commands/text/voice/move');
var leaveHandler = require('../commands/text/voice/leave');
var teamsHandler = require('../commands/text/voice/teams');
var scatterHandler = require('../commands/text/voice/scatter');
var lowlifeHandler = require('../commands/text/voice/lowlife');

var mkHandler = require('../commands/text/mk');
var shortCommandsHandler = require('../commands/text/shortCommands');
var scheduleHandler = require('../commands/text/schedule');

class HandlerConfig{
    
        static houseHandlers = [
            rouletteHandler,
            boostedHandler,
            notNerdyHandler,
            anthemHandler,
            synthHandler,
            recursionHandler,
            visitorsHandler,
            vibeHandler,
            pushHandler,
            frokenPeterHandler,
            skipHandler,
            pingHandler,
            moveHandler,
            leaveHandler,
            teamsHandler,
            scatterHandler,
            lowlifeHandler,
            shortCommandsHandler,
            //voiceHandler, -- Removed temporarily until permanent Google Cloud-solution in place
            bangerReactHandler,
            pepeReactHandler
        ];

         static frukostHandlers = [
            rouletteHandler,
            boostedHandler,
            notNerdyHandler,
            anthemHandler,
            synthHandler,
            recursionHandler,
            visitorsHandler,
            vibeHandler,
            pushHandler,
            frokenPeterHandler,
            skipHandler,
            pingHandler,
            moveHandler,
            leaveHandler,
            teamsHandler,
            scatterHandler,
            lowlifeHandler,
            shortCommandsHandler,
            scheduleHandler,
            //voiceHandler, -- Removed temporarily until permanent Google Cloud-solution in place
            bangerReactHandler,
            pepeReactHandler,
            mkHandler
        ];
    
    
}

async function checkHandlers(firstChar, cmd, args, message, guild){
    let actions = [];
    let handlers = [];
    if(guild.config.name == 'frukost'){
        handlers = HandlerConfig.frukostHandlers;
    }else if(guild.config.name == 'house'){
        handlers = HandlerConfig.houseHandlers;
    }

    for(let cmdHandler of handlers){
        actions.push(await cmdHandler.handler.handle(firstChar, cmd, args, message, guild));
    }

    if((!actions.includes('playSong') && !actions.includes('skipSong') && !actions.includes('leaveChannel') && !actions.includes('movedMembers')) && wigwalkHandler.handler.config.channels.includes(message.channel.id))
        await wigwalkHandler.handler.handle(firstChar, cmd, args, message, guild);
}

module.exports = {
    HandlerConfig,
    checkHandlers
}