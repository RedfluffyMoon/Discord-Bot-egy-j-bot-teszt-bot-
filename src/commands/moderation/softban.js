const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.BanMembers],
    perms: [Discord.PermissionsBitField.Flags.BanMembers]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  const reason = interaction.options.getString('reason') || 'Nincs megadva';

  if (member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers) || member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return client.errNormal({
    error: "Moderátort nem tilthatsz ki",
    type: 'editreply'
  }, interaction);

  client.embed({
    title: `🔨・Kitiltás`,
    desc: `Ki lettél tiltva innen: **${interaction.guild.name}**`,
    fields: [
      {
        name: "👤┆Kitiltotta",
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
    member.ban({ days: 7, reason: reason })
    client.succNormal({
      text: "A megadott felhasználó sikeresen ki lett tiltva, és sikeresen értesítést is kapott róla!",
      fields: [
        {
          name: "👤┆Kitiltott felhasználó",
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
    member.ban({ days: 7, reason: reason })
    client.succNormal({
      text: "A megadott felhasználó sikeresen ki lett tiltva, de nem kapott róla értesítést!",
      type: 'editreply'
    }, interaction);
  });

  setTimeout(() => {
    interaction.guild.members.unban(member.id)
  }, 2000)
}

 