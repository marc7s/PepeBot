const { config } = require('../../.env.js');
const { readdirSync, existsSync, readFileSync, writeFileSync } = require('fs');

function getRandomImage(uri){
    let imagesUri = __basedir + uri;
    let images = readdirSync(imagesUri);
    return imagesUri + images[Math.floor(Math.random() * images.length)];
}

function readJSON(uri){
    let fileURI = __basedir + uri;
    if(existsSync(fileURI)){
        let rawdata = readFileSync(fileURI);
        try{
            let data = JSON.parse(rawdata);
            return data;
        }
        catch(e){
            console.log(e);
            return false;
        }
    }
    return false;
}

function updateBirthdayOptIn(memberId, optin){
    if(typeof optin == 'boolean'){
        let optins = readJSON(config.bot.URIs.optInsURI);
        if(optins == false){
            optins = [];
        }

        let change = false;
        if(optin && !optins.includes(memberId)){
            optins.push(memberId);
            change = true;
        }else if(!optin && optins.includes(memberId)){
            optins.splice(optins.indexOf(memberId), 1);
            change = true;
        }
        
        if(change){
            writeFileSync(config.bot.URIs.optInsURI, JSON.stringify(optins));
            console.log(`Updated birthday opt in for ${memberId}`);
        }
        return true;
    }else{
        console.error('Optin parameter must be boolean');
        return false;
    }
}

module.exports = {
    getRandomImage,
    readJSON,
    updateBirthdayOptIn
};