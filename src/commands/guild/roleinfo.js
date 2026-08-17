const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const role = interaction.options.getRole('role');
  const perms = role.permissions.toArray();

  client.embed({
    title: `ℹ️・Rang információ`,
    thumbnail: interaction.guild.iconURL({ dynamic: true, size: 1024 }),
    desc: `Információ a rangról: ${role}`,
    fields: [
      {
        name: 'Rang ID:',
        value: `${role.id}`,
        inline: true
      },
      {
        name: 'Rang neve:',
        value: `${role.name}`,
        inline: true
      },
      {
        name: 'Megemlíthető:',
        value: `${role.mentionable ? 'Igen' : 'Nem'}`,
        inline: true
      },
      {
        name: 'Rang jogosultságai:',
        value: `${perms.join(', ')}`
      }
    ],
    type: 'editreply'
  }, interaction)
}

   