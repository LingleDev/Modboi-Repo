const { Client } = require('discord.js')

/**
 * Assign premium
 * @param {Client} bot
 */
module.exports = (bot) => {
    const base = bot.guilds.get("579037316811587587")
    bot.guilds.forEach((v,k) => {
        gSettings.findOne({guild_id: k}, (err,doc) => {
            if (doc) {
                v.members.forEach((m,i) => {
                    if (base.members.get(i)) {
                        const member = base.members.get(i)

                        if (member.roles.find(r => r.name == "Premium") || member.user == bot.owner) {
                            if (doc.premium == false) {
                                doc.premium = true;
                                doc.save()
                            }
                        }
                    }
                })
            }
        })
    })
}