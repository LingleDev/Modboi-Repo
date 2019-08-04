module.exports.run = async (bot, message, args) => {
    const m = await message.channel.send(`Getting ${message.guild.name}'s information...`)

    gSettings.findOne({guild_id: message.guild.id}, (err,doc) => {
        if (doc) {
            const em = new embed()
            .setTitle("Guild Info")
            .setDescription("Here's what I found.")
            .addField(`Server Name:`, `**${message.guild.name}**`)
            .addField(`Member Count:`, `**${message.guild.memberCount}**`)
            .addField(`Prefix:`, `**${doc.prefix}**`)
            .addField(`Premium:`, `**${doc.premium}**`)
            .addField(`Owner:`, `**${message.guild.owner.user.username}**`)
            .addField(`Locked: `, `**${doc.locked}**`)
            .addField(`Currency Enabled:`, `**${doc.currencyEnabled}**`)
            .setTimestamp()
            .setColor("GREEN")
            m.edit({embed: em})
        } else {
            const newG = new gSettings({
                guild_id: message.guild.id,
                premium: false,
                prefix: "m!",
                locked: false,
                currencyEnabled: false
            })

            newG.save()

            const em = new embed()
            .setTitle("Guild Info")
            .setDescription("Here's what I found.")
            .addField(`Server Name:`, `**${message.guild.name}**`)
            .addField(`Member Count:`, `**${message.guild.memberCount}**`)
            .addField(`Prefix:`, `**${newG.prefix}**`)
            .addField(`Premium:`, `**${newG.premium}**`)
            .addField(`Owner:`, `**${message.guild.owner.user.username}**`)
            .addField(`Locked: `, `**${newG.locked}**`)
            .addField(`Currency Enabled:`, `**${newG.currencyEnabled}**`)
            .setTimestamp()
            .setColor("GREEN")
            m.edit({embed: em})
        }
    })
}

module.exports.help = {
    name: "ginfo",
    info: "Gets the current guild's info",
    usage: "m!ginfo"
}