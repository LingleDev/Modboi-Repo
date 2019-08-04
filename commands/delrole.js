const Message = require('discord.js').Message
const Client = require('discord.js').Client

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */
module.exports.run = (bot, message, args) => {
    const member = message.mentions.members.first()
    const role = message.mentions.roles.first()
    const reason = args.slice(2).join(" ")
    if (!member) return message.channel.send("Please mention a member.");
    if (!role) return message.channel.send("Please mention a role.");
    if (!member.manageable) return message.channel.send("That member is not manageable.");
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Invalid permissions!");

    member.removeRole(role, reason)
    .then(m => {
        message.channel.send(`Role ${role.name} has been removed from ${m.user.username}`)
    })
    .catch(err => {
        message.channel.send(`Something went wrong... I'll let FHGDev know about this error.`)
        bot.log(bot, `Role remove failed in ${message.guild.name}... Message: ${err}`, message.guild.avatarURL)
    })
}

module.exports.help = {
    name: "delrole",
    info: "Removes a role from a member.",
    usage: "m!delrole @member @role"
}