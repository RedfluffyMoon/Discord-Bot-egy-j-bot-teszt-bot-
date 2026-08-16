
module.exports = async (client, interaction, args) => {

    if (!interaction.member.voice.channel) return client.errNormal({ error: `Nem vagy hangcsatornában!`, type: 'editreply' }, interaction);

    if (interaction.guild.members.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id) return client.errNormal({ error: `Nem vagy ugyanabban a hangcsatornában!`, type: 'editreply' }, interaction);

    client.soundboard(interaction.guild.id, interaction, "https://www.myinstants.com/media/sounds/untitled_1071.mp3");

    client.succNormal({ text: "Soundboard elindítva! **to be continued** lejátszása", type: 'editreply' }, interaction);
};