function getMessageEmote(message, emoteName){
    let emote = getReactionEmote(message, emoteName);
    if(emote == ''){
        return '';
    }else{
        return '<:' + emote.name + ':' + emote.id + '>';
    }
}

function getReactionEmote(message, emoteName){
    let emote = message.guild.emojis.cache.find(e => e.name === emoteName);
    if(emote)
        return emote;
    else
        return '';
}

module.exports = {
    getMessageEmote,
    getReactionEmote
};