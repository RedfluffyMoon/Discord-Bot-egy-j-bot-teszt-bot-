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

    let number = interaction.options.getNumber('number');

    player.skipto(parseInt(number))

    client.succNormal({
        text: `A lejátszás ugrott a **${number}.** számra`,
        type: 'editreply'
    }, interaction);
}

 