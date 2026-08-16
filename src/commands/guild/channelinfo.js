const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const channel = interaction.options.getChannel('channel');

  client.embed({
      title: `ℹ・Csatorna információ`,
      desc: `Csatorna információ erről: <#${channel.id}>`,
      fields: [
          {
              name: "Típus",
              value: `${channel.type}`,
              inline: true,
          },
          {
              name: "ID",
              value: `${channel.id}`,
              inline: true,
          },
          {
              name: "Típus",
              value: `${channel.type}`,
              inline: true,
          },
          {
              name: "Létrehozva",
              value: `${channel.createdAt}`,
              inline: true,
          },
          {
              name: "Téma",
              value: `${channel.topic ? channel.topic : 'Nincs'}`,
              inline: true,
          },
          {
              name: "NSFW",
              value: `${channel.nsfw}`,
              inline: true,
          },
          {
              name: "Szülő",
              value: `${channel.parentID ? channel.parentID : 'Nincs'}`,
              inline: true,
          },
      ],
      type: 'editreply'
  }, interaction)
}

   