const { CommandHandler, Action } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');
const { getUserIdFromMention, shuffleArray } = require('../../_helpers/voice.js');
const { playSamples } = require('../../_helpers/voice.js');
const { readdirSync } = require('fs');

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.voice,
        config.guilds.frukost.text_channels.pepeBot,
        config.guilds.frukost.text_channels.bot,
        config.guilds.house.text_channels.bot,
        config.guilds.house.text_channels.botUltra
    ],
    [
        'lowlife'
    ],
    async (message, cmd, args) => {
        let msg = '';
        if(message.member.voice.channel){
            if(args.length >= 1){
                let targetMention = args[0];
                let move = true;
                if(targetMention == 'here'){
                    move = false;
                }
                let userId = getUserIdFromMention(targetMention);
                let target = message.guild.members.cache.get(userId);

                if(!move || target != undefined){
                    if(!move || target.voice.channel){
                        let targetChannel = null;
                        if(!move){
                            targetChannel = message.member.voice.channel.id;
                        }
                        else if(message.guild.id == config.guilds.frukost.config.id){
                            targetChannel = config.guilds.frukost.voice_channels.utskallning;
                        }else if(message.guild.id == config.guilds.house.config.id){
                            targetChannel = config.guilds.house.voice_channels.cs;
                        }else{
                            return null;
                        }
        
                        const lowlifeDir = __basedir + config.bot.URIs.lowlifeURI;
                        const flamesDir = lowlifeDir + '/lines/';
                        const flames = readdirSync(flamesDir);
                        const greetingFileName = '/greeting/hallaLowlifers.wav';
                        
                        let targetName = '';
                        
                        if(move){
                            await target.voice.setChannel(targetChannel);
                            targetName = target.displayName;
                        }else{
                            targetName = 'themselves';
                        }
                        
                        let files = [];
                        
        
                        flames.forEach(flame => {
                            if(Math.random() >= 0.6){
                                files.push(flamesDir + flame);
                            }
                        });
        
                        shuffleArray(files);
                        files.unshift(lowlifeDir + greetingFileName);
    
                        message.react('📢');
    
                        playSamples(message.guild.channels.cache.get(targetChannel), files);
                        console.log(message.member.displayName + ' scolded ' + targetName);
                        return Action.playSong;
                    }else{
                        msg = 'Target not connected to voice channel';
                    }
                }else{
                    msg = 'Could not find user';
                }
            }else{
                msg = 'Missing argument, select a target';
            }
        }else{
            msg = 'Not in voice channel';
        }
        message.channel.send(msg);
        console.log(msg);
        return Action.exit;
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};