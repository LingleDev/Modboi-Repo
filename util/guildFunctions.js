/**
 * 
 * @param {String} guildId 
 */
function getGuildCurrencyEnabled(guildId) {
    gSettings.findOne({guild_id: guildId}, (err,doc) => {
        if (doc) {
            return doc.currencyEnabled
        } else {
            const newG = new gSettings({
                guild_id: guildId,
                premium: false,
                prefix: "m!",
                currencyEnabled: false
            })

            newG.save()

            return false
        }
    })
}

module.exports = {
    getGuildCurrencyEnabled: getGuildCurrencyEnabled
}