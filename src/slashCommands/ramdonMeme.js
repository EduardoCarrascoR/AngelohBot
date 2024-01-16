const { SlashCommandBuilder } = require("discord.js");
const service = require("../services/service")
const embed = require("../utils/embed")
const randomServer = require("../utils/randomiseServer")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ramdon_meme")
    .setDescription("Genera un meme Ramdon desde Reddit."),
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async execute(client, interaction) {
    // TODO: implementar codigo server random
    /* randomServer.randomServer(); */
    service.memeRedditEng().then(async(data) => {
      if(data !== undefined){
        const message = await embed.getEmbed(data);
        await interaction.reply({embeds: [message]});
      }
    })
  },
};