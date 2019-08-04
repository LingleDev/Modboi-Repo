// Clear the console, and display the loading message
{
    console.clear();
    console.log("Modboi Canary loading...")
}

// Declare the variables
    const discord = require('discord.js')
    const bot = new discord.Client()
    global.embed = discord.RichEmbed
    bot.config = require('./config.js')
    bot.prefix = bot.config.prefix
    bot.whitelist = bot.config.whitelist 
    bot.commands = new Map()
    bot.owner;
    bot.invite;
    bot.log = require('./util/logger')
    global.gSettings = require('./util/Models/guild')
    global.uSettings = require('./util/Models/user')
    global.gFuncs = require('./util/guildFunctions')
    global.pastebin = new (require('pastebin-js'))({
        'api_dev_key': bot.config.pastebin_key,
        'api_dev_username': bot.config.pastebin_user,
        'api_dev_password': bot.config.pastebin_pass
    })

// Connect to MongoDB
{
    console.log("Connecting to MongoDB...")
    require('mongoose').connect(`mongodb://localhost:27017/Modboi_DB`, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to local mongodb.")
    })
    .catch(err => {
        console.error("Local mongodb failed to connect. Error: "+err)
    })
}

// Gather commands
{
    require('fs').readdir("./commands/", (err, files) => {
        files.filter(f => f.split(".").pop() == "js").forEach((f,i) => {
            const name = require(`./commands/${f}`).help.name
            const file = require(`./commands/${f}`)

            bot.commands.set(name,file)
        })
    })
}

// Events
{
    // Init the bot
    {
        bot.on('ready', () => {
            bot.log(bot, `Modboi Canary started up.`, bot.user.avatarURL)

            bot.fetchApplication("@me").then(app => {
                bot.owner = app.owner
            })

            bot.generateInvite(["ADMINISTRATOR"]).then(i => {
                bot.invite = i
            })

            console.log("%s is ready.", bot.user.username)
            bot.user.setActivity(`Loading ${bot.user.username}...`, { type: "STREAMING", url: "https://twitch.tv/freakinghulk"})
            
            setTimeout(() => {
                bot.user.setActivity("for m!help | "+bot.guilds.size+" servers", {type: "WATCHING"})
            }, 5000)

            require('./util/ready')(bot)
        })
    } 
    // Lockdown init
    {
        bot.on('guildMemberAdd', member => {
            const guild = member.guild

            require('./util/Models/guild').findOne({guild_id: guild.id}, (err,data) => {
                if (data) {
                    if (data.locked) {
                        member.user.send(`Sorry! ${guild.name} is on lockdown right now. Try joining later.`)
                        .then()
                        .catch(() => {return; })
                        member.kick("server is locked")
                        bot.log(bot, `${guild.name} is locked, so ${member.user.username} just got kicked`)
                    }
                } else {
                    const newG = new (require('./util/Models/guild'))({
                        guild_id: guild.id,
                        premium: false,
                        prefix: "m!",
                        locked: false,
                        currencyEnabled: true
                    })
                    newG.save();
                }
            })
        })
    }
    // Command handler
    {
        bot.on('message', message => {
            gSettings.findOne({guild_id: message.guild.id}, (err,doc) => {
                if (doc) {
                    bot.prefix = doc.prefix
                } else {
                    const newG = new gSettings({
                        guild_id: message.guild.id,
                        premium: false,
                        prefix: "m!",
                        locked: false,
                        currencyEnabled: false
                    })

                    newG.save()
                }
            })
            const mArray = message.content.split(" ");
            const args = mArray.slice(1)
            const command = bot.commands.get(mArray[0].slice(bot.prefix.length))
	    if (!message.content.startsWith(bot.prefix)) return;

            if (message.content.startsWith("m!bean")) {
                if (message.member.bannable) {
                    message.author.send("get trolled boi")  
                    message.member.ban("used fake ban command");
                } else {
                    return;
                }   
            }

            uSettings.findOne({user_id: message.author.id}, (err,doc) => {
                if (doc) {
                    if (command && !doc.blacklisted) {
                        command.run(bot, message, args);
                        bot.log(bot, `${message.author.username} used the ${command.help.name} command in ${message.guild.name}'s ${message.channel.name} channel. `, bot.user.avatarURL)
                    }
                } else {
                    const newU = new uSettings({
                        user_id: message.author.id,
                        coins: 0,
                        blacklisted: false
                    })
                    newU.save()
                }
            })
        })
    }

    // Update the bot's status everytime it join/leaves a guild
    {
        bot.on('guildCreate', guild => {
            bot.user.setActivity(`for m!help | ${bot.guilds.size} servers`, { type: "WATCHING" })
        })
        bot.on('guildDelete', guild => {
            bot.user.setActivity(`for m!help | ${bot.guilds.size} servers`, { type: "WATCHING" })
        })
    }
}

// Login to Discord
{
    bot.login(bot.config.token)
}