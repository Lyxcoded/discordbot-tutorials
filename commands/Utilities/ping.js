const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    aliases: ['latency', 'lag'],
    description: 'Replys with the bots latency',
    permissions: 'ADMINISTRATOR',
    guildOnly: true,
    cooldowns: 5,
    execute(message) {

        message.delete(); // It will deleted the command message.

        let Ping = new MessageEmbed()
        .setTitle(message.guild.name)
        .setDescription(`My Latency Is ${Date.now() - message.createdTimestamp}ms`)
        .setColor('BLUE')
        message.reply(Ping)
    }
}