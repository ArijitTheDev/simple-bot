module.exports = {
  aliases: ["av"],
  callback: async({ message, client, args }) => {
    const user = message.mentions.members.first()
    if(!user) return message.reply({
      content: `${message.author.displayAvatarURL({ dynamic: true })}`
    })
  else
    return message.reply({
      content: `${user.displayAvatarURL({ dynamic: true })}`
    })
}
}
