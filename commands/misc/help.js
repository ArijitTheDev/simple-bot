const access = require("../../models/access.js")
const { PaginatedMessage } = require("@sapphire/discord.js-utilities")
const { MessageEmbed } = require("discord.js")
module.exports = {
  callback: async ({ message, client }) => {
    const helpPagination = new PaginatedMessage()
       .setSelectMenuOptions(async (pageIndex) => {
       if(pageIndex === 1){
        return {
          label: "Introduction Page",
          emoji: "<:bballoons:1018888259864100935>",
          description: "Information about the bot"
        }
       }else if(pageIndex === 2){
         return {
           label: "Misc Page",
           emoji: "<:PollBlob:1019828776051429436>",
           description: "Misc Commands of the bot"
         }
       }else if (pageIndex === 3) {
         return {
           label: "Administration Page",
           emoji: "<:versace_terms:1027791775768776714>",
           description: "Administration Commands of the bot"
         }
       }else if (pageIndex === 4) {
         return {
           label: "Moderation Page",
           emoji: "<:BadgeDiscordEmployee:1027791999362924586>",
           description: "Moderation Commands of the bot"
         }
       }else if(pageIndex === 5){
         return {
           label: "Owner Page",
           emoji: "<:roseWumpusMistletoeGOLD:1018889224319144027>",
           description: "Owner Commands of the bot"
         }
       }
      })
    helpPagination.addPageEmbed((embed) => {
        embed
          .setColor(client.color)
          .setTitle(`${client.user.tag} Help Menu`)
          .setDescription(`${client.user.tag} is a Utility Discord Bot Made For Easy Server Management`)
          .setThumbnail(client.user.displayAvatarURL())
          .setImage("https://i.ibb.co/wwWqDcG/Promo-Facebook-Facebook-cover-photo.jpg")
        return embed
      })
    helpPagination.addPageEmbed((embed) => {
        embed
          .setTitle("Misc")
          .setDescription("help, afk, avatar, /say")
          .setColor(client.color)
          .setThumbnail(client.user.displayAvatarURL())
        return embed
      })
    helpPagination.addPageEmbed((embed) => {
      embed
        .setTitle("Administration")
        .setDescription("ignore, requiredrole, channelonly, command")
        .setColor(client.color)
        .setThumbnail(client.user.displayAvatarURL())
      return embed
    })
    helpPagination.addPageEmbed((embed) => {
      embed
        .setTitle("Moderation")
        .setDescription("purge")
        .setColor(client.color)
        .setThumbnail(client.user.displayAvatarURL())
      return embed
    })
    helpPagination.addPageEmbed((embed) => {
      embed
        .setTitle("Owner")
        .setDescription("eval, whitelist")
        .setColor(client.color)
        .setThumbnail(client.user.displayAvatarURL())
      return embed
    })
    access.findOne({
        User: message.author.id
      })
      .then(async (data) => {
        if (!data) return message.reply({
          content: "I only reply to cool dudes! Get back normie!"
        })
        else
          helpPagination.run(message)
      })
  }
}
