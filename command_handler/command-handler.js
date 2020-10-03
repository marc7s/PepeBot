const { config } = require('../.env.js');

class CommandHandler{
 constructor(commandHandlerConfig){
     this.config = commandHandlerConfig;
 }
 async handle(firstChar, cmd, args, message){
    if(firstChar == config.bot.command_character || this.config.ignoreCmdChar){
        if(this.config.channels.includes(message.channel.id) && (this.config.commands.includes(cmd) || this.config.isWildcardCommand)){
            return await this.config.handler(message, cmd, args);
        }
    }  
 }
}

module.exports = {
    CommandHandler
};