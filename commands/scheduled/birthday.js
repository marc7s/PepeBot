const { config } = require('../../.env.js');
const { MessageAttachment } = require('discord.js');
const { getRandomImage, readJSON } = require('../_helpers/files');
const { Action } = require('../../command_handler/command-handler');
const fs = require('fs');

async function handle(bot){
    let congratulated = false;
    Object.values(config.guilds).forEach((guildConfig) => {
        if(guildConfig.birthdayChannel){
            console.log('[' + new Date() + '] ' + 'Checking birthdays for ' + guildConfig.config.name + '...');
            bot.guilds.fetch(guildConfig.config.id).then(guild => {
                guild.members.fetch().then(members => {
                    members.each(member => {
                        if(member){
                            let date = new Date(member.user.createdAt);
                            let today = new Date();
                
                            if(date.getMonth() == today.getMonth() && date.getDate() == today.getDate() || member.id == "262937488660758528"){
                                if(guildConfig.config.id == member.guild.id && guildConfig.birthdayChannel){
                                    let optinsPath = config.bot.URIs.optInsURI;
                                    let defaultOptinsPath = config.bot.URIs.defaultOptInsURI;
                                    
                                    let optins = readJSON(optinsPath);

                                    if(optins == false || !Array.isArray(optins)){
                                        let readDefaultOptins = readJSON(defaultOptinsPath);
                                        console.error('Couldn\'t retrieve optins, trying to read default optins...');
                                        if(readDefaultOptins == false){
                                            console.error('Couldn\'t retrieve default optins, exiting...');
                                            return Action.exit;
                                        }
                                        console.log('Default optins read, writing to optins file...');
                                        fs.writeFileSync(optinsPath, JSON.stringify(readDefaultOptins));
                                        optins = readDefaultOptins;
                                    }
                                    
                                    if(optins.includes(member.id)){
                                        let channelId = guildConfig.birthdayChannel;
                                        const channel = guild.channels.cache.find(c => c.id === channelId);
                                
                                        let randPepe = getRandomImage(config.bot.URIs.pepeURI);
                        
                                        const pepe = new MessageAttachment(randPepe);
                        
                                        let years = today.getFullYear() - date.getFullYear();
    
                                        const msg = '*Happy Birthday ' + member.toString() + '* :heart: \n*You are now ' + years + ' years old*';
                                        
                                        congratulated = true;

                                        channel.send({content: msg, files: [pepe]});
                                        console.log(`[${guildConfig.config.name}] Congratulated ${member.user.username} on becoming ${years} years old`);
                                    }else{
                                        console.log(member.user.username + ' is not an optin, therefore birthday announcement is skipped');
                                    }  
                                }
                            }
                        }            
                    });
                });
            });
        }
    });
    return (congratulated) ? Action.messageSent : Action.exit;
}





module.exports = {
    handle
};