const Discord = require("discord.js")
const { ActivityType } = require("discord.js")
const { GatewayIntentBits } = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
const trackingmore = require("trackingmore")
const apiKey = '';
//const tracker = new Tracking(apiKey);
const fs = require("fs");

bot.on("clientReady", async () => {
    console.log("a")
    bot.user.setActivity('Package Locations', { type: ActivityType.Watching });
})

bot.on("messageCreate", async message => {
    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)

    if(cmd === `${prefix}test`){
 const messageData = message.content;
      message.channel.send("hi") // known working 1/3/26
fs.writeFile('logs.txt', messageData, 'utf8', (err) => {
  if (err) {
    console.error('error writing ts: ', err);
    return;
  }
  console.log('file wrote successfully')
})
        }


})




bot.login(config.token)