import "dotenv/config"
import { CommandInteraction, ModalSubmitInteraction, ThreadChannel } from "discord.js";
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { Discord, Slash, ModalComponent } from "discordx";
import { ChatGPTAPI } from 'chatgpt';

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

    // Create text input fields
    const chatInputComponent = new TextInputBuilder()
      .setCustomId("chatInput")
      .setLabel("Favorite TV show")
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
  async discordcgpt(interaction: ModalSubmitInteraction): Promise<void> {
    const [chatInput] = ["chatInput"].map((id) =>
      interaction.fields.getTextInputValue(id)
    );

    let response = await api.sendMessage(chatInput)

    if (response.length >= 2000) {
      response = response.substring(0, 1999);
    }

    await interaction.reply(
      `ChatGPT is generating a response...`
    )

    await interaction.editReply(response);

    return;
    
  }
}