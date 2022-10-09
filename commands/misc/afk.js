const Schema = require("../../models/afk")
const access = require("../../models/access")
module.exports = {
  category: "misc",
  description: "Not a command for a normie!",
     type: "STRING",
  callback: async ({ message, client, args }) => {
    const reason = args.join(" ") || `Not specified`;
    access.findOne({
      User: message.author.id
    })
    .then((data) => {
      if(data){
        Schema.findOne({ Guild: message.guild.id, User: message.author.id }, async (err, data) => {
      if (data) {
        return message.reply({
          content: "Dude You're already AFK!"
        })
      }
      else {
        new Schema({
          Guild: message.guild.id,
          User: message.author.id,
          Message: reason
        }).save();

        if (!message.member.displayName.includes(`[AFK] `)) {
          message.member.setNickname(`[AFK] ` + message.member.displayName).catch(e => {});
        }
        message.reply({
          content: `Your AFK has been set up successfully. **Reason:** ${reason}`,
          allowedMentions: {
            users: []
          }
        })
      }
    })
      }else{
        return message.reply({
      content: "I Don't Listen to Normies dude!"
    })
      }
    })
  }
}
