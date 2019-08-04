const { Attachment, Client } = require('discord.js')
/**
 * @param {Client} bot
 */
module.exports.run = (bot, message, args) => {
    if (message.author !== bot.owner) return message.channel.send("Invalid permissions!");
    bot.guilds.forEach((g,i) => {
        const { name, id } = g

        pastebin.createPaste(`Guild Name: ${name}; Guild ID: ${id}\n`, "Modboi Canary Guild Report")
        .then(data => bot.owner.send(data))
    })
}

module.exports.help = {
    name: "getguildids",
    usage: "m!getguildids",
    info: "Gets a list of guild names and IDs"
}