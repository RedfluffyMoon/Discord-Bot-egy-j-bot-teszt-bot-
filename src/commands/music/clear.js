const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const player = client.player.players.get(interaction.guild.id);

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({
        error: `Nem vagy hangcsatornában!`,
        type: 'editreply'
    }, interaction);

    if (player && (channel.id !== player?.voiceChannel)) return client.errNormal({
        error: `Nem vagy ugyanabban a hangcsatornában!`,
        type: 'editreply'
    }, interaction);

    if (!player || !player.queue.current) return client.errNormal({
        error: "Nincs lejátszott zene ezen a szerveren",
        type: 'editreply'
    }, interaction);

    if (player.queue.size <= 1) return client.errNormal({
        error: `Csak egy szám van a lejátszási listában!`,
        type: 'editreply'
    }, interaction);

    player.queue.clear()

    client.succNormal({
        text: "A lejátszási lista **törölve** lett!",
        type: 'editreply'
    }, interaction);
}

 