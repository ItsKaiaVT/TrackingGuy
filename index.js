const Discord = require("discord.js")
const { ActivityType } = require("discord.js")
const { GatewayIntentBits } = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
const trackingmore = require("trackingmore")
const apiKey = '';
//const tracker = new Tracking(apiKey);

bot.on("ready", async () => {
    console.log("a")
    bot.user.setActivity('Package Locations', { type: ActivityType.Watching });
})

bot.on("messageCreate", async message => {
    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)

    if(cmd === `${prefix}test`){
      // message.reply("hi")
        if(message.content.includes === args) {
            message.reply("you don't have args bitch")
        }
    }


})




bot.login(config.token)