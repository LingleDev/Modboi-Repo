module.exports.run = (bot, message, args) => {
    const toEarn = Math.ceil(Math.random() * 400)
    const bool = Math.round(Math.random())

    const b = gFuncs.getGuildCurrencyEnabled(message.guild.id)

    uSettings.findOne({user_id: message.author.id}, (err,doc) => {
        if (doc) {
            if (b) {
                
            } else {

            }
        }
    })
}

module.exports.help = {
    name: "crime",
    info: "Commit a crime to earn money! It's risky though.",
    usage: "m!crime"
}