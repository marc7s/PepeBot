const { config } = require('../../.env.js');
const path = require('path');
const fs = require('fs');

function getChannelFromText(text){
    let channel = config.bot.voice_channels.oklart;
    switch (text.toLowerCase()){
        case 'plugg1':
            channel = config.bot.voice_channels.plugg1;
            break;
        case 'plugg2':
            channel = config.bot.voice_channels.plugg2;
            break;
        case 'oklart':
            channel = config.bot.voice_channels.oklart;
            break;
        case 'basen':
            channel = config.bot.voice_channels.basen;
            break;
        case 'lag1':
        case 'team1':
                channel = config.bot.voice_channels.team1;
                break;
        case 'lag2':
        case 'team2':
                channel = config.bot.voice_channels.team2;
                break;
        case 'among-us':
        case 'amongus':
            channel = config.bot.voice_channels.amongUs;
            break;
        case 'chill':
            channel = config.bot.house_voice_channels.chill;
            break;
        case 'general':
            channel = config.bot.house_voice_channels.general;
            break;
        case 'ballerojal':
        case 'balle':
            channel = config.bot.house_voice_channels.balleRojal;
            break;
        case 'rocketleague':
        case 'rl':
        case 'rocket':
            channel = config.bot.house_voice_channels.rocketLeague;
            break;
        case 'schack':
            channel = config.bot.house_voice_channels.varldensBastaSchackspelare;
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

module.exports = {
    getChannelFromText,
    playSamples
};