const { PaginatedMessage } = require("@sapphire/discord.js-utilities")
const { MessageEmbed } = require("discord.js")
module.exports = {
  callback: async({ message, client }) => {
    const display = new PaginatedMessage()
    display.addPageEmbed((embed) => {
      embed
      .setDescription("Page 1")
      .setColor(client.color)
      return embed
    })
    display.addPageEmbed((embed) => {
      embed
      .setDescription("Page 2")
      .setColor(client.color)
      return embed
    })
    
    return display.run(message)
  }
}
