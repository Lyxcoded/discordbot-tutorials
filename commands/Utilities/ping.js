const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    aliases: ['latency', 'lag'],
    description: 'The bot will reply with the bot\'s latency',
    permissions: 'ADMINISTRATOR',
    guildOnly: true,
    cooldown: 5,
    execute(message) {
        message.delete() // Deletes The Command Message.

        let Ping = new MessageEmbed() // The Response Embed
        .setTitle(message.guild.name)
        .setDescription(`My Latency Is ${Date.now() - message.createdTimestamp}ms`)
        .setColor('BLUE')
        message.reply(Ping);
    }
}