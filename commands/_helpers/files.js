const { readdirSync } = require('fs');

function getRandomImage(uri){
    let imagesUri = __basedir + uri;
    let images = readdirSync(imagesUri);
    return imagesUri + images[Math.floor(Math.random() * images.length)];
}


module.exports = {
    getRandomImage
};