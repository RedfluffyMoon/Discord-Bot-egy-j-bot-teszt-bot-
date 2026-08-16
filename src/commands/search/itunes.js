const Discord = require('discord.js');
const pop = require("popcat-wrapper");

module.exports = async (client, interaction, args) => {

    const song = interaction.options.getString('song');

    const r = await pop.itunes(song).catch(e => {
        return client.errNormal({
            error: "Nem található a dal!",
            type: 'editreply'
        }, interaction)
    });

    client.embed({
        title: `🎶・${r.name}`,
        thumbnail: r.thumbnail,
        url: r.url,
        fields: [
            {
                name: "💬┇Név",
                value: `${r.name}`,
                inline: true,
            },
            {
                name: "🎤┇Előadó",
                value: `${r.artist}`,
                inline: true,
            },
            {
                name: "📁┇Album",
                value: `${r.album}`,
                inline: true,
            },
            {
                name: "🎼┇Hossz",
                value: `${r.length}`,
                inline: true,
            },
            {
                name: "🏷️┇Műfaj",
                value: `${r.genre}`,
                inline: true,
            },
            {
                name: "💵┇Ár",
                value: `${r.price}`,
                inline: true,
            },
            {
                name: "⏰┇Megjelenés dátuma",
                value: `<t:${Math.round(new Date(r.release_date).getTime() / 1000)}>`,
                inline: true,
            },
        ],
        type: 'editreply'
    }, interaction)
}

 