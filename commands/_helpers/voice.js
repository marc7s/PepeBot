const { config } = require('../../.env.js');
const path = require('path');
const fs = require('fs');

const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
} = require('@discordjs/voice');

async function playSamples(channel, samples){
    if(samples.length > 0){
        if(channel.joinable){
            let sampleURI = path.win32.normalize(samples.shift());
            if(fs.existsSync(sampleURI)){
                const player = createAudioPlayer();
                
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator
                });

                await entersState(connection, VoiceConnectionStatus.Ready, 30e3);

                connection.subscribe(player);
                
                let resource = createAudioResource(sampleURI, {
                    inputType: StreamType.Arbitrary
                });
                
                player.play(resource);

                await entersState(player, AudioPlayerStatus.Playing, 5e3);

                player.on(AudioPlayerStatus.Idle, async () => {
                    if(samples.length > 0){
                        sampleURI = path.win32.normalize(samples.shift());
                        if(fs.existsSync(sampleURI)){
                            resource = createAudioResource(sampleURI, {
                                inputType: StreamType.Arbitrary
                            });
                            player.play(resource);
                            await entersState(player, AudioPlayerStatus.Playing, 5e3);
                        }
                    }else{
                        player.stop();
                        connection.disconnect();
                    }
                });
            }else{
                console.error('Error: Sample path does not exist');
            }     
        }else{
            console.error('Error. No permission to join ' + channel.name);
        }
    }
}

function getUserIdFromMention(mention) {
	if (!mention) return false;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
        return mention;
	}
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function isChannel(channelName, needle){
    return channelCompareString(channelName) === channelCompareString(needle);
}

function channelCompareString(channel){
    return channel.replace(/\s+/, '').toLowerCase();
}

async function getChannel(guild, needle, type){
    return guild.channels.cache.find(ch => { return isChannel(ch.name, needle) && ch.type == type });
}

function getChannels(guild, type){
    return guild.channels.cache.filter(channel => channel.type == type);
}

function isRestrictedChannel(channel){
    let isPrivate = false;

    if(channel.permissionOverwrites){
        for(let [id, perm] of channel.permissionOverwrites.cache){
            if(perm.deny.has("VIEW_CHANNEL")){
                isPrivate = true;
                break;
            }
        }
    }
    return isPrivate;
}

const ChannelType = {
    VOICE: 'GUILD_VOICE',
    TEXT: 'GUILD_TEXT'
}

module.exports = {
    playSamples,
    getUserIdFromMention,
    shuffleArray,
    getChannel,
    getChannels,
    isRestrictedChannel,
    ChannelType
};