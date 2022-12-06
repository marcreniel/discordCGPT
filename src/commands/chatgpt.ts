// Import Required Libraries
import "dotenv/config"
import { CommandInteraction, ModalSubmitInteraction, ThreadChannel } from "discord.js";
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Discord, Slash, ModalComponent } from "discordx";
import { ChatGPTAPI } from 'chatgpt';

// Connecting to ChatGPT API (Unofficial) 
const api = new ChatGPTAPI({ sessionToken: process.env.openai_token! })
await api.ensureAuth()

@Discord()
export class discordcgpt {
  @Slash({ description: "ChatGPT", name:"chatgpt" })
  modal(interaction: CommandInteraction): void {
    // Create the modal
    const modal = new ModalBuilder()
      .setTitle("Discord ChatGPT")
      .setCustomId("discordcgpt");

    // Create chat input fields
    const chatInputComponent = new TextInputBuilder()
      .setCustomId("chatInput")
      .setLabel("Input your prompt for ChatGPT to respond to:")
      .setStyle(TextInputStyle.Paragraph);

    const response = new ActionRowBuilder<TextInputBuilder>().addComponents(
      chatInputComponent
    );

    // Add action rows to form
    modal.addComponents(response);

    // Present the modal to the user
    interaction.showModal(modal);
  }

  
  @ModalComponent()
  // Maps chatInput to const chatInput: string
  async discordcgpt(interaction: ModalSubmitInteraction): Promise<void> {
    const [chatInput] = ["chatInput"].map((id) =>
      interaction.fields.getTextInputValue(id)
    );

    // Attempts to send chatInput to ChatGPT api; If it returns a value it is shown to the user, else an error occurs
    try {
      await interaction.reply(
        `ChatGPT is processing your prompt...`
      ) 
      let response = await api.sendMessage(chatInput);
      if (response.length >= 2000) {
        response = response.substring(0, 1999);
      }
      await interaction.editReply(
        `${response}`
      )    
    } catch(err){
      await interaction.reply(
        "ChatGPT has timed out. Please try again."
      )        
    }

    return;
  }  
}