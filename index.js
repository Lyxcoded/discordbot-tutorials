const fs = require('fs'); // Defining Fs.
const Discord = require('discord.js'); // Defining Discord.
const client = new Discord.Client(); // Defining The Client.
const config = require('./config.json'); // Defining The Config File.

client.commands = new Discord.Collection(); // Defining The Collection Of The Command Handler.
client.cooldowns = new Discord.Collection(); // Defining The Collection Of The Cooldowns.

/// Event Handler ///
const eventFolders = fs.readdirSync('./events');
for (const folder of eventFolders) {
    const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./events/${folder}/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

/// Command Handler ///
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

/// Message Event Listner ///
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot ) return;
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return
    if (command.permissions) {
        if (message.channel.type === 'dm') {
            return;
        }
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return;
        }
    }

    if (command.args && !args.length) {
        let reply = `You didnt provide any arguments, ${message.author}`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``
        }
        return message.channel.send(reply);
    }

    const { cooldowns } = client;
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now()
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds to use this command again`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
        console.log(`${message.author} used ${commandName} in ${message.channel}`)
    } catch (error) {
        console.log(error);
        message.reply('There was an error trying to execute the command!')
    }
});

client.login(config.token);