var usableBools = ["add", "remove"]
var Client = require('discord.js').Client
var Message = require('discord.js').Message

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */
module.exports.run = (bot, message, args) => {
    const [bool, id] = args

    if (message.author !== bot.owner) return message.channel.send("Invalid permissions!");    

    if (!usableBools.includes(bool)) {
        return message.channel.send("You must tell me whether I should add them or remove them from the blacklist...");
    }

    bot.fetchUser(id)
    .then(user => {
        uSettings.findOne({user_id: user.id}, (err,data) => {
            if (data) {
                if (bool == "add") {
                    data.blacklisted = true
                    data.save()
                    .then(() => {
                        message.channel.send(`I added ${user.username} to my user blacklist.`)
                    })
                    .catch(err => {
                        message.channel.send("Something went wrong... Check the logger for details...")
                        bot.log(bot, `MongoDB failed to save. Message: ${err}`, bot.user.avatarURL)
                    })
                } else if (bool == "remove") {
                    data.blacklisted = false
                    data.save()
                    .then(() => {
                        message.channel.send(`I removed ${user.username} from my user blacklist.`)
                    })
                    .catch(err => {
                        message.channel.send("Something went wrong... Check the logger for details...")
                        bot.log(bot, `MongoDB failed to save. Message: ${err}`, bot.user.avatarURL)
                    })
                }
            } else {
                const newData = new uSettings({
                    user_id: user.id,
                    coins: 0,
                    blacklisted: false
                })

                if (bool == "add") {
                    newData.blacklisted = true
                    newData.save()
                    .then(() => {
                        message.channel.send(`I added ${user.username} to my user blacklist.`)
                    })
                    .catch(err => {
                        message.channel.send("Something went wrong... Check the logger for details...")
                        bot.log(bot, `MongoDB failed to save. Message: ${err}`, bot.user.avatarURL)
                    })
                } else if (bool == "remove") {
                    newData.blacklisted = false
                    newData.save()
                    .then(() => {
                        message.channel.send(`I removed ${user.username} from my user blacklist.`)
                    })
                    .catch(err => {
                        message.channel.send("Something went wrong... Check the logger for details...")
                        bot.log(bot, `MongoDB failed to save. Message: ${err}`, bot.user.avatarURL)
                    })
                }
            }
        })
    })
    .catch(err => {
        message.channel.send("That user doesn't exist...")
    })
}

module.exports.help = {
    name: "ubl",
    usage: "m!ubl add/remove userID",
    info: "Adds or removes a user from the bot's user blacklist."
}