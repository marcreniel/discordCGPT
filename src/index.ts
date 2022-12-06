// Import Required Libraries
import "dotenv/config"
import { Client } from "discordx";
import { IntentsBitField } from "discord.js";
import { dirname, importx } from "@discordx/importer";

async function start() {
    const client = new Client({
        // Declare Intents
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.GuildMembers,
      ],
        silent: false,
    });
  
    client.once("ready", async () => {
        // Flushes global application command cache and reinitializes them
        await client.clearApplicationCommands();
        await client.initApplicationCommands();
    });
    
    client.on("interactionCreate", (interaction) => {
        client.executeInteraction(interaction);
    });

    // Imports all commands from ./commands/
    await importx(`${dirname(import.meta.url)}/commands/**/*.{js,ts}`);
  
    // Login to bot
    if (!process.env.discord_token) {
        throw Error("Could not find token in your environment");
      }
      await client.login(process.env.discord_token);
      console.log("bot >> discordCGPT connected \n"); 
    }
  
  start();