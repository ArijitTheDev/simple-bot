const { Collection, Intents, Client } = require("discord.js")
const WOKCommands = require("wokcommands")
const path = require("path")
require("dotenv").config()
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})
client.color = '#2f3136';
client.on("ready", () => {
  const dbOptions = {
    keepAlive: true
  }
  client.user.setActivity("Normies", {type: "WATCHING"})
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    botOwners: ["842620032960823327"],
    mongoUri: process.env.DB,
    disabledDefaultCommands: [
            'help',
            // 'command',
             'language',
             //'prefix',
            // 'requiredrole',
            // 'channelonly'
        ],

  })
  .setDefaultPrefix(`.`)
})


client.login(process.env.TOKEN)
