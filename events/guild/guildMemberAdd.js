const config = require('../../config.json');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        let MemberRole = member.guild.roles.cache.get(config.MemberRoleID)
        member.roles.add(MemberRole)

        let WelcomeEmbed = new MessageEmbed()
        .setTitle(member.guild.name)
        .setDescription(`Welcome <@${member.user.id}> to the **${member.guild.name}**\'s Discord Server!\nMake sure to check the channels down below to get started!\nLatest Member Count: **${member.guild.memberCount}**`)
        .addFields(
            {name: ':book: Information', value: `<#${config.InformationID}>`, inline: true},
            {name: ':gift: Giveaways', value: `<#${config.GiveawaysID}>`, inline: true},
            {name: ':stars: Get Roles', value: `<#${config.GetRolesID}>`, inline: true},
        )
        .setFooter(`${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setColor('RANDOM')
        .setTimestamp()

        member.guild.channels.cache.get(config.WelcomeID).send(`Welcome, <@${member.user.id}>`, WelcomeEmbed)

        /// LOGS ///

        let WelcomeLogEmbed = new MessageEmbed()
        .setTitle(member.guild.name)
        .setDescription(`Information about the member that joined!`)
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
        .setColor('GREEN')
        .setTimestamp()
        member.guild.channels.cache.get(config.MemberLogsID).send(WelcomeLogEmbed)
        
    }
}