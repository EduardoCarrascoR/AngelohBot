const discord = require("discord.js");
require("dotenv").config();
const express = require("express");
const reddit = require("reddit.images");
const cron = require("cron").CronJob;

const app = express();
const PORT = process.env.PORT || 3000;
const client = new discord.Client({
  intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES],
});
const channelID = "935765440322482196";

client.on("ready", (e) => {
  console.log(`Logged in as ${client.user.tag}!`);
});

new cron(
  "*/1 * * * *",
  function () {
    console.log("You will see this message every minutes");
    reddit.FetchRandomMeme({ searchType: "top" }).then(async (data) => {
      console.log("FetchRandomMeme Example:");
      console.log(data);
      if(data.image !== null, data.image !== Array.isArray(data.image),data.spoiler !== false){
        const message = new discord.MessageEmbed()
          .setColor("#6A4219")
          .setURL(data.postLink)
          .setAuthor({ name: data.author })
          .setDescription(data.text)
          .setThumbnail(data.thumbnail)
          .addFields({ name: "spoiler", inline: true })
          .setImage(data.image)
          .setTimestamp()
          .setFooter({
            text: "ToyChiquito®",
            iconURL:
              "https://64.media.tumblr.com/3193254363a59faca67dff7e4201cf1c/f04117d939002c9d-e2/s128x128u_c1/e1025fe9ca31f90e60c5c506f66301b2b2b1c31d.jpg",
          });
        await client.channels.cache
          .get(channelID)
          .send({ embeds: [message] });
      } else {
        const message = new discord.MessageEmbed()
          .setColor("#6A4219")
          .setTitle(data.title)
          .setURL(data.postLink)
          .setAuthor({ name: data.author })
          .setDescription(data.text)
          .setThumbnail(data.thumbnail)
          .setImage(data.image)
          .setTimestamp()
          .setFooter({
            text: "ToyChiquito®",
            iconURL:
              "https://64.media.tumblr.com/3193254363a59faca67dff7e4201cf1c/f04117d939002c9d-e2/s128x128u_c1/e1025fe9ca31f90e60c5c506f66301b2b2b1c31d.jpg",
          });
        await client.channels.cache
          .get(channelID)
          .send({ content: data.thumbnail, embeds: [message] });
      }
    });
  },
  null,
  true,
  "Chile/Continental"
);

// meme random

client.login(process.env.DISCORD_TOKEN);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
