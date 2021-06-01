const { MessageEmbed, User } = require("discord.js")
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    aliases: ['uinfo', 'memberinfo'],
    description: 'Sends an embed messagee containing the mentioned or the message author information.',
    permissions: 'ADMINISTRATOR',
    guildOnly: true,
    cooldowns: 5,
    execute(message, args) {
        
        var target = message.mentions.members.first()
        var cmduser = message.author;

        if (!target) {

            let UserInformation = new MessageEmbed()
            .setTitle(`${message.guild.name} | Utilities`)
            .setDescription(`Information about ${message.author}.`)
            .setThumbnail(cmduser.displayAvatarURL({dynamic: true, size: 512}))
            .addFields(
                {name: 'User Tag', value: `${cmduser}`, inline: true},
                {name: 'Discriminator', value: `${cmduser.discriminator}`, inline: true},
                {name: 'Bot', value: `${cmduser.bot}`, inline: true},
                {name: 'Presence', value: `${cmduser.presence.status}`, inline: true},
                {name: 'Joined Server At', value: `${moment(cmduser.joinedAt).format('MMM DD YYYY')}`, inline: true},
                {name: 'Joined Discord At', value: `${moment(cmduser.createdAt).format('MMM DD YYYY')}`, inline: true},
            )
            .setFooter(`${cmduser.username}#${cmduser.discriminator}`, cmduser.displayAvatarURL({dynamic: true, size: 512}))
            .setColor('BLUE')
            .setTimestamp()
            message.channel.send(UserInformation)

        } else if (target) {

            let TargetInformation = new MessageEmbed()
            .setTitle(`${message.guild.name} | Utilities`)
            .setDescription(`Information about ${target}.`)
            .setThumbnail(target.user.displayAvatarURL({dynamic: true, size: 512}))
            .addFields(
                {name: 'User Tag', value: `${target}`, inline: true},
                {name: 'Discriminator', value: `${target.user.discriminator}`, inline: true},
                {name: 'Bot', value: `${target.user.bot}`, inline: true},
                {name: 'Presence', value: `${target.presence.status}`, inline: true},
                {name: 'Joined Server At', value: `${moment(target.joinedAt).format('MMM DD YYYY')}`, inline: true},
                {name: 'Joined Discord At', value: `${moment(target.createdAt).format('MMM DD YYYY')}`, inline: true},
            )
            .setFooter(`${target.user.username}#${target.user.discriminator}`, target.user.displayAvatarURL({dynamic: true, size: 512}))
            .setColor('BLUE')
            .setTimestamp()
            message.channel.send(TargetInformation)
        }
    }
}