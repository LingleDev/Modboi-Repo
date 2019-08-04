module.exports.run = (bot, message, args) => {
    if (message.author == bot.owner) {
        let content = args.join(' ');
        const result = new Promise((resolve, reject) => resolve(eval(content)));

        return result.then(output => {
        if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
        if (output.includes(bot.token)) output = output.replace(bot.token, 'Nice try fucker');
        const em = new embed()
        .setTitle("Modboi Canary Eval")
        .setDescription("Eval returned:\n```js\n"+output+"```")
        .setTimestamp()
        .setColor("RANDOM")
        message.channel.send({embed: em}).then(m => m.delete(5000))
        }).catch(err => {
        console.error(err);
        err = err.toString();

        if (err.includes(bot.token)) err = err.replace(bot.token, 'Nice try fucker');

        const em = new embed()
        .setTitle("Modboi Canary Eval")
        .setDescription("Error:\n```js\n"+err+"```")
        .setTimestamp()
        .setColor("RANDOM")
        return message.channel.send({embed: em}).then(m => m.delete(5000))
        });  
    } else {
      message.channel.send("Invalid permissions!")
    }
}

module.exports.help = {
    name: "eval",
    usage: `m!eval code`,
    info: "Execute some Node.js code inside of Discord."
}