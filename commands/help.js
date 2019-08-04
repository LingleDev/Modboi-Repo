module.exports.run = (bot, message, args) => {
    const em = new embed()
    .setTitle("Help Menu")
    .setDescription("Here's a list of my commands.")
    for (const [key,value] of bot.commands) {
        em.addField(`Command Name: \n***${value.help.name}***`, `Usage: ***${value.help.usage}***\nInfo: ***${value.help.info}***`)
    }
    em
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({embed: em})
}

module.exports.help = {
    name: "help",
    usage: "m!help",
    info: "Shows you a list of my commands."
}