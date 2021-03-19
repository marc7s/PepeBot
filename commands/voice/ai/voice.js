const { CommandHandler, Action } = require('../../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../../command_handler/command-handler-config');
const { config } = require('../../../.env.js');
const { readdirSync } = require('fs');
const { SpeechClient } = require('@google-cloud/speech');
const { ConvertTo1ChannelStream } = require('../../_helpers/ai.js');

require('discord.js');

const googleSpeechClient = new SpeechClient();

const { getMessageEmote } = require('../../_helpers/emotes.js');
const { playSong } = require('../../_helpers/music.js');

const { Readable } = require('stream');

class Silence extends Readable {
  _read() {
    this.push(Buffer.from([0xF8, 0xFF, 0xFE]));
  }
}

const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.voice
    ],
    [
        'voice',
        'skynet'
    ],
    async (message, cmd, args) => {
        if(message.member.voice.channel){
            const connection = await message.member.voice.channel.join();
            
            const leaveAfter30 = setTimeout(() => {
                if(!respondingOnCmd)
                    message.member.voice.channel.leave();
            }, 30000);
            
            connection.on('ready', () => {
                connection.play(new Silence(), { type: 'opus' });
            });
            connection.on('speaking', (user, speaking) => {
                if (speaking) {
                    message.guild.members.fetch(user.id).then((u) => {
                        if(u.roles.cache.find(r => r.name === "Voice")){
                            console.log(`I'm listening to ${user.username}`);
                            
                            const audioStream = connection.receiver.createStream(user, {mode: 'pcm', end: 'silence'});
                            
                            const requestConfig = {
                                encoding: 'LINEAR16',
                                sampleRateHertz: 48000,
                                languageCode: 'en-US'
                            }
                            const request = {
                                config: requestConfig
                            }
                            const recognizeStream = googleSpeechClient
                            .streamingRecognize(request)
                            .on('error', (err) => {
                                console.error(err);
                                message.channel.send('Daily Google Cloud quota exceeded');
                                let emt = getMessageEmote(message, config.guilds.frukost.emotes.FeelsBadMan);
                                message.channel.send(emt);
                                message.member.voice.channel.leave();
                            })
                            .on('data', async response => {
                                const transcription = response.results
                                .map(result => result.alternatives[0].transcript)
                                .join('\n')
                                .toLowerCase();
                                console.log(`Transcription: ${transcription}`);
                                
                                message.channel.send(user.username + ': *' + transcription + '*');
                                
                                if (transcription.includes('tennessee') || transcription.includes('banger')) {
                                    let song = 'wigwalk';
                                    let songURI = __basedir + config.bot.URIs.songsURI + song + '.mp3';
                                    lastSongWigwalk = true;
                                    
                                    await message.member.voice.channel.leave();
                                    
                                    setTimeout(async () => {
                                        clearInterval(leaveAfter30);
                                        await playSong(message.member.voice.channel, songURI);
                                        return Action.playSong;
                                    }, 500);
                                    
                                    
                                }else if (transcription === 'leave') {
                                    message.member.voice.channel.leave();
                                }else if (transcription === 'pepe') {
                                    let pepeURI = __basedir + config.bot.URIs.pepeURI;
                                    let pepes = readdirSync(pepeURI);
                                    let pepe = new MessageAttachment(pepeURI + pepes[Math.floor(Math.random() * pepes.length)]);
                                    message.channel.send(pepe);
                                    return Action.messageSent;
                                }
                            });

                            const convertTo1ChannelStream = new ConvertTo1ChannelStream();

                            audioStream.pipe(convertTo1ChannelStream).pipe(recognizeStream);

                            audioStream.on('end', async () => {
                                console.log('audioStream end');
                            });
                        }else{
                            console.log(`${user.username} does not have permission to use voice commands`);
                        }
                    });
                    
                } else {
                    console.log(`I stopped listening to ${user.username}`)
                }
                
            })
            .on('error', (err) => console.log(err));
        }else{
            let emt  = getMessageEmote(message, config.bot.emotes.Sadge);
            message.channel.send('not in voice channel ' + emt);
            return Action.exit;
        }
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};