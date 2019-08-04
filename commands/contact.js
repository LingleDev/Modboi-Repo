const id = "579329478258327582"

module.exports.run = (bot, message, args) => {
    const channel = bot.channels.get(id)

    const msg = args.join(" ")

    const em = new embed()
    .addField(" Contact ", msg)
    .setFooter(`Message submitted by ${message.author.username}`, bot.user.avatarURL)
    .setTimestamp()
    .setColor("GREEN")
    channel.send({ embed: em })
    message.channel.send("I sent your message to FHGDev")
}

module.exports.help = {
    name: "contact",
    usage: "m!contact msg",
    info: "Contacts FHGDev"   
}