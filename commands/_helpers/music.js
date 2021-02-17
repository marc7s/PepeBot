var path = require('path');
var fs = require('fs');

async function playSong(channel, _songURI){
    channel.join().then(connection => {
        let songURI = path.win32.normalize(_songURI);
        if(fs.existsSync(songURI)){
            const dispatcher = connection.play(songURI);
            dispatcher.on('finish', () => {
                dispatcher.destroy();
                connection.disconnect();
            });
            dispatcher.on('error', console.error);
        }else{
            console.error('Error: Song path does not exist');
        }
        
    });
}

module.exports = {
    playSong
};