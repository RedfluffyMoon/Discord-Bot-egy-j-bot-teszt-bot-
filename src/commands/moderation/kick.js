const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.KickMembers],
    perms: [Discord.PermissionsBitField.Flags.KickMembers]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  const reason = interaction.options.getString('reason') || 'Nincs megadva';

  if (member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers) || member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) return client.errNormal({
    error: "Moderátort nem rúghatsz ki",
    type: 'editreply'
  }, interaction);

  client.embed({
    title: `🔨・Kirúgás`,
    desc: `Ki lettél rúgva innen: **${interaction.guild.name}**`,
    fields: [
      {
        name: "👤┆Kirúgta",
        value: interaction.user.tag,
        inline: true
      },
      {
        name: "💬┆Indok",
        value: reason,
        inline: true
      }
    ]
  }, member).then(function () {
    member.kick(reason)
    client.succNormal({
      text: "A megadott felhasználó sikeresen ki lett rúgva, és sikeresen értesítést is kapott róla!",
      fields: [
        {
          name: "👤┆Kirúgott felhasználó",
          value: member.user.tag,
          inline: true
        },
        {
          name: "💬┆Indok",
          value: reason,
          inline: true
        }
      ],
      type: 'editreply'
    }, interaction);
  }).catch(function () {
    member.kick(reason)
    client.succNormal({
      text: "A megadott felhasználó sikeresen ki lett rúgva, de nem kapott róla értesítést!",
      type: 'editreply'
    }, interaction);
  });
}

 