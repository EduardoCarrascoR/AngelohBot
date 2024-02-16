/* const discord = require("discord.js");
 */const {Client, GatewayIntentBits, Partials, Collection} = require("discord.js");
const express = require("express");
const cron = require("cron").CronJob;
const randomiseServer = require("./utils/randomiseServer");
const publish = require("./utils/publish");
const fs = require("fs");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Discord.js Config
const client = new Client({
  intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
});

// SlashCommands
client.slashCommands = new Collection();
const slashCommandsFiles = fs
  .readdirSync("./src/slashCommands")
  .filter((file) => file.endsWith("js"));

for (const file of slashCommandsFiles) {
  const slash = require(`./slashCommands/${file}`);
  client.slashCommands.set(slash.data.name, slash);
}

// Connect bot to discord
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag} Putito!!!`);
});

// interation bot
client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const slashCommand = client.slashCommands.get(interaction.commandName);

    if (!slashCommand) return;

    try {
      await slashCommand.execute(client, interaction);
    } catch (e) {
      console.error(e);
    }
  }
});
client.login(process.env.DISCORD_TOKEN);

// meme generator (Make it publish in a time range)
new cron(
  "1 59 12-23/2 * * 5-0",
  async () => {
    const serverMeme = randomiseServer.randomServer();
    publish.postMeme(serverMeme, client);
  },
  null,
  true,
  "Chile/Continental"
);

// server up
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
