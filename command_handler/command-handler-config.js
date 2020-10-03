class CommandHandlerConfig{
 constructor(ignoreCmdChar, isWildcardCommand, channels, commands, handler){
    this.ignoreCmdChar = ignoreCmdChar;
    this.isWildcardCommand = isWildcardCommand;
    this.channels = channels;
    this.commands = commands;
    this.handler = handler;
 }
}

module.exports = {
    CommandHandlerConfig
};