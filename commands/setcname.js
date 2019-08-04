module.exports.run = (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Invalid permissions!");
    const name = args.join(" ")
    if (!name) return message.channel.send("You must provide a name.");
    

    message.channel.setName(name)
    .then(c => {
        message.channel.send(`I set this channel's name to ${name}.`)
    })
    .catch(() => message.channel.send("I couldn't set this channel's name..."))
}

module.exports.help = {
    name: "setcname",
    usage: "m!setcname name",
    info: "Sets the current channel's name."
}