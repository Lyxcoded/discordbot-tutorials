const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    aliases: ['latency', 'lag'],
    description: 'Sends an embed messagee containing the bot\'s latency.',
    permissions: 'ADMINISTRATOR',
    guildOnly: true,
    cooldowns: 5,
    execute(message) {
        
        let Ping = new MessageEmbed()
        .setTitle(`${message.guild.name} | Utilities`)
        .setDescription(`My latency is ${Date.now() - message.createdTimestamp}ms`)
        .setColor('BLUE')
        message.reply(Ping)
    }
}