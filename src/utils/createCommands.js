const fs = require("fs");
const { REST, Routes } = require("discord.js");
require("dotenv").config();
const commands = [];
const slashCommandsFiles = fs
  .readdirSync("./src/slashCommands")
  .filter((file) => file.endsWith("js"));

for (const file of slashCommandsFiles) {
  const slash = require(`../slashCommands/${file}`);
  commands.push(slash.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

createSlash();

async function createSlash() {
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("[Slash Commands] Agregados.");
  } catch (e) {
    console.error(e);
  }
}
