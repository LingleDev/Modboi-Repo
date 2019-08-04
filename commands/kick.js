module.exports.run = (bot, message, args) => {
    const member = message.mentions.members.first(), reason = args.slice(1).join(" ") || "no reason provided"
    if (!member) return message.channel.send("Please mention a member.");
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`Invalid permissions!`) && bot.log(bot, `${message.author.username} just tried to kick ${member.user.username} from ${message.guild.name}.`);
    if (!member.kickable) return message.channel.send(`${member.user.username} cannot be kicked.`);
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I cannot perform that action. Make sure I have the Kick Members permission.");

    member.kick(reason)
    .then(m => {
        message.channel.send(`:boot: ${m.user.username} is outta here!`)
    })
    .catch(err => {
        message.channel.send(":x: Something went wrong. I'll let FHGDev know about this error.")
        bot.log(bot, `Kick command errored in ${message.guild.name}. Message: **${err}**`, message.guild.iconURL)
    })
}

module.exports.help = {
    name: "kick",
    usage: "m!kick @user [reason]",
    info: "Kicks a member from a guild."
}