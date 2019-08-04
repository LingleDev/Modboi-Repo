module.exports = (bot, msg, icon) => {
    const channel = bot.channels.find(c => c.name == "logger" && c.guild.name == "Bot Testing Server")
    const em = new embed()
    .setTitle(":scroll: Modboi Canary Base Logger :scroll:")
    .setDescription("Command Run")
    .addField("Message",msg, false)
    .setFooter("Base Logger",icon)
    .setTimestamp()
    .setColor("RED")

    if (channel) {
        channel.send({embed: em})
    } else return;
}