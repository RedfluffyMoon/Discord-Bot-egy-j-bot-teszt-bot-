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

    if (number > player.queue.size) return client.errNormal({
        error: `A lejátszási listában nincs ennyi szám`,
        type: 'editreply'
    }, interaction);

    const targetSong = player.queue[parseInt(number - 1)]
    player.queue.remove((parseInt(number)) - 1)

    client.succNormal({
        text: `**${targetSong.title}** eltávolítva a lejátszási listából`,
        type: 'editreply'
    }, interaction);
}

 
