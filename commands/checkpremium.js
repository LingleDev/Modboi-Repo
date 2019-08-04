module.exports.run = (bot, message, args) => {
    gSettings.findOne({guild_id: message.guild.id}, (err,data) => {
        if (data) {
            const em = new embed()
            .setTitle(" :moneybag: Premium Checker :moneybag: ")
            .setTimestamp()

            if (data.premium) {
                em.setDescription(":money_mouth: Your premium status is **active**!\nThanks for donating! :money_mouth:")
                em.setColor("GREEN")

                message.channel.send({embed: em})
            } else {
                em
                .setDescription(":x: Your premium status is **inactive**.\nDonate [here](https://donatebot.io/checkout/442067917979385859).")
                .setColor("RED")
                
                message.channel.send({embed: em})
            }
        } else {
            const newG = new gSettings({
                guild_id: message.guild.id,
                premium: false,
                prefix: "m!",
                locked: false
            })
            .save()

            const em = new embed()
            .setTitle(" :moneybag: Premium Checker :moneybag: ")
            .setDescription(":x: Your premium status is **inactive**.\nDonate [here](https://donatebot.io/checkout/442067917979385859).")
            .setTimestamp()
            .setColor("RED")
            message.channel.send({embed: em})
        }
    })
}

module.exports.help = {
    name: "checkpremium",
    usage: "m!checkpremium",
    info: "Check your guild's premium status"
}