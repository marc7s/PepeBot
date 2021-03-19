const { config } = require('../.env.js');

class CommandHandler{
 constructor(commandHandlerConfig){
     this.config = commandHandlerConfig;
 }
 async handle(firstChar, cmd, args, message, guild){
    if(firstChar == guild.config.cmdChar || this.config.ignoreCmdChar){
        if(this.config.channels.includes(message.channel.id) && (this.config.commands.includes(cmd) || this.config.isWildcardCommand)){
            return await this.config.handler(message, cmd, args);
        }
    }  
 }
}

const Action = {
    playSong : "playSong",
    skipSong: "skipSong",
    messageSent: "messageSent",
    messageReact: "messageReact",
    movedMembers: "movedMembers",
    leaveChannel: "leaveChannel",
    exit: "exit"
}

module.exports = {
    CommandHandler,
    Action
};