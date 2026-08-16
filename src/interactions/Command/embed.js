const { CommandInteraction, Client } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const { ChannelType } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Egy beágyazott üzenet (embed) létrehozása")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("A csatorna, ahova az embed kerüljön")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    await interaction.deferReply({ fetchReply: true });
    const perms = await client.checkPerms(
      {
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages],
      },
      interaction
    );

    if (perms == false) return;

    let row = new Discord.ActionRowBuilder().addComponents(
      new Discord.StringSelectMenuBuilder()
        .setCustomId("embedSelect")
        .setPlaceholder("Nincs kiválasztva")
        .addOptions([
          {
            emoji: "✏️",
            label: "Cím",
            description: "Embed cím létrehozása",
            value: "title_embed",
          },
          {
            emoji: "💬",
            label: "Leírás",
            description: "Embed leírás létrehozása",
            value: "description_embed",
          },
          {
            emoji: "🕵️",
            label: "Szerző",
            description: "Embed szerző létrehozása",
            value: "author_embed",
          },
          {
            emoji: "🔻",
            label: "Lábléc",
            description: "Embed lábléc létrehozása",
            value: "footer_embed",
          },
          {
            emoji: "🔳",
            label: "Indexkép",
            description: "Embed indexkép létrehozása",
            value: "thumbnail_embed",
          },
          {
            emoji: "🕙",
            label: "Időbélyeg",
            description: "Embed időbélyeg létrehozása",
            value: "timestamp_embed",
          },
          {
            emoji: "🖼️",
            label: "Kép",
            description: "Embed kép létrehozása",
            value: "image_embed",
          },
          {
            emoji: "🌐",
            label: "URL",
            description: "Embed URL létrehozása",
            value: "url_embed",
          },
          {
            emoji: "🔵",
            label: "Szín",
            description: "Embed szín létrehozása",
            value: "color_embed",
          },
        ])
    );

    let row2 = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setCustomId("send_embed")
        .setEmoji("✅")
        .setLabel("Embed küldése")
        .setStyle(Discord.ButtonStyle.Success)
    );

    let embed = new Discord.EmbedBuilder().setDescription(
      `Válassz néhány opciót`
    );

    interaction.editReply({ embeds: [embed], components: [row, row2] });

    const filter = (i) => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "embedSelect") {
        i.deferUpdate();

        if (i.values == "title_embed") {
          interaction.channel
            .send({ content: "Add meg a címet" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  embed.setTitle(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "description_embed") {
          interaction.channel
            .send({ content: "Add meg a leírást" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  embed.setDescription(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "author_embed") {
          interaction.channel
            .send({ content: "Add meg a szerzőt" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  embed.setAuthor({
                    name: `${collected.first().content}`,
                    iconURL: interaction.guild.iconURL({ size: 1024 }),
                  });
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "footer_embed") {
          interaction.channel
            .send({ content: "Add meg a láblécet" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  embed.setFooter({
                    text: `${collected.first().content}`,
                  });
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "thumbnail_embed") {
          interaction.channel
            .send({ content: "Add meg az indexkép linkjét" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  if (
                    !collected.first().content.includes("http://") &&
                    !collected.first().content.includes("https://")
                  )
                    return interaction.channel.send({
                      content: "Hibás indexkép link!",
                    });
                  embed.setThumbnail(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "thumbnail_embed") {
          embed.setTimestamp();
          interaction.editReply({ embeds: [embed] });
        }

        if (i.values == "image_embed") {
          interaction.channel
            .send({ content: "Add meg a kép linkjét" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  if (
                    !collected.first().content.includes("http://") &&
                    !collected.first().content.includes("https://")
                  )
                    return interaction.channel.send({
                      content: "Hibás kép link!",
                    });
                  embed.setImage(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "url_embed") {
          interaction.channel
            .send({ content: "Add meg az URL-t" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  if (
                    !collected.first().content.includes("http://") &&
                    !collected.first().content.includes("https://")
                  )
                    return interaction.channel.send({
                      content: "Hibás URL!",
                    });
                  embed.setURL(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }

        if (i.values == "color_embed") {
          interaction.channel
            .send({ content: "Add meg a színt. pl. #FF0000" })
            .then((message) => {
              const filterMessage = (m) =>
                m.author.id === interaction.user.id && !m.author.bot;
              interaction.channel
                .awaitMessages({
                  filterMessage,
                  max: 1,
                  time: 300000,
                  errors: ["time"],
                })
                .then(async (collected) => {
                  message.delete({ timeout: 1000 });
                  collected.delete({ timeout: 1000 });

                  embed.setColor(`${collected.first().content}`);
                  await interaction.editReply({ embeds: [embed] });
                });
            });
        }
      }
      if (i.customId == "send_embed") {
        const channel = interaction.options.getChannel("channel");
        if (!channel)
          return client.errNormal(
            { error: `A csatorna nem található` },
            collected.first().channel
          );

        channel
          .createWebhook({
            name: interaction.guild.name,
            avatar: interaction.guild.iconURL(),
          })
          .then(async (_webhook) => {
            await _webhook.send({ embeds: [embed] });

            client.succNormal(
              {
                text: `Az embed sikeresen elküldve ide: ${channel}`,
                components: [],
                type: "editreply",
              },
              interaction
            );
            collector.stop();

            setTimeout(() => {
              _webhook.delete();
              i.message.delete();
            }, 5000);
          });
      }
    });
  },
};

 
