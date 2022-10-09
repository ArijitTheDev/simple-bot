const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const { inspect } = require("util")
const { Util } = Discord
module.exports = {
  aliases: ["ev"],
  ownerOnly: true,
  callback: async ({ client, message, args }) => {
    const code = args.join(" ")
    if(!code) return message.reply({
      content: "I need some code to evaluate master!"
    })
    if (message.author.id !== "842620032960823327") return;
    try {
      const result = await eval(code);
      let output = result;
      if (typeof result !== "string") {
        output = Util.splitMessage(inspect(result, { depth: 0 }))[0]
      }
      message.reply({
        embeds: [
        new MessageEmbed()
        .setTitle("Evaluation successful!")
        .addField("__**Input**__", `**${code}**`)
        .addField("__**Output**__", `\`\`\`js\n${output}\`\`\` `)
        .setColor("GREEN")
        .setTimestamp()
      ]
      });
      console.log(output)
    } catch (error)
    {
      message.reply({
        embeds: [
        new MessageEmbed()
        .setTitle("Evaluation failed!")
        .addField("__**Input**__", `**${code}**`)
        .addField("**__Error__**", `\`\`\`js\n${error}\`\`\``)
        .setColor("RED")
        .setTimestamp()
      ]
      });
      console.log(error)
    }
  }
}
