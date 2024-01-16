const discord = require("discord.js");
const express = require("express");
const cron = require("cron").CronJob;
const service = require("./services/service");
const embed = require("./utils/embed");
const fs = require("fs");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.AutoModerationConfiguration,
        discord.GatewayIntentBits.AutoModerationExecution,
        discord.GatewayIntentBits.DirectMessageReactions,
        discord.GatewayIntentBits.DirectMessageTyping,
        discord.GatewayIntentBits.DirectMessages,
        discord.GatewayIntentBits.GuildEmojisAndStickers,
        discord.GatewayIntentBits.GuildIntegrations,
        discord.GatewayIntentBits.GuildInvites,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildMessageReactions,
        discord.GatewayIntentBits.GuildMessageTyping,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildModeration,
        discord.GatewayIntentBits.GuildPresences,
        discord.GatewayIntentBits.GuildScheduledEvents,
        discord.GatewayIntentBits.GuildVoiceStates,
        discord.GatewayIntentBits.GuildWebhooks,
        discord.GatewayIntentBits.Guilds,
      ],
      partials: [
        discord.Partials.Channel,
        discord.Partials.GuildMember,
        discord.Partials.GuildScheduledEvent,
        discord.Partials.Message,
        discord.Partials.Reaction,
        discord.Partials.ThreadMember,
        discord.Partials.User,
      ],
});

// SlashCommands 
client.slashCommands = new discord.Collection();
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
})
client.login(process.env.DISCORD_TOKEN);

// TODO: Hacer  que publique en un rango de horario
// meme generator
new cron(
    "2 * * * *",
    async() => {
        await service.memeRedditEng()
            .then(async (data) => {
                let message
                if(data !== undefined){
                    message = embed.getEmbed(data);
                    await client.channels.cache
                        .get(process.env.CHANNEL_ID)
                        .send({ embeds: [message] });
                }
            })
            .catch(err => console.log(err));
    },
    null,
    true,
    "Chile/Continental"
  );

// server up
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
