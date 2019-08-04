module.exports.run = (bot, message, args) => {
    const earned = Math.ceil(Math.random() * 300)
    gSettings.findOne({guild_id: message.guild.id}, (err,doc) => {
        if (doc) {
            if (doc.currencyEnabled) {
                uSettings.findOne({user_id: message.author.id}, (err,d) => {
                    if (d) {
                        d.coins = d.coins + earned
                        d.save()
                        const em = new embed()
                        .setTitle("Work")
                        .setDescription("You worked at the office today.")
                        .addField(`<:coin:511348296405483520> Earned Coins:`, earned, true)
                        .addField(`:bank: Balance:`, d.coins, true)
                        .setTimestamp()
                        .setColor("GREEN")
                        message.channel.send({embed: em})
                    } else {
                        const newU = new uSettings({
                            user_id: message.author.id,
                            coins: earned,
                            blacklisted: false
                        })
                        newU.save()

                        const em = new embed()
                        .setTitle("Work")
                        .setDescription("You started working at the office today.")
                        .addField("Earned Coins:", earned, true)
                        .addField("Balance:", newU.coins, true)
                        .setTimestamp()
                        .setColor("GREEN")
                        message.channel.send({embed: em})
                    }
                })
            } else {
                message.channel.send("Currency is not enabled in this guild. Talk to a staff member about this.");
            }
        } else {
            const newG = new gSettings({
                guild_id: message.guild.id,
                premium: false,
                prefix: "m!",
                locked: false,
                currencyEnabled: false
            })

            newG.save()

            message.channel.send("Currency is not enabled in this guild. Talk to a staff member about this.")
        }
    })
}

module.exports.help = {name: "work", info: "Earn coins by working at the office.", usage: "m!work"}