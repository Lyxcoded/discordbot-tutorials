const Discord = require('discord.js'); // Defining Discord.
const client = new Discord.Client(); // Defining The Client.
const config = require('./config.json'); // Defining The Config File.

client.once('ready', () => {
    client.user.setActivity('Lyxcode', {type: 'WATCHING'}).catch(console.error); // Setting The Bot's Activity & Activity Type.
    console.log('The bot is now online!'); // Console Logging That The Bot Is Now Online.
});

client.login(config.token);