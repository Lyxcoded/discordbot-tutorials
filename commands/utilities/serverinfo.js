const { MessageEmbed } = require("discord.js")
const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    aliases: ['sinfo', 'serverinf'],
    description: 'Replys with server info',
    permissions: 'ADMINISTRATOR',
    guildOnly: true,
    cooldowns: 5,
    execute(message) {

        const guild = message.guild;

        let ServerInfoEmbed = new MessageEmbed()
        .setTitle(guild.name)
        .setDescription('Information about this guild.')
        .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
        .addField('Server Information', [
            `**🏰 Guild Name**: \`${guild.name}\``,
            `**🆔 Guild ID**: \`${guild.id}\``,
            `**👑 Owner Tag**: \`${guild.owner.user.tag}\``,
            `**🌟 Boost Tier**: \`${guild.premiumTier ? `${guild.premiumTier}` : 'None'}\``,
            `**📅 Created At**: \`${moment(guild.createdAt).format('MMM DD YYYY')}\``,
        ])
        .addField('Server Statistics', [
            `**🎙 Voice Channels**: \`${guild.channels.cache.filter(c => c.type === 'voice').size}\``,
            `**🗨 Text Channels**: \`${guild.channels.cache.filter(c => c.type === 'text').size}\``,
            `**📊 Total Members**: \`${guild.memberCount}\``,
            `**🕴 Members**: \`${guild.members.cache.filter(member => !member.user.bot).size}\``,
            `**🤖 Bots**: \`${guild.members.cache.filter(member => member.user.bot).size}\``,
            `**🎭 Emojis**: \`${guild.emojis.cache.size}\``,
            `**🎖 Roles**: \`${guild.roles.cache.size}\``,
        ])
        .addField('Presence Status', [
            `**🟢 Online**: \`${guild.members.cache.filter(member => member.presence.status === 'online').size}\``,
            `**🟡 Idle**: \`${guild.members.cache.filter(member => member.presence.status === 'idle').size}\``,
            `**🔴 Do Not Disturb**: \`${guild.members.cache.filter(member => member.presence.status === 'dnd').size}\``,
            `**⚫ Offline**: \`${guild.members.cache.filter(member => member.presence.status === 'offline').size}\``,
        ])
        .setColor('BLUE')
        .setTimestamp()

        message.reply(ServerInfoEmbed)
    }
}