const guild = require('../util/Models/guild')
const bools = ["enable", "disable"]

module.exports.run = (bot, message, args) => {
    var bool = args.join(" ")

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Invalid permissions!");

    if (bool && !bools.includes(bool)) return message.channel.send(`m!lockdown takes either 'enable' or 'disable'.`);

    guild.findOne({guild_id: message.guild.id}, (err,doc) => {
        if (doc !== null) {
            if (bool == "enable") {
                doc.locked = true
            } else if (bool == "disable") {
                doc.locked = false
            }

            doc.save();
            message.channel.send(`I ${bool}d the server lock.`)
        } else {
            const newGuild = new guild({
                guild_id: message.guild.id,
                premium: false,
                prefix: "m!",
                locked: false,
                currencyEnabled: true
            })
            if (bool == "enable") {
                newGuild.locked = true
            } else if (bool == "disable") {
                newGuild.locked = false
            }
            newGuild.save()
            message.channel.send(`I ${bool}d the server lock.`);
        }
    })
}

module.exports.help = {
    name: "lockdown",
    usage: "m!lockdown enable/disable [time]",
    info: "Prevent anyone from joining your server for a specified amount of time."
}