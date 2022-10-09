const db = require("../../models/ignore-afk")
module.exports = {
  permissions: ["ADMINISTRATOR"],
  callback: async({ client, message }) => {
    const channel = message.mentions.channels.first()
    if(!channel){
      await db.findOne({
          Guild: message.guild.id
        })
        .then(async (data) => {
            if(data){
              await db.deleteOne({
                Guild: message.guild.id
              })
              return message.reply({
                content: "AFK Ignore is off now!"
              })
            }else{
              return message.reply({
                content: "No AFK Ignore Channels found!"
              })
            }
        })
    }else{
      await db.findOne({
        Guild: message.guild.id
      })
      .then(async(data) => {
        if(data){
          await db.findOneAndUpdate({
            Guild: message.guild.id
          }, {
            Channel: channel.id
          }, {
            upsert: true
          })
          return message.reply({
            content: `Cool, AFK will be ignored in ${channel}`
          })
        }else{
          await db.create({
            Guild: message.guild.id,
            Channel: channel.id
          })
          return message.reply({
            content: `Cool, AFK will be ignored in ${channel}`
          })
        }
      })
    }
  }
}
