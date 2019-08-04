module.exports.run = (bot, message, args) => {
    if (message.author !== bot.owner) return message.channel.send("Invalid permissions!");
    require('../util/ready')(bot)
    message.channel.send("Premium has been refreshed.")
}

module.exports.help = {
    name: "refreshpremium",
    usage: "m!refreshpremium",
    info: "Makes the premium checker run again"
}