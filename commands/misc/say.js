const access = require("../../models/access.js")
module.exports = {
  category: "misc",
  description: "Not a command for normies",
  slash: true,
  options: [{
    name: "input",
    description: "Input your shit message",
    required: true,
    type: "STRING"
  }],
  callback: async ({ interaction, client }) => {
    const msg = interaction.options.getString("input")
    access.findOne({
      User: interaction.user.id
    })
    .then((data) => {
      if(data){
        interaction.reply({
          content: "Ah Shit! Here we go again!",
          ephemeral: true
        })
        interaction.channel.send({
          content: `${msg}`
        })
      }else{
        return interaction.reply({
          content: "I don't listen to Normies dude!",
          ephemeral: true
        })
      }
    })
  }
}
