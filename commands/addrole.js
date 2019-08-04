module.exports.run = (bot, message, args) => {
    const member = message.mentions.members.first()
    const role = message.mentions.roles.first()
    const reason = args.slice(2).join(" ")

    if (!member) return message.channel.send("Please mention a member.");
    if (!role) return message.channel.send("Please mention a role.");
    if (!member.manageable) return message.channel.send("That member is not manageable.");
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Invalid permissions!");

    member.addRole(role, reason)
    .then(m => {
        message.channel.send(`Role ${role.name} has been given to ${m.user.username}`)
    })
    .catch(err => {
        message.channel.send(`Something went wrong... I'll let FHGDev know about this error.`)
        bot.log(bot, `Role add failed in ${message.guild.name}... Message: ${err}`, message.guild.avatarURL)
    })
        
}

module.exports.help = {
    name: "addrole",
    usage: "m!addrole @user rolename",
    info: "Gives a certain role to a certain user."
}