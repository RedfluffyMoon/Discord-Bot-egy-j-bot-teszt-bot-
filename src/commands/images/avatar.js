
module.exports = async (client, interaction, args) => {
  const user = interaction.options.getUser('user') || interaction.user;

  client.embed({
    title: `🖼・Felhasználó profilképe`,
    image: user.displayAvatarURL({ dynamic: false, size: 1024 }),
    type: 'editreply'
  }, interaction)
}

 