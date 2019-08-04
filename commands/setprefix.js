module.exports.run = (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Invalid permissions!");

    var p = args.join(" ")
    if (!p) {message.channel.send("I reset the server's prefix to `m!`.");
        p = "m!"} 

    gSettings.findOne({guild_id: message.guild.id}, (err,doc) => {
        if (doc) {
            doc.prefix = p
            doc.save()
            message.channel.send("I changed this guild's prefix to `"+doc.prefix+'`.');
        } else {
            const newG = new gSettings({
                guild_id: message.guild.id,
                premium: false,
                prefix: p,
                locked: false,
                currencyEnabled: false
            })

            newG.save()
            message.channel.send("I changed this guild's prefix to `"+newG.prefix+"`.")
        }
    })
} 

module.exports.help = {name: "setprefix", info: "Sets the current guild's prefix", usage: "m!setprefix prefix"}