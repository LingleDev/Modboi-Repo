module.exports.run = (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Invalid permissions!");

    const name = args.join(" ")
    if (!name) return message.channel.send("You must provide a name.");
    message.guild.setName(name).then(g => {
        message.channel.send(`I successfully renamed ${g.name}.`)
    })
    .catch(err => {
        message.channel.send(`I failed to rename ${message.guild.name}.`)
    })
}

module.exports.help = {
    name: "setgname",
    info: "Sets the name of the current guild.",
    usage: "m!setgname name"
}