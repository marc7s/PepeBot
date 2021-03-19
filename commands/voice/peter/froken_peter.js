const { CommandHandler, Action } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');

const { readdirSync } = require('fs');
const { playSamples } = require('../../_helpers/voice.js');
const { getMessageEmote } = require('../../_helpers/emotes.js');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.pepeBot,
        config.guilds.frukost.text_channels.bot,
        config.guilds.frukost.text_channels.voice,
        config.guilds.house.text_channels.bot,
        config.guilds.house.text_channels.botUltra
    ],
    [
        'synka',
        'frokenur'
    ],
    async (message, cmd, args) => {
        
        if(message.member.voice.channel){
            message.react('🕓');
            let now = new Date();
            let timeparts = [now.getHours(), now.getMinutes(), now.getSeconds()];
            
            const sampleDir = __basedir + config.bot.URIs.frokenPeterURI;
            const beforeDir = sampleDir + 'before/';
            const afterDir = sampleDir + 'after/';
            
            const beforeFileNames = readdirSync(beforeDir);
            const afterFileNames = readdirSync(afterDir);
            const numberFileNames = readdirSync(sampleDir);
            let numbers = numberFileNames.map(x => x.split('.').slice(0, -1).join('.'));

            let fallbackSample = 'fallback.wav';
            
            let files = [];
            let skip = false;

            if(Math.random() > 0.35){
                let sampleName = beforeFileNames[Math.floor(Math.random() * beforeFileNames.length)];
                files.push(beforeDir + sampleName);
                if(sampleName == 'skip.wav'){
                    skip = true;
                }
            }
            
            if(!skip){
                timeparts.forEach(part => {
                    part = ("00" + part).slice(-2);
                    let index = numbers.indexOf(part);
                    
                        if(index >= 0){
                            files.push(sampleDir + numberFileNames[index]);
                        }else{
                            let digits = part.split('');
                            digits.forEach(digit => {
                                index = numbers.indexOf(digit);
                                if(index >= 0){
                                    if(Math.random() > 0.05){
                                        files.push(sampleDir + numberFileNames[index]);
                                    }else{
                                        files.push(sampleDir + fallbackSample);
                                    }
                                }else{
                                    files.push(sampleDir + fallbackSample);
                                    console.error(digit + " not found in available samples");
                                }
                            });
                        }
                    
                });
    
                files.push(afterDir + afterFileNames[Math.floor(Math.random() * afterFileNames.length)]);
            }

            lastSongWigwalk = false;
            await playSamples(message.member.voice.channel, files);
            return Action.playSong;
        }else{
            let emt  = getMessageEmote(message, config.guilds.frukost.emotes.Sadge);
            message.channel.send('not in voice channel ' + emt);
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};