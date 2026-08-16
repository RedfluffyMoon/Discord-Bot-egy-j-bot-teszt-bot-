const Discord = require('discord.js');
const pop = require("popcat-wrapper");

module.exports = async (client, interaction, args) => {
    await interaction.deferReply({ fetchReply: true });

    const name = interaction.options.getString('name');

    const s = await pop.steam(name).catch(e => {
        return client.errNormal({
            error: "Nem található az alkalmazás!",
            type: 'editreply'
        }, interaction)
    });

    await client.embed({
        title: `🎮・${s.name}`,
        thumbnail: s.thumbnail,
        fields: [
            {
                name: `💬┇Név`,
                value: `${s.name}`,
                inline: true,
            },
            {
                name: `📃┇Leírás`,
                value: `${s.description}`,
                inline: false,
            },
            {
                name: "💻┇Fejlesztők",
                value: `${s.developers.join(", ")}`,
                inline: true,
            },
            {
                name: "☁┇Kiadók",
                value: `${s.publishers.join(", ")}`,
                inline: true,
            },
            {
                name: "🪙┇Ár",
                value: `${s.price}`,
                inline: true,
            }
        ],
        type: 'editreply'
    }, interaction)
}

 