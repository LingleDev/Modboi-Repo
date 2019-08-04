module.exports.run = (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Invalid permissions!");
    const topic = args.join(" ")
    if (!topic) return message.channel.send("I will reset this channel's topic.");

    message.channel.setTopic(topic)
    .then(c => {
        message.channel.send(`I set the topic to \`${topic}\`.`)
    })
    .catch(err => {
        message.channel.send(`I couldn't set the topic...`)
    })

}

module.exports.help = {
    name: "settopic",
    info: "Sets the topic in the current channel",
    usage: "m!settopic topic"
}