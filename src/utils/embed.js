const { EmbedBuilder } = require("discord.js");

const getEmbed = (data, serverMeme) => {
  // imagen y texto condition

  switch (serverMeme) {
    case "Reddit":
      if (
        data.image !== null &&
        data.image !== Array.isArray(data.image) &&
        data.NSFW !== true
      ) {
        const message = new EmbedBuilder()
          .setColor("#6A4219")
          .setURL(data.postLink)
          .setTitle(data.title)
          .setAuthor({ name: `${serverMeme}/${data.subreddit}` })
          .setImage(data.image)
          .setTimestamp()
          .setFooter({
            text: "ToyChiquito®",
            iconURL:
              "https://64.media.tumblr.com/3193254363a59faca67dff7e4201cf1c/f04117d939002c9d-e2/s128x128u_c1/e1025fe9ca31f90e60c5c506f66301b2b2b1c31d.jpg",
          });
        return message;
      } else {
        const message = new EmbedBuilder()
          .setColor("#6A4219")
          .setURL(data.postLink)
          .setTitle(data.title)
          .setAuthor({ name: `${serverMeme}/${data.subreddit}` })
          .setImage(data.image)
          .setFields({ name: "NSFW" })
          .setTimestamp()
          .setFooter({
            text: "ToyChiquito®",
            iconURL:
              "https://64.media.tumblr.com/3193254363a59faca67dff7e4201cf1c/f04117d939002c9d-e2/s128x128u_c1/e1025fe9ca31f90e60c5c506f66301b2b2b1c31d.jpg",
          });
        return message;
      }
      break;

    case "Jaidefinichon":
      if (data.image !== null && data.image !== Array.isArray(data.image)) {
        const message = new EmbedBuilder()
          .setColor("#6A4219")
          .setURL(data.postLink)
          .setTitle("Post del meme")
          .setAuthor({ name: data.author })
          .setImage(data.image)
          .setTimestamp()
          .setFooter({
            text: "ToyChiquito®",
            iconURL:
              "https://64.media.tumblr.com/3193254363a59faca67dff7e4201cf1c/f04117d939002c9d-e2/s128x128u_c1/e1025fe9ca31f90e60c5c506f66301b2b2b1c31d.jpg",
          });
        return message;
      }
      break;
  }
};

module.exports = {
  getEmbed,
};
