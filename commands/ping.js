module.exports.run = (bot, message, args) => {
    const ping = Math.floor(bot.ping)

    const em = new embed()
    .addField("Ping", `PONG! My ping is ***${ping}ms***.`)
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({embed: em})
}

module.exports.help = {
    name: "ping",
    usage: "m!ping",
    info: "shows my ping"
}