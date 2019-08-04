module.exports.run = (bot, message, args) => {
    const toPurge = args.join(' ')
    if (!toPurge) return message.channel.send("You must provide a number of messages to purge.");
    const num = parseInt(toPurge)
    if (isNaN(num)) return message.channel.send("I need a number, please.");
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Invalid permissions!")
    if (num < 3 || num > 100) return message.channel.send("You can't purge less than 3 and/or more than 100 messages per purge.");
    
    message.channel.bulkDelete(num)
    .then(() => {
        message.channel.send(`Purged ${num} messages.`)
        .then(m => m.delete(2500))
    })
    .catch(err => {
        message.channel.send(`I couldn't purge ${num} messages.`)
        bot.log(bot, err, bot.user.avatarURL)
    })
}

module.exports.help = {
    name: "purge",
    info: "Removes messages from a channel",
    usage: "m!purge number-of-messages"
}