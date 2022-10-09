const schema = require("../../models/access.js")
module.exports = {
  aliases: ["w"],
  callback: async({ message, client, args }) => {
    if(message.author.id !== "842620032960823327") return;
    const user = message.mentions.members.first()
    if(!user) return message.reply({
      content: "You have to ping a normie to make him/her a cool dude."
    })
    schema.findOne({
      User: user.id
    }, async(err, data) => {
      if(data){
        await schema.deleteOne({
          User: user.id
        })
        return message.reply({
          content: `${user} is no more a cool dude!`
        })
      }else{
        await schema.create({
          User: user.id
        })
        return message.reply({
          content: `${user} you're a cool dude from now! I'll listen to you!`
        })
      }
    })
  }
}
