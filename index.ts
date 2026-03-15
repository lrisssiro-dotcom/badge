import { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const TOKEN = "MTQ4MjY1MDQwMTk3ODQ0OTk5Mw.G63jG3.WO7bAfUHRN4jHOTeYn7-3D2yAXg0IpT0ZgXzZE"; // حط توكن البوت
const CHANNEL_ID = "1413714001308684383"; // روم التقديمات

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {

  if (interaction.isButton()) {

    const modal = new ModalBuilder()
      .setCustomId("applyModal")
      .setTitle("تقديم إدارة");

    const name = new TextInputBuilder()
      .setCustomId("name")
      .setLabel("اسمك")
      .setStyle(TextInputStyle.Short);

    const age = new TextInputBuilder()
      .setCustomId("age")
      .setLabel("عمرك")
      .setStyle(TextInputStyle.Short);

    const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(name);
    const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(age);

    modal.addComponents(row1, row2);

    await interaction.showModal(modal);
  }

  if (interaction.isModalSubmit()) {

    const name = interaction.fields.getTextInputValue("name");
    const age = interaction.fields.getTextInputValue("age");

    const embed = new EmbedBuilder()
      .setTitle("تقديم إدارة جديد")
      .addFields(
        { name: "المستخدم", value: interaction.user.tag },
        { name: "الاسم", value: name },
        { name: "العمر", value: age }
      );

    const channel:any = client.channels.cache.get(CHANNEL_ID);
    channel.send({ embeds: [embed] });

    await interaction.reply({ content: "تم ارسال تقديمك ✅", ephemeral: true });
  }

});

client.login(TOKEN);
