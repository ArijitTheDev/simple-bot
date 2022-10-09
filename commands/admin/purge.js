module.exports = {
  aliases: ["clear", "clean", "delete"],
  permissions: ["ADMINISTRATOR"],
  callback: async({ message, client, args}) => {
    const amount = args.join(" ")
    if(!amount) return message.reply({
      content: "You need to specify some amount to clear!"
    })
    if(isNaN(amount)){
      return message.reply({
        content: "The amount must be a number!"
      })
    }
    message.delete()
    .then(async() => {
      message.channel.bulkDelete(amount)
    })
  }
}
