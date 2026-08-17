const Discord = require('discord.js');
const pop = require("popcat-wrapper");

module.exports = async (client, interaction, args) => {

    const name = interaction.options.getString('name');

    const r = await pop.npm(name).catch(e => {
        return client.errNormal({
            error: "Nem található a csomag!",
            type: 'editreply'
        }, interaction)
    });

    client.embed({
        title: `📁・${r.name}`,
        fields: [
            {
                name: "💬┇Név",
                value: `${r.name}`,
                inline: true,
            },
            {
                name: "🏷️┇Verzió",
                value: `${r.version}`,
                inline: true,
            },
            {
                name: "📃┇Leírás",
                value: `${r.description}`,
                inline: true,
            },
            {
                name: "⌨️┇Kulcsszavak",
                value: `${r.keywords}`,
                inline: true,
            },
            {
                name: "💻┇Szerző",
                value: `${r.author}`,
                inline: true,
            },
            {
                name: "📁┇Letöltések",
                value: `${r.downloads_this_year}`,
                inline: true,
            },
            {
                name: "⏰┇Utolsó kiadás",
                value: `<t:${Math.round(new Date(r.last_published).getTime() / 1000)}>`,
                inline: true,
            },
        ],
        type: 'editreply'
    }, interaction)
}

 