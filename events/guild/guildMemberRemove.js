const config = require('../../config.json');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        let LeaveLogEmbed = new MessageEmbed()
        .setTitle(member.guild.name)
        .setDescription(`Information about the member that left!`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
        .addFields(
            {name: 'User Tag', value: `${member}`, inline: true},
            {name: 'Discriminator', value: `${member.user.discriminator}`, inline: true},
            {name: 'Bot', value: `${member.user.bot}`, inline: true},
            {name: 'Presence', value: `${member.user.presence.status}`, inline: true},
            {name: 'Joined Server At', value: `${moment(member.joinedAt).format('MM DD YYYY')}`, inline: true},
            {name: 'Joined Discord At', value: `${moment(member.user.createdAt).format('MM DD YYYY')}`, inline: true}
        )
        .setFooter(`${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setColor('RED')
        .setTimestamp()
        member.guild.channels.cache.get(config.MemberLogsID).send(LeaveLogEmbed)
    }
}