const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const members = await interaction.guild.members.fetch();

  client.embed({
    title: `👤・Taglétszám`,
    desc: `A szerver tagjainak teljes száma`,
    fields: [
      {
        name: `👤┆Tagok`,
        value: `${members.filter(member => !member.user.bot).size} tag`,
        inline: true
      },
      {
        name: `🤖┆Botok`,
        value: `${members.filter(member => member.user.bot).size} bot`,
        inline: true
      },
      {
        name: `📘┆Összesen`,
        value: `${interaction.guild.memberCount} tag`,
        inline: true
      }
    ],
    type: 'editreply'
  }, interaction)
}

   