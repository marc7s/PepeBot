const { config } = require('../../.env.js');
const { MessageAttachment } = require('discord.js');
const { getRandomImage } = require('../_helpers/files');

function handle(bot){
    Object.values(config.guilds).forEach((guildConfig) => {
        if(guildConfig.birthdayChannel){
            console.log('[' + new Date() + '] ' + 'Checking birthdays for ' + guildConfig.config.name + '...');
            bot.guilds.fetch(guildConfig.config.id).then(guild => {
                guild.members.fetch().then(members => {
                    members.each(member => {
                        if(member){
                            let date = new Date(member.user.createdAt);
                            let today = new Date();
                
                            if(date.getMonth() == today.getMonth() && date.getDate() == today.getDate()){
                                if(guildConfig.config.id == member.guild.id && guildConfig.birthdayChannel){
                                    let channelId = guildConfig.birthdayChannel;
                                    let channel = guild.channels.cache.get(channelId);
                            
                                    let randPepe = getRandomImage(config.bot.URIs.pepeURI);
                    
                                    const pepe = new MessageAttachment(randPepe);
                    
                                    let years = today.getFullYear() - date.getFullYear();

                                    const msg = '*Happy Birthday ' + member.toString() + '* :heart: \n*You are now ' + years + ' years old*';
                                    
                                    channel.send(msg, pepe);
                                    console.log('Congratulated ' + member.user.username + ' on becoming ' + years + ' years old');
                    
                                }
                            }
                        }            
                    });
                });
            });
        }
    });
}





module.exports = {
    handle
};