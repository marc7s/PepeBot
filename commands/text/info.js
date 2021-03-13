const { CommandHandler } = require('../../command_handler/command-handler');
const { CommandHandlerConfig } = require('../../command_handler/command-handler-config');
const { config } = require('../../.env.js');

const { getDate } = require('../_helpers/events.js');
const { getUserIdFromMention, isRestrictedChannel } = require('../_helpers/voice.js');
const { MessageEmbed } = require('discord.js');


const chConfig = new CommandHandlerConfig(
    false,
    false,
    [
        config.guilds.frukost.text_channels.bot,
        config.guilds.house.text_channels.bot,
        config.guilds.house.text_channels.botUltra
    ],
    [
        'info'
    ],
    async (message, cmd, args) => {
        let target = message.member;
        
        if(args.length == 1){
            target = getUserIdFromMention(args[0]);
        }

        message.guild.members.fetch(target).then(member => {
            if(member){
                let birthday = new Date(member.user.createdAt);
                let lastMsg = member.user.lastMessage;
                let lastMsgString = '*No message found*';
                if(lastMsg){
                    if(!isRestrictedChannel(lastMsg.channel)){
                        lastMsgString = '`' + lastMsg.content + '` in ' + lastMsg.channel.toString();
                    }
                }
                let nickname = (member.nickname) ? member.nickname : '*No nickname*';
                let hexColor = (member.displayHexColor) ? member.displayHexColor : '#99AAB5';

                let data = {
                    birthday: getDate(birthday),
                    lastMessage: lastMsgString,
                    username: member.user.username,
                    nickname: nickname,
                    avatarUrl: member.user.displayAvatarURL(),
                    tag: member.user.tag,
                    id: member.user.id,
                    joinedGuild: getDate(member.joinedAt),
                    displayColor: hexColor
                };

                const embed = new MessageEmbed()
                        .setTitle(data.username)
                        .setColor(data.displayColor)
                        .addFields(
                            { name: 'Username', value: data.username },
                            { name: 'Nickname', value: data.nickname },
                            { name: 'Tag', value: data.tag },
                            { name: 'ID', value: data.id },
                            { name: 'Avatar URL', value: data.avatarUrl },
                            { name: 'Birthday', value: data.birthday },
                            { name: 'Joined ' + message.guild.name, value: data.joinedGuild },
                            { name: 'Last message', value: data.lastMessage }
                        )
                        .setImage(data.avatarUrl);
                console.log('Displayed info for ' + data.username);
                message.channel.send(embed);
            }else{
                message.channel.send('User not found');
            }
        });
    });

const handler = new CommandHandler(chConfig);

module.exports = {
    handler
};