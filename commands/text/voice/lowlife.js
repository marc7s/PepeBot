const { CommandHandler } = require('../../../command_handler/command-handler');
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
        config.guilds.frukost.text_channels.music,
        config.guilds.house.text_channels.bot,
        config.guilds.house.text_channels.botUltra
    ],
    [
        'lowlife'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            if(args.length >= 1){
                let targetMention = args[0];
                let userId = getUserIdFromMention(targetMention);
                let target = message.guild.members.cache.get(userId);

                if(target != undefined){
                    if(target.voice.channel){
                        let targetChannel = null;
                        if(message.guild.id == config.guilds.frukost.config.id){
                            targetChannel = config.guilds.frukost.voice_channels.utskallning;
                        }else if(message.guild.id == config.guilds.house.config.id){
                            targetChannel = config.guilds.house.voice_channels.cs;
                        }else{
                            return null;
                        }
        
                        const lowlifeDir = __basedir + config.bot.URIs.lowlifeURI;
                        const flamesDir = lowlifeDir + '/lines/';
                        const flames = readdirSync(flamesDir);
                        const greetingFileName = '/greeting/halla_lowlifers.wav';
        
                        const oldChannel = target.voice.channel;
    
                        await target.voice.setChannel(targetChannel);
                        let files = [];
                        
        
                        flames.forEach(flame => {
                            if(Math.random() >= 0.5){
                                files.push(flamesDir + flame);
                            }
                        });
        
                        shuffleArray(files);
                        files.unshift(lowlifeDir + greetingFileName);
    
                        message.react('📢');
    
                        playSamples(message.guild.channels.cache.get(targetChannel), files);
                        return 'playSong';
                    }else{
                        let msg = 'Target not connected to voice channel';
                        message.channel.send(msg);
                        console.log(msg);
                        return null;
                    }
                }else{
                    let msg = 'Could not find user';
                    message.channel.send(msg);
                    console.log(msg);
                    return null;
                }
            }else{
                let msg = 'Missing argument, select a target';
                message.channel.send(msg);
                console.log(msg);
                return null;
            }
        }else{
            let msg = 'Not in voice channel';
            message.channel.send(msg);
            console.log(msg);
            return null;
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};