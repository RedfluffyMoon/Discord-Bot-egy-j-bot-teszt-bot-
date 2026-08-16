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

    let amount = interaction.options.getNumber('amount');

    if (!amount) return client.simpleEmbed({
        desc: `${client.emotes.normal.volume}┆A jelenlegi hangerő **${player.volume}%**`,
        type: 'editreply'
    }, interaction);

    if (isNaN(amount) || amount === 'Infinity') return client.errNormal({
        text: `Kérlek adj meg egy érvényes számot!`,
        type: 'editreply'
    }, interaction);

    if (Math.round(parseInt(amount)) < 1 || Math.round(parseInt(amount)) > 1000) return client.errNormal({
        text: "A hangerő nem lehet több mint 1000%",
        type: 'editreply'
    }, interaction);

    player.setVolume(parseInt(amount))

    client.succNormal({
        text: `Hangerő beállítva erre: **${amount}%**`,
        type: 'editreply'
    }, interaction);
}

 