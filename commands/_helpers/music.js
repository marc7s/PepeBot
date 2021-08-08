var path = require('path');
var fs = require('fs');
const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
} = require('@discordjs/voice');


async function playSong(channel, _songURI){
        let songURI = path.win32.normalize(_songURI);
        if(fs.existsSync(songURI)){
            const player = createAudioPlayer();
            const resource = createAudioResource(songURI, {
                inputType: StreamType.Arbitrary
            });
            
            player.play(resource);

            await entersState(player, AudioPlayerStatus.Playing, 5e3);
            
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator
            });

            await entersState(connection, VoiceConnectionStatus.Ready, 30e3);

            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => {
                connection.disconnect();
            });
        
        }else{
            console.error('Error: Song path does not exist');
        }
}

module.exports = {
    playSong
};