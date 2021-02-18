const path = require('path');
const fs = require('fs');
const { exit } = require('process');

require('dotenv').config({path: path.resolve(__dirname, './.env')});

var guilds = {};

const guildConfigs = [
    {
        'id': '747185243642921000',
        'name': 'frukost', 
        'path': './configs/.config_frukost.json', 
        'cmdChar': '.'
    },
    {
        'id': '617059857341874187',
        'name': 'house', 
        'path': './configs/.config_house.json', 
        'cmdChar': '.'
    }
];

guildConfigs.forEach(guildConfig => {
    const props = ['id', 'name', 'path', 'cmdChar'];
    let hasProps = props.map(x => guildConfig.hasOwnProperty(x));
    
    if(hasProps.every(e => e)){
        if(fs.existsSync(guildConfig.path)){
            try{
                let data = fs.readFileSync(guildConfig.path);
                let config = JSON.parse(data);
                let guild = config;

                guild.config = guildConfig;
                guilds[guildConfig.name] = guild;

            }catch(e){
                console.error("Error when reading guild config: " + guild.path);
                console.error(e);
                exit();
            }
        }
    }else{
        console.error("Error when reading guildConfig, missing parameters");
        exit(1);
    }
});


const config = {
    "discord": {
        "token": process.env.DISCORD_TOKEN
    },
    "google_cloud": {
        "type": process.env.GOOGLE_CLOUD_TYPE,
        "project_id": process.env.GOOGLE_CLOUD_PROJECT_ID,
        "private_key_id": process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
        "private_key": process.env.GOOGLE_CLOUD_PRIVATE_KEY,
        "client_email": process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        "client_id": process.env.GOOGLE_CLOUD_CLIENT_ID,
        "auth_uri": process.env.GOOGLE_CLOUD_AUTH_URI,
        "token_uri": process.env.GOOGLE_CLOUD_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.GOOGLE_CLOUD_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.GOOGLE_CLOUD_CLIENT_X509_CERT_URL
    },
    "bot": {
        "URIs": {
            "rouletteURI": "resources/music/roulette/",
            "songsURI": "resources/music/songs/",
            "pepeURI": "resources/pepes/",
            "frokenPeterURI": "resources/froken_peter/"
        },
        "links": {
            "schema": "https://cloud.timeedit.net/chalmers_covid/web/public/ri167XQQ545Z50Qv77034gZ6y5Y7201Q5Y85Y1.html",
            "wigwalk": "https://www.youtube.com/watch?v=v4-3a6FUOxg"
        }
    },
    "guilds": guilds
}

module.exports = {
    config
};