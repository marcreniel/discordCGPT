import "dotenv/config"
import { Client } from "discordx";
import { IntentsBitField } from "discord.js";
import { dirname, importx } from "@discordx/importer";

async function start() {
    const client = new Client({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.GuildMembers,
      ],
        silent: false,
    });
  
    client.once("ready", async () => {
        await client.clearApplicationCommands();
        await client.initApplicationCommands();
    });
  
    client.on("interactionCreate", (interaction) => {
        client.executeInteraction(interaction);
    });

    await importx(`${dirname(import.meta.url)}/commands/**/*.{js,ts}`);
  
    if (!process.env.discord_token) {
        throw Error("Could not find token in your environment");
      }
      await client.login(process.env.discord_token);
      console.log("bot >> discordgpt connected \n"); 
    }
  
  start();