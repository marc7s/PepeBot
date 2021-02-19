const { config } = require('../../.env.js');
const path = require('path');
const fs = require('fs');

function getChannelFromText(text){
    let channel = null;
    switch (text.toLowerCase()){
        case 'plugg1':
            channel = config.guilds.frukost.voice_channels.plugg1;
            break;
        case 'plugg2':
            channel = config.guilds.frukost.voice_channels.plugg2;
            break;
        case 'oklart':
            channel = config.guilds.frukost.voice_channels.oklart;
            break;
        case 'basen':
            channel = config.guilds.frukost.voice_channels.basen;
            break;
        case 'lag1':
        case 'team1':
                channel = config.guilds.frukost.voice_channels.team1;
                break;
        case 'lag2':
        case 'team2':
                channel = config.guilds.frukost.voice_channels.team2;
                break;
        case 'among-us':
        case 'amongus':
            channel = config.guilds.frukost.voice_channels.amongUs;
            break;
        case 'chill':
            channel = config.guilds.house.voice_channels.chill;
            break;
        case 'general':
            channel = config.guilds.house.voice_channels.general;
            break;
        case 'ballerojal':
        case 'balle':
            channel = config.guilds.house.voice_channels.balleRojal;
            break;
        case 'rocketleague':
        case 'rl':
        case 'rocket':
            channel = config.guilds.house.voice_channels.rocketLeague;
            break;
        case 'schack':
            channel = config.guilds.house.voice_channels.varldensBastaSchackspelare;
            break;
    }
    return channel;
}

async function playSamples(channel, samples){
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
}

function getUserIdFromMention(mention) {
	if (!mention) return;

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

module.exports = {
    getChannelFromText,
    playSamples,
    getUserIdFromMention,
    shuffleArray
};