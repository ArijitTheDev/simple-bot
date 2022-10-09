const afk = require("../models/afk")
const ignore = require("../models/ignore-afk")
module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        if (!message.guild) return;
        ignore.findOne({
            Guild: message.guild.id,
            Channel: message.channel.id
          })
         .then(async(data) => {
           if(data){
             return
           }else{
             afk.findOne({ Guild: message.guild.id, User: message.author.id },
      async (err, data) => {
        if (data) {
          await afk.deleteOne({
            Guild: message.guild.id,
            User: message.author.id,
          });
          message.channel.send({
              content: `${message.author} dude I have removed your AFK!`
            })
            .then(async (m) => {
              setTimeout(() => {
                m.delete();
              }, 5000);
            });

          if (message.member.displayName.startsWith(`[AFK] `)) {
            let name = message.member.displayName.replace(`[AFK] `, ``);
            message.member.setNickname(name).catch((e) => {});
          }
        }
      }
    );

    message.mentions.users.forEach(async (u) => {
      if (
        !message.content.includes("@here") &&
        !message.content.includes("@everyone")
      ) {
        afk.findOne({ Guild: message.guild.id, User: u.id },
          async (err, data) => {
            if (data) {
              message.channel.send({
                content: `Hey Normie! **${u.tag}** is currently afk! **Reason:** ${data.Message}`,
                allowedMentions: {
                  users: []
                }
              })
            }
          }
        );
      }
    });

           }
         })
    })
}
