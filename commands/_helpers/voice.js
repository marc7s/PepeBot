const { config } = require('../../.env.js');
const path = require('path');
const fs = require('fs');

async function playSamples(channel, samples){
    if(samples.length > 0){
        if(channel.joinable){
            channel.join().then(connection => {
                let sampleURI = path.win32.normalize(samples.shift());
                if(fs.existsSync(sampleURI)){
                    const dispatcher = connection.play(sampleURI).on('finish', async () => {
                        if(samples.length > 0){
                            await playSamples(channel, samples);
                        }else{
                            dispatcher.destroy();
                            connection.disconnect();
                        }
                    }).on('error', console.error);
                }else{
                    console.error('Error: Sample path does not exist');
                }     
            });
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

function getChannel(guild, needle, type){
    return guild.channels.cache.find(channel => {
        return channel.type == type && isChannel(channel.name, needle);
    });
}

function getChannels(guild, type){
    return guild.channels.cache.filter(channel => {
        return channel.type == type;
    });
}

function isRestrictedChannel(channel){
    let isPrivate = false;

    for(let [id, perm] of channel.permissionOverwrites){
        if(perm.deny.has("VIEW_CHANNEL")){
            isPrivate = true;
            break;
        }
    }
    return isPrivate;
}

module.exports = {
    playSamples,
    getUserIdFromMention,
    shuffleArray,
    getChannel,
    getChannels,
    isRestrictedChannel
};