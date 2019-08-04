module.exports.run = (bot, message, args) => {
    const member = message.mentions.members.first(), reason = args.slice(1).join(" ");
    if (!member) return message.channel.send("Please mention a member.")
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Invalid permissions!");
    if (!member.bannable) return message.channel.send(`${member.user.username} is not bannable.`);
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I cannot perform this action. Make sure I have the Ban Members permission.");

    member.ban(reason)
    .then(member => {
        message.channel.send(`:boot: ${member.user.username} is outta here!`)
    })
    .catch(err => {
        message.channel.send(`:x: Something went wrong. I'll let FHGDev know about this error.`);
        bot.log(bot, `Ban command errored in ${message.guild.name}. Message: ${err}`, message.guild.iconURL)
    })
}

module.exports.help = {
    name: "ban",
    usage: "m!ban @member [reason]",
    info: "Ban a member."
}