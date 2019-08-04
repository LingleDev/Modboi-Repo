module.exports.run = (bot, message, args) => {
    const bool = args.join(" ")
    if (!bool) return message.channel.send("You must say 'enable' or 'disable'");

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Invalid permissions!");

    gSettings.findOne({guild_id: message.guild.id}, (err,doc) => {
        if (doc) {
            if (bool == "enable") {
                if (doc.currencyEnabled == true) return message.channel.send("Currency is already enabled in this server.");
                doc.currencyEnabled = true
                doc.save()
                message.channel.send("I enabled this server's currency.")
            } else if (bool == "disable") {
                if (doc.currencyEnabled == false) return message.channel.send("Currency is already disabled in this server.")
                doc.currencyEnabled = false
                doc.save()
                message.channel.send("I disabled this server's currency.")
            }
        } else {
            const newG = new gSettings({
                guild_id: message.guild.id,
                premium: false,
                prefix: "m!",
                locked: false,
                currencyEnabled: false
            })

            if (bool == "enable") {
                newG.currencyEnabled = true
                message.channel.send("I enabled this server's currency.")
                newG.save()
            } else if (bool == "disable") {
                newG.currencyEnabled = false
                newG.save()
                message.channel.send("I disabled this server's currency.")
            }
        }
    })
}

module.exports.help = {name: "currency", info: "Manages your guild's currency settings.", usage: "m!currency enable/disable"}