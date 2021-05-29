module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setActivity('Lyxcode', {type: "WATCHING"}).catch(console.error) // Setting The Bot's Activity and Catching Errors
        console.log('The bot is now online'); // Console Logging That The Bot Is Now Online.
    }
}